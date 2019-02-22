# -*- coding:utf8 -*-

import requests
import re
import tqdm
from string import ascii_uppercase as alphabet
from collections import OrderedDict
from sql import sql
from urllib.request import urlopen

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
    
    #用于批量处理来自station_url的站点
    def init_station_str(self):
        html = urlopen(station_url).read().decode('utf-8')
        station_str_array = html[21:-2].split("@")

        with tqdm.tqdm(total=len(station_str_array),ncols=80) as pbar:

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
                pbar.set_description("站点分析中:"+mat.format(self.station_name))
                pbar.update(1)
                
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
            except (requests.exceptions.Timeout, json.JSONDecodeError):
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
        except:
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

    #添加站点到数据库
    def tosql(self):
        dbe = sql()
        dbe.connect()
        dbe.addStation(self.station_name,self.pym,self.tmis,self.dbm,self.province,self.longitude,self.latitude)
        dbe.close()

if __name__ == "__main__":
    st = station()
    st.init_station_str()
