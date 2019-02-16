#class station
import requests
import json
from string import ascii_uppercase as alphabet
from collections import OrderedDict
from sql import sql

class station(object):#todo:添加经纬坐标
    def __init__(self,station_name,pym='',tmis='',dbm='',province=''):
                #是站点名称station_name，拼音码pym，中国车站代码tmis，电报码dbm
        self.station_name = station_name
        self.pym = pym
        self.tmis = tmis
        self.dbm = dbm
        self.province = province
        if(tmis == ''):
            self.get_tmis()
        
    #get_*是封装来自emu-tools的代码
    def get_tmis(self):
        name = self.station_name 
        bureau=0
        url = 'http://hyfw.12306.cn/hyinfo/action/FwcszsAction_getljcz'
        params = 'limit timestamp sheng shi'
        params = {k: '' for k in params.split()}
        params.update(q=name, ljdm=format(bureau, '02'))
        while True:
            try:
                response = requests.post(url, params, timeout=1).json()
            # except (requests.exceptions.Timeout, json.JSONDecodeError):
            except:
                pass
            else:
                break
        # return OrderedDict((d['HZZM'], d['TMISM']) for d in response)
        for k, v in (OrderedDict((d['HZZM'], d['TMISM']) for d in response)).items():
            if(self.station_name == k):
                self.tmis = v

    def get_more_infor(self):
        try:
            if(self.pym != ''):
                pinyin = self.pym
                url = 'https://www.12306.cn/yjcx/doPickJZM'
                params = dict(param=pinyin, type=1, czlx=0)
                response = requests.post(url, params)
                results = json.loads(response.text)
                
                # if len(results) < 100:
                #     pass
                # else:
                #     #Load recursively when the API limit is exceeded.
                #     results =  results.append(sum((get_more_infor(pinyin + c) for c in alphabet), []))
                
                for result in results:
                    if(self.station_name == result['ZMHZ']):
                        self.province = result['SSJC']
                        # self.dbm = result['DBM']
                        # print(self.province)
        except:
            pass
        if(self.province == ''):
            pass    #从维基百科获取

    
    def tosql(self):
        dbe = sql()
        dbe.connect()
        dbe.addStation(self.station_name,self.pym,self.tmis,self.dbm,self.province)
        dbe.close()

if __name__ == "__main__":
    st = station('北京','bj')
    st.get_more_infor()
    print(type(st.dbm))