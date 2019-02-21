# -*- coding:utf8 -*-

# from urllib.request import urlopen
from bs4 import BeautifulSoup
from multiprocessing import Pool
import re,random,os

from station import station

class reptile(object):
    def __init__(self,base_url,ad_url):
        self.base_url = base_url
        self.ad_url = ad_url


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
    st = station()
    st.init_station_str()

if __name__ == "__main__":
        main()
