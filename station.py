# -*- coding:utf8 -*-

#class station
import requests
import json
from string import ascii_uppercase as alphabet
from collections import OrderedDict
from sql import sql

from wiki import wikipedia
from amap import amap_search

class station(object):#todo:添加经纬坐标
    def __init__(self,station_name,pym='',tmis='',dbm='',province='',longitude=0,latitude=0):
                #是站点名称station_name，拼音码pym，中国车站代码tmis，电报码dbm
        self.station_name = station_name
        self.pym = pym
        self.tmis = tmis
        self.dbm = dbm
        self.province = province
        self.longitude = longitude
        self.latitude =latitude
        
    #get_tmis是封装来自emu-tools的代码，从12306官方接口获取tmis信息
    def get_tmis(self):
        name = self.station_name 
        bureau=0
        url = 'http://hyfw.12306.cn/hyinfo/action/FwcszsAction_getljcz'
        params = 'limit timestamp sheng shi'
        params = {k: '' for k in params.split()}
        params.update(q=name, ljdm=format(bureau, '02'))
        while True:
            try:
                response = requests.post(url, params, timeout=1).json()
            except (requests.exceptions.Timeout, json.JSONDecodeError):
                pass
            else:
                break
        # return OrderedDict((d['HZZM'], d['TMISM']) for d in response)
        for k, v in (OrderedDict((d['HZZM'], d['TMISM']) for d in response)).items():
            if(self.station_name == k):
                self.tmis = v

    #从维基百科获取经纬度信息
    def get_location(self):
        wiki = wikipedia(self.station_name)
        wiki.find_location()
        self.longitude = wiki.longitude
        self.latitude = wiki.latitude

    def get_province(self):
        
        #尝试从12306官方接口获取所在省份信息
        try:
            if(self.pym != ''):
                pinyin = self.pym
                url = 'https://www.12306.cn/yjcx/doPickJZM'
                params = dict(param=pinyin, type=1, czlx=0)
                response = requests.post(url, params)
                results = json.loads(response.text)

                for result in results:
                    if(self.station_name == result['ZMHZ']):
                        self.province = result['SSJC']
                        # self.dbm = result['DBM']
                        # print(self.province)
        except:
            pass
    
        #从高德地图结合经纬度获得所在省份
        if(self.province == ''):
            if(self.longitude == 0):
                self.get_location()
            if(self.longitude != 0):            
                amap = amap_search(self.longitude,self.latitude)
                amap.get_province()
                self.province = amap.province

    #添加站点到数据库
    def tosql(self):
        dbe = sql()
        dbe.connect()
        dbe.addStation(self.station_name,self.pym,self.tmis,self.dbm,self.province,self.longitude,self.latitude)
        dbe.close()

if __name__ == "__main__":
    st = station('北京','bj')
    st.get_more_infor()
    print(type(st.dbm))