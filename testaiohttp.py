import aiohttp
import asyncio
import json
from urllib.request import urlopen

import tqdm

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
            for result in data :
                if(self.station_name == result['ZMHZ']):
                    self.province = result['SSJC']
                    # print(self.station_name+':'+self.province)
                pbar_basic_info.update(1)

    async def async_get_tmis(self,session,pbar_tmis):
        pbar_tmis.set_description("tmis进度")
        bureau=0
        tmis_url = 'http://hyfw.12306.cn/hyinfo/action/FwcszsAction_getljcz'
        # tmis_params = {'limit': '', 'timestamp': '', 'sheng': '', 'shi': ''}
        tmis_params.update(q=self.station_name, ljdm=format(bureau, '02'))
        
        async with session.post(tmis_url,data = tmis_params) as resp:
            for result in json.loads(await resp.text()):
                if(self.station_name == result['HZZM']):
                    self.tmis = result['TMISM']
                    # print(self.station_name+':'+self.tmis)
                pbar_tmis.update(1)
                    
async def get_basic_info():
    html = urlopen(station_url).read().decode('utf-8')
    station_str_array = html[21:-2].split("@")

    #创建所有车站的对象，获得基本信息
    async with aiohttp.ClientSession() as session_basic_info:
        with tqdm.tqdm(total=len(station_str_array),ncols=80) as pbar_basic_info:
            for station_str in station_str_array:
                station_name = station_str.split("|")[1]
                station_pym = station_str.split("|")[-2]
                #创建所有车站的对象
                locals()[station_name] = station(station_name,station_pym)
                #获得基础信息
                await asyncio.create_task(locals()[station_name].async_get_basic_info(session_basic_info,pbar_basic_info))

async def get_tmis(station_name_array):
    for station_name in station_name_array:
        # global locals()[station_name]       
        async with aiohttp.ClientSession() as session_tmis:
            with tqdm.tqdm(total=len(station_name_array),ncols=80) as pbar_tmis:
                await asyncio.create_task(locals()[station_name].get_tmis(session_tmis,pbar_tmis))    
#问题：如何传递所有外部创建的对象进函数？

def async_station_init():
    html = urlopen(station_url).read().decode('utf-8')
    station_str_array = html[21:-2].split("@")
    with tqdm.tqdm(total=len(station_str_array),ncols=80) as pbar_async_init:
        pbar_async_init.set_description("初始化进度")
        station_name_array = []
        for station_str in station_str_array:
            station_name =station_str.split("|")[1]
            station_name_array.append(station_name)
            station_pym = station_str.split("|")[-2]
            #创建所有车站的对象
            locals()[station_name] = station(station_name,station_pym)
            pbar_async_init.update(1)
        return station_name_array

if __name__ == "__main__":
    station_name_array = async_station_init()
    # asyncio.run(get_basic_info())
    asyncio.run(get_tmis(station_name_array))