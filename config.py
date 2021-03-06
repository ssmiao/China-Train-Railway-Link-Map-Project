# -*- coding:utf8 -*-

configs = {

#SQLData #也是Docker默认信息。如您已经自行修改，请替换成相应值。
'db':{
    'host':'127.0.0.1',
    'user' : 'CNTrain',
    'password' : 'CNTrain',
    'db' : 'CNTrain',
    'port':3306
},

#列车等级信息
# 'grade_list':["T","K","","D","Z","C","L","Y","G"],
'grade_list':['D','T','G','C','O','K','Z'],

#第三方来源网址,分为前缀和后缀
#这个站点用于提供大范围列车的时刻表，可能不能实时更新，但响应快 -->已更换成官方接口
'third_party_url' : ['http://qq.ip138.com/train/','.htm'],

#中文维基百科主域名
'wiki_url' : 'https://zh.wikipedia.org',

#省份简称对应，用于amap.py
'full_abbr_province_dict' : {'北京市':'京','浙江省':'浙','天津市':'津', '安徽省':'皖','上海市':'沪','福建省':'闽','重庆市':'渝','江西省':'赣','香港特别行政区':'港','香港特別行政區':'港','山东省':'鲁','澳门特别行政区':'澳','澳门特别行政區':'澳' ,'河南省': '豫', '内蒙古自治区':'蒙','湖北省':'鄂', '新疆维吾尔自治区':'新', '湖南省':'湘','宁夏回族自治区':'宁','广东省':'粤','西藏自治区':'藏','海南省':'琼', '广西壮族自治区':'桂','四川省':'川','河北省':'冀','贵州省':'贵','山西省': '晋','云南省':'云','辽宁省':'辽','陕西省':'陕','吉林省':'吉','甘肃省':'甘','黑龙江省':'黑','青海省':'青','江苏省':'苏','台湾省':'台'},

#高德地图api_key
'amap_web_key' : 'ee57ba72408511a2322d64b3f65dc273',

#谷歌地图api_key
'google_key':'AIzaSyA7fsh-d7y5oWJL9HP64blPn3Zy--6_Vq8',


#官方站点信息
#这个文件包含站名和拼音名，随实际状况更新，序号可能变化,(事实证明并不完整，如赛乌苏站，叶榭站..etc（截止于2019.3.1)）
'station_url' : 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js',

#这个文件包含列车车票发售期限内的列车安排，随实际情况更新
'train_url' : 'https://kyfw.12306.cn/otn/resources/js/query/train_list.js',

#这儿可以查到某辆火车的途径站点 
'train_viasite_url' : 'https://www.12306.cn/index/otn/index12306/queryStopStations?',
#必填参数也是仅有的参数：
# train_no=5e0000K42291  #火车序列号
# &depart_date=2019-02-1 #日期

#这儿可以查到某辆火车某天的时刻表和途径站点 -->尚未使用
'train_viasite_timetable_url' : 'https://kyfw.12306.cn/otn/czxx/queryByTrainNo?'
#必填参数也是仅有的参数如下：
# train_no=240000G1010I         #火车序列号
# &from_station_telecode=VNP    #出发站电报码
# &to_station_telecode=AOH      #到达站电报码
# &depart_date=2019-03-02'      #出发日期


#尚未解析好的api：
#https://www.12306.cn/mormhweb/kyyyz/beijing/201001/t20100124_1165.html


}