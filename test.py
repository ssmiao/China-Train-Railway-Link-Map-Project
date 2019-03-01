from bs4 import BeautifulSoup
import requests
import re
import datetime

from sql import sql
import config

train_viasite_url = config.configs['train_viasite_url']
def find_viasite(offical_train_no):
    url = train_viasite_url + 'train_no=' + offical_train_no + '&depart_date=' + str(datetime.date.today() + datetime.timedelta(days=1))
    print(url)
    # url = config.configs['third_party_url'][0] +train_no+ config.configs['third_party_url'][1]
    r = requests.get(url)
    print(r.json())
    # r.encoding = 'GB2312'
    # soup = BeautifulSoup(r.text,'lxml')
    # soup.find_all("table",border="1")

    # viasite = []
    # for line in re.findall(r'onclick="setFrom\(.*?,',str(soup.find_all("table",border="1",width="780")[1])):
    #     viasite.append(line[18:-2])
    #     # print(line[18:-2])
    # print(viasite)
    # return viasite
    
def tosql(train_name,viasite):
    tosql_i = sql()
    tosql_i.connect()
    tosql_i.addline(train_name,viasite)
    print('OK')
    tosql_i.close()

find_viasite('0h00000D280L')
# tosql('G1',find_viasite('G1'))