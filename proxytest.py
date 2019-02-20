#! /usr/bin/env python3
# -*- coding:utf8 -*-

import requests

proxies = {
    'http': 'socks5://127.0.0.1:1080',
    'https': 'socks5://127.0.0.1:1080'
}

a= requests.get("https://zh.wikipedia.org/wiki/北京站", proxies=proxies)#,verify=False)
#zh.wikipedia.org
print(a.text)