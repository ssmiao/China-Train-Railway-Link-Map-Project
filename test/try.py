import requests,datetime,json,re

url = 'https://kyfw.12306.cn/otn/resources/js/query/train_list.js'

resp = requests.get(url)

tomorrow = str(datetime.date.today() + datetime.timedelta(days=1))
resp = json.loads(requests.get(url).text[16:])[tomorrow]   

train_name_array = []
for train_dict_i in resp['D']:
    temp_list = re.match(r'.*?-',train_dict_i['station_train_code']).group()[:-1].split('(')
    train_name = temp_list[0]
    first_site = temp_list[1]    
    print(train_name+'  '+first_site)
    offical_train_no = train_dict_i['train_no']
    train_name_array.append(train_name)

# print(train_name_array)