# China-Train-Railway-Link-Map-Project
中国铁路数据收集与可视化


这里是一个中国铁路信息数据库。

##数据来源

我们的数据来源于12306官方网站接口，中文维基百科，高德地图，谷歌地图（计划中）

## 依赖：
### Python 依赖
IPython(可选) bs4

### 数据库依赖
使用了Mariadb，理论上这个量级的数据大多数数据库都可以处理。

目前有三张表。
```
CREATE TABLE `Stations` (
  `Station` char(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `StationId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Tmis` int(7) DEFAULT NULL,
  `Province` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DBM` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电报码',
  `PYM` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '拼音码',
  PRIMARY KEY (`StationId`),
  UNIQUE KEY `Stations_UN` (`Station`)
) ENGINE=InnoDB AUTO_INCREMENT=156653 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Trains` (
  `Train_name` int(6) NOT NULL DEFAULT 0,
  `Grade` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RouteId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`RouteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `RouteStations` (
  `RouteId` int(11) NOT NULL DEFAULT 0,
  `StationId` int(10) unsigned NOT NULL,
  `RouteOrder` int(5) NOT NULL,
  PRIMARY KEY (`RouteId`,`StationId`),
  KEY `RouteStations_Stations_FK` (`StationId`),
  CONSTRAINT `RouteStations_Stations_FK` FOREIGN KEY (`StationId`) REFERENCES `Stations` (`StationId`),
  CONSTRAINT `RouteStations_Trains_FK` FOREIGN KEY (`routeId`) REFERENCES `Trains` (`routeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

```

### 网络说明
你可能需要可以自由的访问中文维基百科,谷歌地图（将来版本）才可以使用部分功能。

## 开源说明

特别感谢Arnie97的使用MIT协议的开源项目emu-tools https://github.com/Arnie97/emu-tools 本项目部分使用了来自该项目提供的接口和代码。


### 考虑的方向
-原则上讲，我们只收录目前尚在使用的站点信息。所有站名来自官方接口.但可能在2019.2.16之后废弃的站点不会得到删除。

-我们主要收集客运站信息，但不排斥货运车站的信息。

-我们主要信息源尽可能来自于官方以更上火车时刻等实时更新，但为了兼顾效率，我们也收集来自第三方网站的信息。

-在使用第三方网站的信息时，我们会特地表明（完全来自第三方/来自第三方并结合官方数据进行过可能不完全的修正）并尽量提供实时从官方网站更新的选项。

### 功能性说明
第一个小功能是一个交互式界面，将用于实时展示当前火车到站信息。
