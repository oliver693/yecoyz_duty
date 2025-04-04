if (GetResourceState("es_extended") == "started") then
    Framework = "ESX"
    ESX = exports["es_extended"]:getSharedObject()
    print("[INFO] - ESX Framework")
elseif (GetResourceState("qb-core") == "started") then
    Framework = "QBCore"
    QBCore = exports['qb-core']:GetCoreObject()
    print("[INFO] - QBCore Framework")
end

if (GetResourceState("npwd") == "started") then
    Phone = "npwd"
elseif (GetResourceState("qb-phone") == "started") then
    Phone = "qb-phone"
elseif (GetResourceState("lb-phone") == "started") then
    Phone = "lb-phone"
else
    Phone = nil
end

function GetPlayerFromId(source)
    if (Framework == "ESX") then
        return ESX.GetPlayerFromId(source)
    elseif (Framework == "QBCore") then
        return QBCore.Functions.GetPlayer(source)
    end
    return nil
end

function GetIdentifier(source)
    local player = GetPlayerFromId(source)
    if (not player) then return end

    if (Framework == "ESX") then
        return player.getIdentifier()
    elseif (Framework == "QBCore") then
        local Player = QBCore.Functions.GetPlayer(source)
        return Player.PlayerData.citizenid
    end

    return nil
end

function GetAllEmployees(jobName)
    if (Framework == "ESX") then
        local employees = MySQL.query.await("SELECT identifier, firstname, lastname FROM users WHERE job = ?", {jobName})
        return employees
    elseif (Framework == "QBCore") then
        local rawEmployees = MySQL.query.await("SELECT citizenid, charinfo FROM players WHERE JSON_UNQUOTE(JSON_EXTRACT(job, '$.name')) = ?", {jobName})
        local employees = {}

        for i = 1, #rawEmployees do
            local charinfo = json.decode(rawEmployees[i].charinfo)

            employees[i] = {
                identifier = rawEmployees[i].citizenid,
                firstname = charinfo.firstname,
                lastname = charinfo.lastname,
            }
        end

        return employees
    end
    return nil
end

function GetBossPermission(source)
    local player = GetPlayerFromId(source)
    if (not player) then return end

    if (Framework == "ESX") then
        for i = 1, #Config.BossGrades do
            if (player.getJob().grade_name == Config.BossGrades[i]) then
                return true
            end
        end
        return false
    elseif (Framework == "QBCore") then
        local Player = QBCore.Functions.GetPlayer(source)
        return Player.PlayerData.job.isboss or false
    end

    return nil
end

function GetActiveWorkers(jobName)
    local activeWorkers = {}

    if (Framework == "ESX") then
        local playersWithSameJob = ESX.GetPlayers()
        for i = 1, #playersWithSameJob do
            local player = playersWithSameJob[i]
            local playerData = ESX.GetPlayerFromId(player)
            
            if playerData.job.name == jobName and playerData.job.onDuty then
                activeWorkers[i] = {
                    source = playerData.source,
                    identifier = playerData.identifier,
                    name = playerData.name,
                    job = playerData.job.label,
                    grade = playerData.job.grade_label,
                    phone = GetPhoneNumber(playerData.identifier) or "0",
                    dutyTime = FormatDutyTime(Cache.DutyData[playerData.source] and Cache.DutyData[playerData.source].startTime)
                }
            end
        end
        return activeWorkers
    elseif (Framework == "QBCore") then
        local activePlayers = QBCore.Functions.GetPlayers()
        for i = 1, #activePlayers do
            local player = QBCore.Functions.GetPlayer(activePlayers[i])
            
            if player.PlayerData.job.name == jobName and player.PlayerData.job.onduty then
                activeWorkers[i] = {
                    source = player.PlayerData.source,
                    identifier = player.PlayerData.citizenid,
                    name = player.PlayerData.charinfo.firstname .. " " .. player.PlayerData.charinfo.lastname,
                    job = player.PlayerData.job.label,
                    grade = player.PlayerData.job.grade.label,
                    phone = GetPhoneNumber(player.PlayerData.citizenid) or "0",
                    dutyTime = Cache.DutyData[player.PlayerData.source] and os.date("%H:%M:%S", Cache.DutyData[player.PlayerData.source].startTime) or "N/A",
                }
            end
        end
        return activeWorkers
    end

    return nil
end


function GetPhoneNumber(identifier)
    if (Phone == "npwd") then
        local playerData = exports.npwd:getPlayerData({ identifier = identifier })
        if (not playerData) then return false end

        return playerData.phoneNumber
    elseif (Phone == "lb-phone") then
        local phoneNumber = exports["lb-phone"]:GetEquippedPhoneNumber(identifier)
        if (not phoneNumber) then return false end

        return phoneNumber
    end
    return false
end

lib.callback.register("yecoyz_duty:setDuty", function(source, status)
    if (Framework == "QBCore") then
        local Player = QBCore.Functions.GetPlayer(source)
        if (not Player) then return false end

        Player.Functions.SetJobDuty(status)

        return true
    end

    return false
end)
