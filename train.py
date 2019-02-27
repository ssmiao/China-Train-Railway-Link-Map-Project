import aiohttp
import asyncio
import datetime
import re
import tqdm
import bs4

import config

train_url = config.configs['train_url']
grade_list = config.configs['grade_list']
train_timetable = config.configs['third_party_url']

class train(object):
    def __init__(self,train_name,first_site='',terminus='',viasite=''):
        self.train_name = train_name
        self.first_site = first_site
        self.terminus =terminus
        self.viasite = viasite
    
    async def find_train(self,session):
        train_timetable_url = train_timetable[0] + self.train_name +train_timetable[1]
        async with session.get(train_timetable_url) as resp:
            print(resp.text())
            # soup = BeautiSoup(await resp.text())
            # print(soup)
    def tosql():
        db = sql()
        db.connect()
        db.addline(self.train_name,self.first_site,self.terminus,self.viasite)
        db.close()

async def main():
    import requests
    import json
    
    tomorrow = str(datetime.date.today() + datetime.timedelta(days=1))
    # print(str(tomorrow))
    resp = json.loads(requests.get(train_url).text[16:])[tomorrow]
    
'''    
    for grade in grade_list:
       for train_dict in resp[grade]:
            train_name = re.match(r'.*\(',train_dict['station_train_code']).group()[:-1]
            # print(train_name)
            locals()[train_name] = train(train_name)

    async with aiohttp.ClientSession() as session_train:
        with tqdm.tqdm(total=len(grade_list),ncols=80,smoothing=0) as pbar_train:  
            for grade in grade_list:
                await asyncio.create_task(locals()[train_name].find_train(session_train))
'''
if __name__ == "__main__":
    asyncio.run(main())