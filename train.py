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
train_timetable = config.configs['third_party_url']

class train(object):
    
    def __init__(self,train_name,viasite=[]):
        self.train_name = train_name
        self.viasite = viasite

    async def find_train(self,session,pbar_train):
        self.viasite = []
        train_timetable_url = train_timetable[0] + self.train_name +train_timetable[1]
        async with session.get(train_timetable_url) as resp:
            try :
                soup = BeautifulSoup(await resp.text(),'lxml')
                soup.find_all("table",border="1")
                try :
                    for line in re.findall(r'onclick="setFrom\(.*?,',str(soup.find_all("table",border="1",width="780")[1])):
                        self.viasite.append(line[18:-2])
                except IndexError:
                    pass
            except UnicodeDecodeError :
                pass
            pbar_train.update(1)

    def tosql(self):
        db = sql.sql()
        db.connect()
        db.addline(self.train_name,self.viasite)
        db.close()

async def main():
    import requests
    import json
    
    tomorrow = str(datetime.date.today() + datetime.timedelta(days=1))
    resp = json.loads(requests.get(train_url).text[16:])[tomorrow]   
    
    train_name_array = []
    for grade in grade_list:
        for train_dict_i in resp[grade]:
            train_name = re.match(r'.*\(',train_dict_i['station_train_code']).group()[:-1]
            train_name_array.append(train_name)
            locals()[train_name] = train(train_name)

    async with aiohttp.ClientSession() as session_train:
        with tqdm.tqdm(total=len(train_name_array),ncols=80,smoothing=0) as pbar_train:  
            for train_name in train_name_array:
                # print(train_name)
                await asyncio.create_task(locals()[train_name].find_train(session_train,pbar_train))
                locals()[train_name].tosql()
if __name__ == "__main__":
    asyncio.run(main())