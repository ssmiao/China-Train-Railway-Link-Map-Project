import urllib
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup

class wikipedia(object):
    def __init__(self,station_name,base_url = 'https://zh.wikipedia.org/wiki/',html=''):
        self.station_name = station_name
        self.base_url = base_url
        
    def find_page(self):
        # print("喵")
        try :
            # print("喵")
            self.html = urlopen(self.base_url+quote(self.station_name+'站')).read().decode('utf-8')
        except urllib.error.URLError:
            try:
                self.html = urlopen(self.base_url+quote(self.station_name+'乘降所')).read().decode('utf-8')
            except urllib.error.URLError:
                self.html = ''
        # return html

    def reptile(self):
        self.find_page()
        print("喵")
        if(self.html != ''):
            soup = BeautifulSoup(self.html,features="lxml")
            print(str(soup.find_all('span',class_="geo")[0]))
            # <span class="geo">39.90222; 116.42111</span>
        else:
            print('pass')
        
def main():
    wiki = wikipedia("上海虹桥")
    wiki.reptile()
    # urlopen('http://www.vjkbsdvjh.com/abs/fasfa.html')
if __name__ == "__main__":
        main()
        
