import requests
import json

url = 'https://kyfw.12306.cn/otn/resources/js/query/train_list.js'
r = requests.get(url)
for train in json.loads(r.text[16:])["2019-02-24"]["G"]:
    print(train['station_train_code'].split('(')[0]+' ',end = '')