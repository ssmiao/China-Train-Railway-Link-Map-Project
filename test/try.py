import requests
import json

temp_strange_basic_url = 'https://www.12306.cn/index/otn/index12306/queryStopStations?'

# offical_train_no='25000K765101'
offical_train_no='240000G1010I'
depart_date='2019-03-01'
# for station in station_array:
temp_strange_url = temp_strange_basic_url +'train_no=' + offical_train_no + '&depart_date=' + depart_date
resp = requests.get(temp_strange_url)
re = resp.json()['data']
dbm_dict = {}
for tag in re:
    dbm_dict[re[tag][0]] = re[tag][1]
print(dbm_dict)