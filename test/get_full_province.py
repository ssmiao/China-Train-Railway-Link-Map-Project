# -*- coding:utf8 -*-

from sql import sql
from station import station

db = sql()

db.connect()
data = db.send(' select Station,PYM from Stations where Province is null and  PYM IS NOT NULL; ')

# print(data[0][1])
for station_tuple in data:
    station_i = station(station_tuple[0],pym = station_tuple[1])
    station_i.get_more_infor()
    station_i.tosql()
    if(station_i.province != ''):
        print(station_i.station_name)
    else:
        print('...')

db.close()