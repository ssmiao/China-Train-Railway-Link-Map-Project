# -*- coding:utf8 -*-

from urllib.request import urlopen
import tqdm
import re
import asyncio
import aiohttp

from station import station
import config

station_url = config.configs['station_url']

'''
For async_station:
    like main()-->async_init(This File)-->async func in class 'station'
    -->(maybe) next async func in other class

todo:精简代码
'''
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
            with tqdm.tqdm(total=len(self.station_dict),ncols=80,smoothing=0) as pbar_tmis:  
                for station_i in self.station_dict:
                    await asyncio.create_task(self.station_dict[station_i].async_get_tmis(session_tmis,pbar_tmis))

    async def get_basic_info(self):
        async with aiohttp.ClientSession() as session_basic_info:
            with tqdm.tqdm(total=len(self.station_dict),ncols=80,smoothing=0) as pbar_basic_info:  
                for station_i in self.station_dict:
                    await asyncio.create_task(self.station_dict[station_i].async_get_basic_info(session_basic_info,pbar_basic_info))

    async def get_location(self):
        async with aiohttp.ClientSession() as session_wiki_location:
            async with aiohttp.ClientSession() as session_amap:
                with tqdm.tqdm(total=len(self.station_dict),ncols=80,smoothing=0) as pbar_wiki_location:  
                    for station_i in self.station_dict:
                        await asyncio.create_task(self.station_dict[station_i].async_get_location(session_wiki_location,session_amap,pbar_wiki_location))

    async def get_google_location(self):
        async with aiohttp.ClientSession() as session_google_location:
            async with aiohttp.ClientSession() as session_amap:
                with tqdm.tqdm(total=len(self.station_dict),ncols=80,smoothing=0) as pbar_google_location:  
                    for station_i in self.station_dict:
                        await asyncio.create_task(self.station_dict[station_i].async_get_google_location(session_google_location,session_amap,pbar_google_location))

    async def get_amap_get_province(self):
        async with aiohttp.ClientSession() as session_amap_province:
            with tqdm.tqdm(total=len(self.station_dict),ncols=80,smoothing=0) as pbar_amap_province:  
                for station_i in self.station_dict:
                    await asyncio.create_task(self.station_dict[station_i].async_amap_get_province(session_amap_province,pbar_amap_province))


    def tosql(self):
        for station_i in self.station_dict:
            self.station_dict[station_i].tosql()