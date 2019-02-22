# -*- coding:utf8 -*-
from urllib.request import urlopen
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
        html = urlopen(url).read().decode('utf-8')
        if(re.search('\"infocode\":\"10000\"',html)):
            full_province = re.search(r'\"province\":.*?\",',html).group()[12:-2]
            self.province = full_abbr_province_dict[full_province]

class amap_trans(object):
    def __init__(self,longitude,latitude,coordsys='gps'):
        self.longitude = longitude
        self.latitude = latitude
        self.coordsys = coordsys

    def trans(self):
        trans_url = 'https://restapi.amap.com/v3/assistant/coordinate/convert?locations='+str(self.longitude)+','+str(self.latitude)+'&coordsys=gps&output=xml&key='+amap_web_key
        html = urlopen(trans_url).read().decode('utf-8')
        self.longitude = re.findall(r'<locations>.*,',html)[0][11:-1]
        self.latitude = re.findall(r',.*</locations>',html)[0][1:-12]

def main():
    # amap = amap_search(116.42111,39.90222)
    # amap.get_province()
    # print(amap.province)
    amap = amap_trans(116.42111,39.90222)
    amap.trans()

if __name__ == "__main__":
        main()