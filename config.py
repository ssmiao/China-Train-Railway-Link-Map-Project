# -*- coding:utf8 -*-

#SQLData
host='127.0.0.1'
user = 'CNTrain'
password = 'password'
db = 'CNTrain'
port=3306
##########

#列车等级信息
grade_list=["T","K","","D","Z","C","L","Y","G"]

#第三方来源网址,分为前缀和后缀
third_party_url = ['http://qq.ip138.com/train/','.htm']#这个站点用于提供大范围列车的时刻表，可能不能实时更新，但响应快

#官方站点信息
station_url = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js'#这个文件包含站名和拼音名，随实际状况更新，序号可能变化
##########

#维基百科或其反向代理界面

#wiki_url = 'https://zh.wikipedia.org'
wiki_url = 'https://pc.bk.wjbk.site/'