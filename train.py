import aiohttp
import asyncio
import datetime
import re
import tqdm

import sql
import station 
import config

train_url = config.configs['train_url']
grade_list = config.configs['grade_list']
train_viasite_url = config.configs['train_viasite_url']

#几乎每个api都要求指定日期
depart_date = str(datetime.date.today() + datetime.timedelta(days=1)) #暂时先统一使用当前时间的第二天，后续版本增加选择项

class train(object):
    
    def __init__(self,train_name,first_site,offical_train_no,viasite=[]):
        self.train_name = train_name
        self.first_site = first_site
        self.viasite = viasite
        self.offical_train_no = offical_train_no

    #（异步化）根据12位火车编号通过官方api找到途径站点，之后确定是正序还是反序 
    # ————>todo：使用含有到站/发站时间的接口取代现有接口
    async def find_train(self,session,pbar_train):

        self.viasite = []   #途径站点list初始化
        train_url = train_viasite_url + 'train_no=' + self.offical_train_no + '&depart_date=' + depart_date
        
        async with session.get(train_url) as resp :
            site_no_array = []    #返回数据中的站点编号list初始化，返回的数据编号不是恒递增1的，可能增加任意值
            for site_no in (await resp.json())['data']:
                site_no_array.append(site_no)
            site_no_array.sort()

            for i in site_no_array:
                station_name = (await resp.json())['data'][i][0]

                #某些站点名称中含有空格，12306自己储存环线时使用（如D7154），予以去除空格
                station_name = ''.join(station_name.split())    
                self.viasite.append(station_name)
        
        #初始站不对的话反序
        if(self.first_site != self.viasite[0]):
            viasite = self.viasite.reverse()
        pbar_train.update(1)

    # 这个函数会将station_array中的station的基本信息从奇怪的渠道收集到并加入至Stations数据库
    # 在将火车途经站点加入数据库时发现某些站点在Stations表中不存在的时候将会调用这个函数
    # 接口来自检票口查询页 https://www.12306.cn/index/view/infos/ticket_check.html
    # 注意self.train_name需要经过这个站才可以使用这个方式
    def temp_add_station_sql(self,station_array):
        temp_strange_basic_url = 'https://www.12306.cn/index/otn/index12306/queryStopStations?'
        # train_no=25000K765101&depart_date=2019-03-01'
        temp_strange_url = temp_strange_basic_url +'train_no=' + offical_train_no + '&depart_date=' + depart_date
        resp = requests.get(temp_strange_url)
        re = resp.json()['data']
        dbm_dict = {}
        for tag in re:
            dbm_dict[re[tag][0]] = re[tag][1]   #建立station_name:station_dbm对应的dict  
        for station_name in station_array:
            temp_station_class = station.station(station_name,dbm = dbm_dict[station_name])
            temp_station_class.get_tmis()
            temp_station_class.get_location()
            temp_station_class.get_province()            
            temp_station_class.tosql()
    
    def tosql(self):
        db = sql.sql()
        db.connect()
        nofound_station_array = db.addline(self.train_name,self.viasite,self.offical_train_no)
        self.temp_add_station_sql(self,nofound_station_array)   #将没有添加的站点添加到数据库
        db.addline(self.train_name,self.viasite,self.offical_train_no)
        db.close()

async def main():
    import requests
    import json
    
    tomorrow = str(datetime.date.today() + datetime.timedelta(days=1))
    resp = json.loads(requests.get(train_url).text[16:])[tomorrow]   
    
    train_name_array = []
    for grade in grade_list:
        for train_dict_i in resp[grade]:
            # train_name = re.match(r'.*\(',train_dict_i['station_train_code']).group()[:-1]
            # first_site
            temp_list = re.match(r'.*?-',train_dict_i['station_train_code']).group()[:-1].split('(')
            train_name = temp_list[0]
            first_site = temp_list[1] 
            train_name_array.append(train_name)
            offical_train_no = train_dict_i['train_no']
            locals()[train_name] = train(train_name,first_site,offical_train_no = offical_train_no)

    async with aiohttp.ClientSession() as session_train:
        with tqdm.tqdm(total=len(train_name_array),ncols=80,smoothing=0) as pbar_train:  
            for train_name in train_name_array:
                # print(train_name)
                await asyncio.create_task(locals()[train_name].find_train(session_train,pbar_train))
                locals()[train_name].tosql()

if __name__ == "__main__":
    asyncio.run(main())