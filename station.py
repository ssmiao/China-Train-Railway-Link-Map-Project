# -*- coding:utf8 -*-

import requests
import json
import re
import tqdm
from string import ascii_uppercase as alphabet
from collections import OrderedDict
from sql import sql
from urllib.request import urlopen

import aiohttp
import asyncio
import tqdm

from wiki import wikipedia
import amap
import googlemap

import config

station_url = config.configs['station_url']
#这个文件包含站名和拼音名，随实际状况更新，序号可能变化 

class station(object):
    def __init__(self,station_name ='',pym='',tmis='',dbm='',province='',longitude=0,latitude=0):
                #是站点名称station_name，拼音码pym，中国车站代码tmis，电报码dbm,经度longitude，纬度latitude
        self.station_name = station_name
        self.pym = pym
        self.tmis = tmis
        self.dbm = dbm
        self.province = province
        self.longitude = longitude
        self.latitude =latitude
    
    #用于批量处理来自station_url的站点(同步)
    def init_station_str(self):
        html = urlopen(station_url).read().decode('utf-8')
        station_str_array = html[21:-2].split("@")

        for i in range(len(station_str_array)):  
            self.pym = ''
            self.tmis = ''
            self.dbm = ''
            self.province = ''
            self.longitude = 0
            self.latitude = 0
            
            self.station_str = station_str_array[i]
            # zzn|株洲南|KVQ|zhuzhounan|zzn|2850
            
            self.station_name = self.station_str.split("|")[1]
            
            mat = "{:10}"
            
            #排除某些含有空格的站点（水用站点？）
            if(re.findall(r' ',self.station_name)):
                continue

            self.get_pym_dbm()
            self.get_tmis()
            self.get_location()
            self.get_province()
            self.tosql()
            #todo:协程优化
            # print(self.station_name+'    '+self.tmis+"  "+self.province+'  '+self.dbm+"   "+str(self.longitude)+" "+str(self.latitude)+'  done.')
        
    #解析pym和dbm
    def get_pym_dbm(self):
            self.pym = self.station_str.split("|")[-2] #站点拼音码
            self.dbm = self.station_str.split("|")[2]

    #从12306官方接口获取tmis信息
    def get_tmis(self):
        name = self.station_name 
        bureau=0
        url = 'http://hyfw.12306.cn/hyinfo/action/FwcszsAction_getljcz'
        params = {'limit': '', 'timestamp': '', 'sheng': '', 'shi': ''}
        params.update(q=name, ljdm=format(bureau, '02'))
        while True:
            try:
                response = requests.post(url, params, timeout=1).json()
            except (requests.exceptions.Timeout,json.JSONDecodeError):
                pass
            else:
                break
        for k, v in (OrderedDict((d['HZZM'], d['TMISM']) for d in response)).items():
            if(self.station_name == k):
                self.tmis = v

    #从维基百科和谷歌地图获取经纬度信息
    def get_location(self):
        #调用维基百科
        wiki = wikipedia(self.station_name)
        wiki.find_location()
        self.longitude = wiki.longitude
        self.latitude = wiki.latitude
        
        #调用谷歌api
        if(self.longitude == 0):
            google = googlemap.google_search(self.station_name+'火车站')
            google.find_geometry()
            self.longitude = google.longitude
            self.latitude = google.latitude

    #从12306接口和高德地图获取省份信息
    def get_province(self):  
        #尝试从12306官方接口获取所在省份信息
        try:
            if(self.pym != ''):
                url = 'https://www.12306.cn/yjcx/doPickJZM'
                params = dict(param=self.pym, type=1, czlx=0)
                r = requests.post(url, params)
                results = r.json()

                for result in results:
                    if(self.station_name == result['ZMHZ']):
                        self.province = result['SSJC']
        except Exception:
            pass
    
        #从高德地图结合经纬度获得所在省份
        if(self.province == ''):
            if(self.longitude == 0):
                self.get_location()
            if(self.longitude == 0):
                pass
            else:            
                amap_i = amap.amap_search(self.longitude,self.latitude)
                amap_i.get_province()
                self.province = amap_i.province

    #从12306接口获取省份信息(异步)
    async def async_get_basic_info(self,session,pbar_basic_info):
        pbar_basic_info.set_description("basic_info进度")
        province_url = 'https://www.12306.cn/yjcx/doPickJZM'
        province_params = dict(param=self.pym, type=1, czlx=0)
        async with session.post(province_url,data = province_params) as resp:
            # assert resp.status == 200
            data = json.loads(await resp.text())
            for result in data :
                if(self.station_name == result['ZMHZ']):
                    self.province = result['SSJC']
            pbar_basic_info.update(1)

    #从12306官方接口获取tmis信息(异步)    
    async def async_get_tmis(self,session,pbar_tmis):
        tmis_params = {'limit': '', 'timestamp': '', 'sheng': '', 'shi': ''}
        pbar_tmis.set_description("tmis进度")
        bureau=0
        tmis_url = 'http://hyfw.12306.cn/hyinfo/action/FwcszsAction_getljcz'
        tmis_params.update(q=self.station_name, ljdm=format(bureau, '02'))
        
        async with session.post(tmis_url,data = tmis_params) as resp:
            for result in json.loads(await resp.text()):
                if(self.station_name == result['HZZM']):
                    self.tmis = result['TMISM']
                pbar_tmis.update(1)
    
    #从维基百科获取经纬度信息(异步)
    async def async_get_location(self,session_wiki,session_amap,pbar_location):
        pbar_location.set_description("维基地点分析进度")        
        #调用维基百科
        wiki = wikipedia(self.station_name)
        await asyncio.create_task(wiki.async_find_location(session_wiki,session_amap))
        self.longitude = wiki.longitude
        self.latitude = wiki.latitude
        pbar_location.update(1)
    
    #从谷歌地图获取经纬度信息（作为补充，异步）
    async def async_get_google_location(self,session,session_amap,pabr_google_location):
        pabr_google_location.set_description("谷歌地点分析进度")
        #调用谷歌地图
        if(self.longitude == 0):
            google = googlemap.google_search(self.station_name)
            await google.async_find_geometry(session,session_amap)
            self.longitude = google.longitude
            self.latitude = google.latitude
        pabr_google_location.update(1)

    #从高德地图将经纬度转化为省份（作为补充，异步）
    async def async_amap_get_province(self,session,pbar_amap_province):
        pbar_amap_province.set_description("高德地图省份转换中")
        #调用amap
        if(self.province == 0):
            amap_i = amap.get_search(self.longitude,self.latitude)
            await amap_i.async_get_province(session)
            self.province = amap_i.province
        pbar_amap_province.update(1)
    
    #添加站点到数据库
    def tosql(self):
        dbe = sql()
        dbe.connect()
        dbe.addStation(self.station_name,self.pym,self.tmis,self.dbm,self.province,self.longitude,self.latitude)
        dbe.close()

if __name__ == "__main__":
    st = station()
    st.init_station_str()
