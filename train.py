class train(object):
    def __init__(self,train_name,first_site,terminus,viasite):
        self.name = train_name
        self.first_site = first_site
        self.terminus =terminus
        self.viasite = viasite
    
    def tosql():
        db = sql()
        db.connect()
        db.addline(self.train_name,self.first_site,self.terminus,self.viasite)
        db.close()