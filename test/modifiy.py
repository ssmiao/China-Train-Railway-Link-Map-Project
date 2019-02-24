import aiohttp
import asyncio
from urllib.parse import quote

base_url = 'https://zh.wikipedia.org/wiki'
station_name = '北京'
async def async_find_location():
    async with aiohttp.ClientSession() as session:    
        # wiki_url = base_url+quote(station_name+'站')
        wiki_url = 'https://zh.wikipedia.org/wiki/%E5%8C%97%E4%BA%AC%E7%AB%99'
        async with session.head(wiki_url) as resp:
            # if(resp.status == 404):
            #     wiki_url = base_url+quote(station_name+'乘降所')
            #     async with session.head(wiki_url) as resp:
            #         print(resp.status)# == 200
            #         print(await resp.text())
            #         # self.soup = BeautifulSoup(await resp.text(),features="lxml")
            # else:
                print(resp.status)# == 200
                print(await resp.text())

asyncio.run(async_find_location())