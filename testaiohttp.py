import aiohttp
import asyncio
import json
import re
from urllib.request import urlopen
import tqdm


from wiki import wikipedia

station_url = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js'
tmis_params = {'limit': '', 'timestamp': '', 'sheng': '', 'shi': ''}

class station(object):
    def __init__(self,station_name ='',pym='',tmis='',dbm='',province='',longitude=0,latitude=0):
                #是站点名称station_name，拼音码pym，中国车站代码tmis，电报码dbm,经度longitude，纬度latitude
        self.station_name = station_name
        self.pym = pym
        self.tmis = tmis
        self.dbm = dbm
        self.province = province
        self.longitude = longitude
        self.latitude =latitude

    async def async_get_basic_info(self,session,pbar_basic_info):
        pbar_basic_info.set_description("basic_info进度")
        province_url = 'https://www.12306.cn/yjcx/doPickJZM'
        province_params = dict(param=self.pym, type=1, czlx=0)
        async with session.post(province_url,data = province_params) as resp:
            assert resp.status == 200
            data = json.loads(await resp.text())
            # print(data)
            for result in data :
                if(self.station_name == result['ZMHZ']):
                    self.province = result['SSJC']
                    # print(self.station_name+':'+self.province)
            pbar_basic_info.update(1)

    async def async_get_tmis(self,session,pbar_tmis):
        pbar_tmis.set_description("tmis进度")
        bureau=0
        tmis_url = 'http://hyfw.12306.cn/hyinfo/action/FwcszsAction_getljcz'
        tmis_params.update(q=self.station_name, ljdm=format(bureau, '02'))
        
        async with session.post(tmis_url,data = tmis_params) as resp:
            for result in json.loads(await resp.text()):
                if(self.station_name == result['HZZM']):
                    self.tmis = result['TMISM']
                pbar_tmis.update(1)
    
    ###todo:
    async def async_get_location(self,session,pbar_location):
        pbar_location.set_description("维基地点分析进度")        
        #调用维基百科
        wiki = wikipedia(self.station_name)
        await asyncio.create_task(wiki.async_find_location(session))
        self.longitude = wiki.longitude
        self.latitude = wiki.latitude
        pbar_location.update(1)

class async_station_init(object):

    def __init__(self):
        html = urlopen(station_url).read().decode('utf-8')
        station_str_array = html[21:-2].split("@")
        with tqdm.tqdm(total=len(station_str_array),ncols=80) as pbar_async_init:
            pbar_async_init.set_description("初始化进度")
            self.station_dict = {}
            for station_str in station_str_array:
                station_name =station_str.split("|")[1]
                if(re.findall(r' ',station_name)):
                    continue
                station_pym = station_str.split("|")[-2]
                station_dbm = station_str.split("|")[2]
                #创建所有车站的对象
                locals()[station_name] = station(station_name,pym = station_pym,dbm = station_dbm)
                self.station_dict[station_name] = locals()[station_name]
                pbar_async_init.update(1)

    async def get_tmis(self):
        async with aiohttp.ClientSession() as session_tmis:
            with tqdm.tqdm(total=len(self.station_dict),ncols=80) as pbar_tmis:  
                for station_i in self.station_dict:
                    await asyncio.create_task(self.station_dict[station_i].async_get_tmis(session_tmis,pbar_tmis))

    async def get_basic_info(self):
        async with aiohttp.ClientSession() as session_basic_info:
            with tqdm.tqdm(total=len(self.station_dict),ncols=80) as pbar_basic_info:  
                for station_i in self.station_dict:
                    await asyncio.create_task(self.station_dict[station_i].async_get_basic_info(session_basic_info,pbar_basic_info))

    async def get_location(self):
        async with aiohttp.ClientSession() as session_wiki_location:
            with tqdm.tqdm(total=len(self.station_dict),ncols=80) as pbar_wiki_location:  
                for station_i in self.station_dict:
                    await asyncio.create_task(self.station_dict[station_i].async_get_location(session_wiki_location,pbar_wiki_location))

if __name__ == "__main__":
    async_station_init = async_station_init()
    # asyncio.run(async_station_init.get_basic_info())
    # asyncio.run(async_station_init.get_tmis())
    asyncio.run(async_station_init.get_location())
