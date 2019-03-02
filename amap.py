# -*- coding:utf8 -*-
from urllib.request import urlopen
import requests
import re

import config

full_abbr_province_dict = config.configs['full_abbr_province_dict']

amap_web_key = config.configs['amap_web_key']
class amap_search(object):
    def __init__(self,longitude,latitude,province=''):
        self.longitude = longitude
        self.latitude = latitude
        self.province = province
        self.get_province_url = 'https://restapi.amap.com/v3/geocode/regeo?key='+amap_web_key+'&location='+str(self.longitude)+','+str(self.latitude)+'&poitype=&radius=100&extensions=base&batch=false&roadlevel=0'

    def get_province(self):
        #restapi.amap.com/v3/geocode/regeo?key=您的key&location=116.481488,39.990464&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0
        r = requests.get(get_province_url)
        if(r.json()['info'] == 'OK'):
            full_province = r.json()['regeocode']['addressComponent']['province']
            self.province = full_abbr_province_dict[full_province]
    
    async def async_get_province(self,session):
        async with session.get(self.get_province_url) as resp:
            if((await resp.json())['info'] == 'OK'):
                full_province = await resp.json()['regeocode']['addressComponent']['province']
                self.province = full_abbr_province_dict[full_province]

class amap_trans(object):
    def __init__(self,longitude,latitude,coordsys='gps'):
        self.longitude = longitude
        self.latitude = latitude
        self.coordsys = coordsys
        self.trans_url = 'https://restapi.amap.com/v3/assistant/coordinate/convert?locations='+str(self.longitude)+','+str(self.latitude)+'&coordsys=gps&output=json&key='+amap_web_key

    def trans(self):
        r = requests.get(self.trans_url)
        if(r.json()['info']=='ok'):
            self.longitude = r.json()['locations'].split(',')[0]
            self.latitude = r.json()['locations'].split(',')[1]
        
    async def async_trans(self,session_amap):
        async with session_amap.get(self.trans_url) as resp:
            if((await resp.json())['info']=='ok'):
                self.longitude = (await resp.json())['locations'].split(',')[0]
                self.latitude = (await resp.json())['locations'].split(',')[1]

def main():
    # amap = amap_search(114.170074327257,22.301303439671)
    # amap.get_province()
    # print(amap.province)
    amap = amap_trans(116.42111,39.90222)
    amap.trans()

if __name__ == "__main__":
        main()