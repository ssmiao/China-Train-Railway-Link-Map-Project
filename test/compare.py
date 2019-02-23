import requests
import tqdm
from urllib.request import urlopen

def get_province(station_name,station_pym,pbar):  
    #尝试从12306官方接口获取所在省份信息
        if(station_pym != ''):
            url = 'https://www.12306.cn/yjcx/doPickJZM'
            params = dict(param=station_pym, type=1, czlx=0)
            r = requests.post(url, params)
            results = r.json()

            for result in results:
                if(station_name == result['ZMHZ']):
                    province = result['SSJC']
                    pbar.update(1)
                    print(province)

station_url = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js'
html = urlopen(station_url).read().decode('utf-8')
station_str_array = html[21:-2].split("@")
with tqdm.tqdm(total=len(station_str_array),ncols=80) as pbar:
    for station_str in station_str_array:
        station_name = station_str.split("|")[1]
        station_pym = station_str.split("|")[-2]
        get_province(station_name,station_pym,pbar)