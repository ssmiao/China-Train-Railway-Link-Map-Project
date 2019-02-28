# -*- coding:utf8 -*-

import pymysql

import config

db_config = config.configs['db']

class sql(object):

    def __init__(self,host=db_config['host'],port=db_config['port'],user=db_config['user'],password=db_config['password'],dbname=db_config['db']):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.dbname = dbname

    #连接数据库
    def connect(self):
        self._db = pymysql.connect(host=self.host,user =self.user,password =self.password,db = self.dbname,port=self.port ,charset='utf8')
        self._cursor = self._db.cursor()
    
    #关闭数据库
    def close(self):
        self._db.close()
    
    #自定义发送内容
    def send(self,infomation):
        self._cursor.execute(infomation)
        self._db.commit()
        rev_data = self._cursor.fetchall()

        return rev_data

    #加入火车线路信息到数据库
    def addline(self,train_name,viasite):
        
        #添加基础信息到Trains表
        self._cursor.execute('INSERT INTO Trains (Train_name,Grade) VAlUES (\'' + train_name +'\',\''+ train_name[0] + '\') on DUPLICATE KEY UPDATE RouteId = RouteId;')
        self._db.commit()        

        #todo：添加信息到RouteStations表
        for station_No in range(len(viasite)):
            self._cursor.execute('INSERT INTO RouteStation (Train_name,Station,Station_No) VAlUES (\'' + train_name +'\',\''+ viasite[station_No] +'\',\''+str(station_No)+ '\') on DUPLICATE KEY UPDATE RouteStationId = RouteStationId;')
            self._db.commit()        

        #INSERT INTO 表名称 VALUES (值1, 值2,....)
    
    #加入火车站点信息到数据库
    def addStation(self,station_name,pym,tmis,dbm,province,longitude,latitude):
        
        #去重加入新站点信息
        self._cursor.execute('INSERT INTO Stations (Station) VALUES (\''+station_name +'\') ON DUPLICATE KEY UPDATE stationId = stationId;')
        self._db.commit()
    
        #更新pym拼音码信息
        if(pym != ''):
            self._cursor.execute('UPDATE Stations SET PYM = \''+ pym +'\' WHERE Station = \''+station_name+'\';')
            self._db.commit()
        
        #更新tmis信息
        if(tmis != ''):
            self._cursor.execute('UPDATE Stations SET Tmis = '+ tmis +' WHERE Station = \''+station_name+'\';')
            self._db.commit()
        
        #更新dbm电报码信息
        if(dbm != ''):
            self._cursor.execute('UPDATE Stations SET DBM = \''+ dbm +'\' WHERE Station = \''+station_name+'\';')
            self._db.commit()

        #更新Province信息
        if(province != ''):
            self._cursor.execute('UPDATE Stations SET Province = \''+ province +' \' WHERE Station = \''+station_name+'\';')
            self._db.commit()
        
        #更新经纬度信息
        if(longitude != 0):
            self._cursor.execute('UPDATE Stations SET longitude = \''+ longitude +' \' WHERE Station = \''+station_name+'\';')
            self._cursor.execute('UPDATE Stations SET latitude = \''+ latitude +' \' WHERE Station = \''+station_name+'\';')            
            self._db.commit()

def main():
    db = sql()
    db.connect()
    print("success")
    db.close()

if __name__ == "__main__":
        main()