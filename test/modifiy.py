import requests
from collections import OrderedDict

def get_tmis(station_name):
    name = station_name 
    bureau=0
    url = 'http://hyfw.12306.cn/hyinfo/action/FwcszsAction_getljcz'
    params = {'limit': '', 'timestamp': '', 'sheng': '', 'shi': ''}
    print(params)
    params.update(q=name, ljdm=format(bureau, '02'))
    print(params)
    while True:
        try:
            response = requests.post(url, params, timeout=1).json()
            print(response)
        except (requests.exceptions.Timeout, json.JSONDecodeError):
            pass
        else:
            break
    for k, v in (OrderedDict((d['HZZM'], d['TMISM']) for d in response)).items():
        if(station_name == k):
            tmis = v
get_tmis('北京')