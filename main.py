# -*- coding:utf8 -*-

# from multiprocessing import Pool
import re,random,os,asyncio

from station import station
from train import train
from async_init import async_station_init

def main():

    async_station = async_station_init()
    asyncio.run(async_station.get_basic_info())       #需求：station_init
#     asyncio.run(async_station.get_tmis())             #需求：station_init
    asyncio.run(async_station.get_location())           #需求：station_init
    asyncio.run(async_station.get_google_location())    #需求：station_init,最好先执行get_location()提高准确度
    asyncio.run(async_station.get_amap_get_province())  #需求：get_location()/get_google_location(),最好先执行get_basic_info()
    async_station.tosql()

if __name__ == "__main__":
        main()