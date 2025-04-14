CREATE TABLE IF NOT EXISTS `yecoyz_duty` (
  `index` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` tinytext NOT NULL,
  `history` longtext NOT NULL,
  `multiplier` tinytext DEFAULT NULL,
  `offDuty` tinytext DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;