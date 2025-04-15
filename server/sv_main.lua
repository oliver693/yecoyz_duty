Cache = {
    DutyData = {}
}

CreateThread(function()
    local initDatabase = [[
        CREATE TABLE IF NOT EXISTS `yecoyz_duty` (
          `index` int(11) unsigned NOT NULL AUTO_INCREMENT,
          `identifier` tinytext NOT NULL,
          `history` longtext NOT NULL,
          `multiplier` tinytext DEFAULT NULL,
          `offDuty` tinytext DEFAULT NULL,
          PRIMARY KEY (`index`)
        ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
    ]]
    
    local success = MySQL.Sync.execute(initDatabase)
    
    if (success) then
        print("^2[yecoyz_duty] ^7Table has been checked/initialized successfully.")
        print("^2[yecoyz_duty] ^7Database structure is updated and ready to use.")
    else
        print("^1[yecoyz_duty] ^7WARNING: Could not initialize database table!")
        print("^1[yecoyz_duty] ^7Check MySQL connection and permissions.")
    end
end)