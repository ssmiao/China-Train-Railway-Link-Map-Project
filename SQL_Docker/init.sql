
CREATE TABLE `Stations` (
  `Station` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `StationId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Tmis` int(7) DEFAULT NULL,
  `Province` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DBM` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电报码',
  `PYM` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '拼音码',
  `longitude` decimal(11,7) DEFAULT NULL,
  `latitude` decimal(11,7) DEFAULT NULL,
  PRIMARY KEY (`StationId`),
  UNIQUE KEY `Stations_UN` (`Station`)
) ENGINE=InnoDB AUTO_INCREMENT=160426 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Trains` (
  `Train_name` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `Grade` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RouteId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `offical_train_no` char(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RouteId`),
  UNIQUE KEY `Trains_UN` (`Train_name`)
) ENGINE=InnoDB AUTO_INCREMENT=21266 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `RouteStation` (
  `RouteStationId` int(11) NOT NULL AUTO_INCREMENT,
  `Station_No` int(11) DEFAULT NULL COMMENT '站点排序\n',
  `Train_name` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Station` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RouteStationId`),
  UNIQUE KEY `RouteStation_UN` (`Train_name`,`Station_No`,`Station`),
  KEY `FK_ID_Station` (`Station`),
  CONSTRAINT `FK_ID_Station` FOREIGN KEY (`Station`) REFERENCES `Stations` (`Station`) ON UPDATE CASCADE,
  CONSTRAINT `FK_ID_Train_name` FOREIGN KEY (`Train_name`) REFERENCES `Trains` (`Train_name`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
