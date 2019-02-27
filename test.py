from bs4 import BeautifulSoup
import requests

import config
def main():
    # url = config.configs['third_party_url'][0] +'D1'+ config.configs['third_party_url'][1]
    # r = requests.get(url)
    # r.encoding = 'GB2312'
    url = 'http://home/farthing/temp/exampleG128.htm'
    r = requests.get(url)
    r.encoding = 'GB2312'
    soup = BeautifulSoup(r.text,'lxml')
    print(soup)
    # soup.find_all("table",border="1")
    # print(soup.find_all("table",border="1",width="780")[1].find_all("td"))

main()