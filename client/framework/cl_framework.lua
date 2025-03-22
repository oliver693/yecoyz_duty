if (GetResourceState("es_extended") == "started") then
    Framework = "ESX"
    ESX = exports["es_extended"]:getSharedObject()
    print("[INFO] - ESX Framework")
elseif (GetResourceState("qb-core") == "started") then
    Framework = "QBCore"
    QBCore = exports['qb-core']:GetCoreObject()
    print("[INFO] - QBCore Framework")
end

function PlayerLoaded()
    if (Framework == "ESX") then
        return ESX.IsPlayerLoaded()
    elseif (Framework == "QBCore") then
        
    end
    return nil
end

function GetPlayerJobGradeName()
    if (Framework == "ESX") then
        return ESX.PlayerData.job.grade_label
    elseif (Framework == "QBCore") then
    end
    return nil
end

function GetPlayerName()
    if (Framework == "ESX") then
        return ESX.PlayerData.firstName .. ESX.PlayerData.lastName
    elseif (Framework == "QBCore") then

    end
    return nil
end

function GetPlayerJobLabel()
    if (Framework == "ESX") then
        return ESX.PlayerData.job.label
    elseif (Framework == "QBCore") then

    end
    return nil
end

function GetPlayerJobName()
    if (Framework == "ESX") then
        return ESX.PlayerData.job.name
    elseif (Framework == "QBCore") then

    end
    return nil
end

function GetPlayerOnDuty()
    if (Framework == "ESX") then
        return ESX.PlayerData.job.onDuty
    elseif (Framework == "QBCore") then

    end
    return nil
end

function SetDuty(Status)
    if (Framework == "ESX") then
        ESX.PlayerData.job.onDuty = Status
        return ESX.PlayerData.job.onDuty
    elseif (Framework == "QBCore") then

    end
    return nil
end