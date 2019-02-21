# -*- coding:utf8 -*-
from urllib.request import urlopen
import re

full_abbr_province_dict = {'北京市':'京','浙江省':'浙','天津市':'津', '安徽省':'皖','上海市':'沪','福建省':'闽','重庆市':'渝','江西省':'赣','香港特别行政区':'港','香港特別行政區':'港','山东省':'鲁','澳门特别行政区':'澳','澳门特别行政區':'澳' ,'河南省': '豫', '内蒙古自治区':'蒙','湖北省':'鄂', '新疆维吾尔自治区':'新', '湖南省':'湘','宁夏回族自治区':'宁','广东省':'粤','西藏自治区':'藏','海南省':'琼', '广西壮族自治区':'桂','四川省':'川','河北省':'冀','贵州省':'贵','山西省': '晋','云南省':'云','辽宁省':'辽','陕西省':'陕','吉林省':'吉','甘肃省':'甘','黑龙江省':'黑','青海省':'青','江苏省':'苏'}

amap_web_url = 'ee57ba72408511a2322d64b3f65dc273'
class amap_search(object):
    def __init__(self,longitude,latitude,province=''):
        self.longitude = longitude
        self.latitude = latitude
        self.province = province
    
    def get_province(self):
        #restapi.amap.com/v3/geocode/regeo?key=您的key&location=116.481488,39.990464&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0
        url = 'https://restapi.amap.com/v3/geocode/regeo?key='+amap_web_url+'&location='+str(self.longitude)+','+str(self.latitude)+'&poitype=&radius=100&extensions=base&batch=false&roadlevel=0'
        html = urlopen(url).read().decode('utf-8')
        if(re.search('\"infocode\":\"10000\"',html)):
            full_province = re.search(r'\"province\":.*?\",',html).group()[12:-2]
            self.province = full_abbr_province_dict[full_province]


def main():
    amap = amap_search(116.42111,39.90222)
    amap.get_province()
    print(amap.province)
if __name__ == "__main__":
        main()