import requests
import re
import json
import time

start = time.time()
wiki_url = 'https://zh.wikipedia.org/wiki/%E5%8C%97%E4%BA%AC%E7%AB%99'

html = requests.get(wiki_url)
find = re.search(r'{"lat":.*?,"lon":.*?}',html.text)
print(json.loads(find.group())['lat'])
print(time.time()-start)
