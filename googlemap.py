from urllib.parse import quote
from urllib.request import urlopen
import requests

import config
import amap

google_map_key = config.configs['google_key']

class google_search(object):
    def __init__(self,location_name,latitude = 0,longitude = 0):
        self.location_name = location_name
        self.latitude = latitude
        self.longitude = longitude
    
    def find_geometry(self):
        fields = 'geometry'#,formatted_address,name'
        google_find_location_url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+quote(self.location_name)+'&inputtype=textquery&fields='+fields+'&key='+google_map_key
        
        r = requests.get(google_find_location_url)
        if(r.json()['status']=='OK'):
            self.latitude  = float(r.json()['candidates'][0]['geometry']['location']['lat'])
            self.longitude = float(r.json()['candidates'][0]['geometry']['location']['lng'])

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