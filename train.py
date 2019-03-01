import aiohttp
import asyncio
import datetime
import re
import tqdm
from bs4 import BeautifulSoup
import sql

import config

train_url = config.configs['train_url']
grade_list = config.configs['grade_list']
train_viasite_url = config.configs['train_viasite_url']

class train(object):
    
    def __init__(self,train_name,first_site,offical_train_no,viasite=[]):
        self.train_name = train_name
        self.first_site = first_site
        self.viasite = viasite
        self.offical_train_no = offical_train_no

    async def find_train(self,session,pbar_train):
        #根据12位火车编号通过官方api找到途径站点，之后确定是正序还是反序

        self.viasite = []   #途径站点list初始化
        train_url = train_viasite_url + 'train_no=' + self.offical_train_no + '&depart_date=' + str(datetime.date.today() + datetime.timedelta(days=1))
        
        async with session.get(train_url) as resp :
            site_no_array = []    #返回数据中的站点编号list初始化，返回的数据编号不是恒递增1的，可能增加任意值
            for site_no in (await resp.json())['data']:
                site_no_array.append(site_no)
            site_no_array.sort()

            for i in site_no_array:
                station_name = (await resp.json())['data'][i][0]
                station_name = ''.join(station_name.split())    #某些站点名称中含有空格，尚且不知道到底是什么意思，怀疑是水用站点，暂时一刀切去掉空格使用
                self.viasite.append(station_name)
        
        #初始站不对的话反序
        if(self.first_site != self.viasite[0]):
            viasite = self.viasite.reverse()
        pbar_train.update(1)

    def tosql(self):
        db = sql.sql()
        db.connect()
        db.addline(self.train_name,self.viasite,self.offical_train_no)
        db.close()

async def main():
    import requests
    import json
    
    tomorrow = str(datetime.date.today() + datetime.timedelta(days=1))
    resp = json.loads(requests.get(train_url).text[16:])[tomorrow]   
    
    train_name_array = []
    for grade in grade_list:
        for train_dict_i in resp[grade]:
            # train_name = re.match(r'.*\(',train_dict_i['station_train_code']).group()[:-1]
            # first_site
            temp_list = re.match(r'.*?-',train_dict_i['station_train_code']).group()[:-1].split('(')
            train_name = temp_list[0]
            first_site = temp_list[1] 
            train_name_array.append(train_name)
            offical_train_no = train_dict_i['train_no']
            locals()[train_name] = train(train_name,first_site,offical_train_no = offical_train_no)

    async with aiohttp.ClientSession() as session_train:
        with tqdm.tqdm(total=len(train_name_array),ncols=80,smoothing=0) as pbar_train:  
            for train_name in train_name_array:
                # print(train_name)
                await asyncio.create_task(locals()[train_name].find_train(session_train,pbar_train))
                locals()[train_name].tosql()

if __name__ == "__main__":
    asyncio.run(main())