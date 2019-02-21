# -*- coding:utf8 -*-

import urllib
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup

import config

class wikipedia(object):
    def __init__(self,station_name,base_url = 'https://zh.wikipedia.org/wiki/',html='',have_looked = 0):
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
        self.soup = BeautifulSoup(self.html,features="lxml")

    def find_location(self):
        if(self.have_looked == 0):
            self.find_page()
        if(self.soup != ''):
            base_location = str(self.soup.find_all('span',class_="geo")[0]).split('>')[1].split('<')[0]
            #39.90222; 116.42111
            self.latitude = base_location.split("; ")[0]
            self.longitude = base_location.split("; ")[1]

    
def main():

    wiki = wikipedia("上海虹桥")
    wiki.find_location()
if __name__ == "__main__":
        main()
        
