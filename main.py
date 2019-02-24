# -*- coding:utf8 -*-

# from multiprocessing import Pool
import re,random,os,asyncio

from station import station
from train import train
from async_init import async_station_init

def main():
    # st = station()
    # st.init_station_str()
    async_station = async_station_init()
    asyncio.run(async_station.get_basic_info())
    asyncio.run(async_station.get_tmis())
    asyncio.run(async_station.get_google_location())

if __name__ == "__main__":
        main()
