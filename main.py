# -*- coding:utf8 -*-

from urllib.request import urlopen
from bs4 import BeautifulSoup
from multiprocessing import Pool
import re,random,os

from station import station

#列车等级信息
grade_list=["T","K","","D","Z","C","L","Y","G"]

#第三方来源网址,分为前缀和后缀
third_party_url = ['http://qq.ip138.com/train/','.htm']#这个站点用于提供大范围列车的时刻表，可能不能实时更新，但响应快

#官方站点信息
station_url = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js'#这个文件包含站名和拼音名，随实际状况更新，序号可能变化

class reptile(object):
    def __init__(self,base_url,ad_url):
        self.base_url = base_url
        self.ad_url = ad_url
    
    def station_figure(self):
        html = urlopen(station_url).read().decode('utf-8')
        station_str_array = html[21:-2].split("@")
        # print(len(station_str_array))
        for i in range(len(station_str_array)):
            station_str = station_str_array[i]
            # zzn|株洲南|KVQ|zhuzhounan|zzn|2850

            #解析pym和dbm
            station_name = station_str.split("|")[1]
            station_pym = station_str.split("|")[-2] #站点拼音码
            station_i = station(station_name,station_pym)
            station_i.dbm = station_str.split("|")[2]
            
            #传入station
            station_i.get_tmis()
            station_i.get_location()
            station_i.get_province()
            station_i.tosql()
            
            print(station_name+'   '+station_i.tmis+"   "+station_i.province+'  '+station_i.dbm+station_i.longitude+"   "+station_i.latitude+'  done.')

class train(object):
    def __init__(self,train_name,first_site,terminus,viasite):
        self.name = train_name
        self.first_site = first_site
        self.terminus =terminus
        self.viasite = viasite
    
    def tosql():
        db = sql()
        db.connect()
        db.addline(self.train_name,self.first_site,self.terminus,self.viasite)
        db.close()

def main():
    rep = reptile(third_party_url[0],third_party_url[1])
    rep.station_figure()

if __name__ == "__main__":
        main()