
import pymysql

#SQLData
host='127.0.0.1'
user = 'CNTrain'
password = 'password'
db = 'CNTrain'
port=3306
#########

class sql(object):
    def __init__(self,host= '127.0.0.1',port=3306,user='CNTrain',password= 'password',dbname= 'CNTrain'):
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
    
    #加入火车线路信息到数据库
    def addline(self,pym,train_name,first_site,terminus,viasite):
        pass#INSERT INTO 表名称 VALUES (值1, 值2,....)
    
    #加入火车站点信息到数据库
    def addStation(self,station_name,pym,tmis,dbm,province):
        
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

        #更新Provinces信息
        if(province != ''):
            self._cursor.execute('UPDATE Stations SET Province = \''+ province +' \' WHERE Station = \''+station_name+'\';')
            self._db.commit()