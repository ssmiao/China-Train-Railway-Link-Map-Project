from bs4 import BeautifulSoup
import requests
import re

from sql import sql
import config

def find_viasite(train_no):
    url = config.configs['third_party_url'][0] +train_no+ config.configs['third_party_url'][1]
    r = requests.get(url)
    r.encoding = 'GB2312'
    soup = BeautifulSoup(r.text,'lxml')
    soup.find_all("table",border="1")

    viasite = []
    for line in re.findall(r'onclick="setFrom\(.*?,',str(soup.find_all("table",border="1",width="780")[1])):
        viasite.append(line[18:-2])
        # print(line[18:-2])
    print(viasite)
    return viasite
    
def tosql(train_name,viasite):
    tosql_i = sql()
    tosql_i.connect()
    tosql_i.addline(train_name,viasite)
    print('OK')
    tosql_i.close()

 
tosql('G1',find_viasite('G1'))