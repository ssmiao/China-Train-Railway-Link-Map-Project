# China-Train-Railway-Link-Map-Project
中国铁路数据收集与可视化

这里是一个中国铁路信息数据库。

这里不能帮助你买到火车票，但也许能让你更加享受火车旅途。

## 数据来源
我们的数据来源于12306官方网站接口，中文维基百科，高德地图，谷歌地图

## 依赖：
### Python 依赖
tqdm ~~bs4~~ requests pymysql lxml aiohttp

以及一个3.7.0+的Python

### 数据库依赖
使用了Mariadb，理论上这个量级的数据大多数数据库都可以处理。

推荐直接使用已经建立好的数据库docker来部署。
当然你也可以直接使用[init.sql](init.sql)中的DDL语句自行部署。

```
sudo docker push farthing0/cntrain_sql:0.0.10.alpha  #todo:改善版本号命名

sudo docker run -p 0.0.0.0:3306:3306 cntrain_sql:0.0.10.alpha

```

### 网络说明

你可能需要可以自由的访问中文维基百科,谷歌地图才可以使用部分功能。

## 开源说明

感谢Arnie97的使用MIT协议的开源项目emu-tools https://github.com/Arnie97/emu-tools 本项目部分使用了来自该项目提供的部分接口和部分代码。

## 考虑的方向

*原则上讲，我们只收录目前尚在使用的站点信息。所有站名来自官方接口.但可能在数据库建立之后废弃的站点不会得到删除。

*我们主要收集客运站信息，但不排斥不办理客运业务的站点的信息。

*我们主要信息源尽可能来自于官方以配合火车数据的实时更新，但因为种种原因，我们有时也只能采用来自第三方的数据。

*在使用第三方网站的信息时，我们会特地表明（完全来自第三方/来自第三方并结合官方数据进行过可能不完全的修正）并尽量提供实时从官方网站更新的选项。

*存在这样的情况：某些实际存在的站点和车次因为主要用作通勤，往来车辆较少或其他原因不在12306发售车票，因此也无法在12306客运网站上检索到相关站点的信息。对于这样的站点，我们优先从官方货运界面获取相关信息，也会考虑从第三方网站获取信息。

## 功能性说明

第一个小功能是一个交互式界面，将用于实时展示当前火车到站信息。

## 进度说明

站点和列车数据库基本搭建完毕。