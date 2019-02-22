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
    
    def get_province(self):
        #restapi.amap.com/v3/geocode/regeo?key=您的key&location=116.481488,39.990464&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0
        url = 'https://restapi.amap.com/v3/geocode/regeo?key='+amap_web_key+'&location='+str(self.longitude)+','+str(self.latitude)+'&poitype=&radius=100&extensions=base&batch=false&roadlevel=0'
        r = requests.get(url)
        if(r.json()['info'] == 'OK'):
            full_province = r.json()['regeocode']['addressComponent']['province']
            self.province = full_abbr_province_dict[full_province]

class amap_trans(object):
    def __init__(self,longitude,latitude,coordsys='gps'):
        self.longitude = longitude
        self.latitude = latitude
        self.coordsys = coordsys

    def trans(self):
        trans_url = 'https://restapi.amap.com/v3/assistant/coordinate/convert?locations='+str(self.longitude)+','+str(self.latitude)+'&coordsys=gps&output=json&key='+amap_web_key
        r = requests.get(trans_url)
        if(r.json()['info']=='ok'):
            self.longitude = r.json()['locations'].split(',')[0]
            self.latitude = r.json()['locations'].split(',')[1]

def main():
    # amap = amap_search(114.170074327257,22.301303439671)
    # amap.get_province()
    # print(amap.province)
    amap = amap_trans(116.42111,39.90222)
    amap.trans()

if __name__ == "__main__":
        main()