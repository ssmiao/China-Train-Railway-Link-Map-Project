import asyncio
import requests

async def  get_province(pym):  
        #尝试从12306官方接口获取所在省份信息
        # try:
    pinyin = pym
    url = 'https://www.12306.cn/yjcx/doPickJZM'
    params = dict(param=pinyin, type=1, czlx=0)
    response = requests.post(url, params)
    results = response.json()

    station_name = '北京'
    for result in results:
        if(station_name == result['ZMHZ']):
            province = result['SSJC']
            print("province = "+province)

asyncio.run(get_province('bj'))