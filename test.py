from bs4 import BeautifulSoup
import requests
import re
import datetime

from sql import sql
import config

train_viasite_timetable_url = config.configs['train_viasite_timetable_url']

# train_no=240000G1010I         #火车序列号
# &from_station_telecode=VNP    #出发站电报码
# &to_station_telecode=AOH      #到达站电报码
# &depart_date=2019-03-02'      #出发日期

def find_viasite(offical_train_no,dbm0,dbm1):
    url = train_viasite_timetable_url + 'train_no=' + offical_train_no +'&from_station_telecode='+ dbm0 +'&to_station_telecode='+ dbm1 + '&depart_date=' + str(datetime.date.today() + datetime.timedelta(days=1))
    print(url)
    r = requests.get(url)
    print(r.json())

def tosql(train_name,viasite):
    tosql_i = sql()
    tosql_i.connect()
    tosql_i.addline(train_name,viasite)
    print('OK')
    tosql_i.close()

find_viasite('240000G1010I','VNP','AOH')
# tosql('G1',find_viasite('G1'))