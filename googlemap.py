from urllib.parse import quote
from urllib.request import urlopen
import re

import config

google_map_key = config.configs['google_key']

class google_search(object):
    def __init__(self,location_name,latitude = 0,longitude = 0):
        self.location_name = location_name
    
    def find_geometry(self):
        fields = 'geometry'#,formatted_address,name'
        google_find_location_url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+quote(self.location_name)+'&inputtype=textquery&fields='+fields+'&language=zh&key='+google_map_key
        html = urlopen(google_find_location_url).read().decode('utf-8')
        if(re.findall(r'"status" : "OK"',html)):
            self.latitude  = float(re.findall(r'"lat" : .*?,',html)[0][8:-1])
            self.longitude = float(re.findall(r'"lng" : .*',html)[0][8:-1])

            #转化为高德坐标
            amap_trans = amap.amap_trans(self.longitude,self.latitude)
            amap_trans.trans()
            self.longitude = amap_trans.longitude
            self.latitude = amap_trans.latitude


if __name__ == "__main__":
    google = google_search('宋站')
    google.find_geometry()
    print(google.latitude)
    print(google.longitude)