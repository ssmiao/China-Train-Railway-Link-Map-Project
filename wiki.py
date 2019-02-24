# -*- coding:utf8 -*-

import urllib
from urllib.parse import quote
from urllib.request import urlopen
# from bs4 import BeautifulSoup
import time
import re
import json

import config
import amap

class wikipedia(object):
    def __init__(self,station_name,base_url = config.configs['wiki_url']+'/wiki/',html='',have_looked = 0):
        self.station_name = station_name
        self.base_url = base_url
        self.have_looked = have_looked
        self.longitude = 0
        self.latitude = 0
        
    def find_page(self):
        try :
            self.html = urlopen(self.base_url+quote(self.station_name+'站')).read().decode('utf-8')
        except urllib.error.URLError:
            try:
                self.html = urlopen(self.base_url+quote(self.station_name+'乘降所')).read().decode('utf-8')
            except urllib.error.URLError:
                self.html = ''
        self.have_looked = 1

    def find_location(self):
        if(self.have_looked == 0):
            self.find_page()
        if(self.html != ''):
            try:
                find = re.search(r'{"lat":.*?,"lon":.*?}',self.html)
                # print(json.loads(find.group())['lat'])
                self.longitude = json.loads(find.group())['lon']
                self.latitude = json.loads(find.group())['lat']

                #转化为高德坐标
                amap_trans = amap.amap_trans(self.longitude,self.latitude)
                amap_trans.trans()
                self.longitude = amap_trans.longitude
                self.latitude = amap_trans.latitude

            except IndexError AttributeError:
                pass
        else:
            print('empty wiki!')
        
    
    async def async_find_location(self,session):
        import aiohttp
        import asyncio
        
        wiki_url = self.base_url+quote(self.station_name+'站')
        async with session.get(wiki_url) as resp:
            if(resp.status == 404):
                wiki_url = self.base_url+quote(self.station_name+'乘降所')
                async with session.get(wiki_url) as resp:
                    # print(resp.status)# == 200
                    self.html = await resp.text()
            else:
                # print(resp.status)# == 200
                self.html = await resp.text()
        self.have_looked = 1
        self.find_location()
        
    
def main():
    wiki = wikipedia("上海虹桥")
    wiki.find_location()
if __name__ == "__main__":
        main()
        
