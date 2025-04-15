QueriesExecuted = false
local queries = [[
    CREATE TABLE IF NOT EXISTS `yecoyz_duty` (
        `index` int(11) unsigned NOT NULL AUTO_INCREMENT,
        `identifier` tinytext NOT NULL,
        `history` longtext NOT NULL,
        `multiplier` tinytext DEFAULT NULL,
        `offDuty` tinytext DEFAULT NULL,
        PRIMARY KEY (`index`)
    )
]]

MySQL.query.await(queries)
print("^2[yecoyz_duty] Database initialized successfully.^7")
QueriesExecuted = true