import asyncio
# import requests
import urllib.parse
import sys
# async def  get_province(pym):  
#         #尝试从12306官方接口获取所在省份信息
#         # try:
#     pinyin = pym
#     url = 'https://www.12306.cn/yjcx/doPickJZM'
#     params = dict(param=pinyin, type=1, czlx=0)
#     response = requests.post(url, params)
#     results = response.json()

#     station_name = '北京'
#     for result in results:
#         if(station_name == result['ZMHZ']):
#             province = result['SSJC']
#             print("province = "+province)

# asyncio.run(get_province('bj'))
station_url = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js'
# station_url = 'http://www.baidu.com'
async def wget(url):
    url = urllib.parse.urlsplit(url)
    print(url.hostname)
    if url.scheme == 'https':
        reader, writer = await asyncio.open_connection(
            url.hostname, 443, ssl=True)
    else:
        reader, writer = await asyncio.open_connection(
            url.hostname, 80)

    query = (
        f"GET {url.path or '/'} HTTP/1.0\r\n"
        f"Host: {url.hostname}\r\n"
        f"\r\n"
    )

    writer.write(query.encode('utf-8'))
    line = await reader.read()
    print(line.decode('utf-8'))
    writer.close()
    
asyncio.run(wget(station_url))
