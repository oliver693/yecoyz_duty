if (GetResourceState("es_extended") == "started") then
    Framework = "ESX"
    ESX = exports["es_extended"]:getSharedObject()
    print("[INFO] - ESX Framework")
elseif (GetResourceState("qb-core") == "started") then
    Framework = "QBCore"
    QBCore = exports['qb-core']:GetCoreObject()
    print("[INFO] - QBCore Framework")
end

function GetPlayerJobGradeName()
    if (Framework == "ESX") then
        return ESX.GetPlayerData().job.grade_label
    elseif (Framework == "QBCore") then
        return QBCore.Functions.GetPlayerData().job.grade.label
    end
    return nil
end

function GetPlayerFullName()
    if (Framework == "ESX") then
        return ESX.GetPlayerData().firstName .. " " .. ESX.GetPlayerData().lastName .. ""
    elseif (Framework == "QBCore") then
        return QBCore.Functions.GetPlayerData().charinfo.firstname .. " " .. QBCore.Functions.GetPlayerData().charinfo.lastname .. ""
    end
    return nil
end

function GetPlayerJobLabel()
    if (Framework == "ESX") then
        return ESX.GetPlayerData().job.label
    elseif (Framework == "QBCore") then
        return QBCore.Functions.GetPlayerData().job.label
    end
    return nil
end

function GetPlayerJobName()
    if (Framework == "ESX") then
        return ESX.GetPlayerData().job.name
    elseif (Framework == "QBCore") then
        return QBCore.Functions.GetPlayerData().job.name
    end
    return nil
end

function GetPlayerOnDuty()
    if (Framework == "ESX") then
        return ESX.GetPlayerData().job.onDuty
    elseif (Framework == "QBCore") then
        print("onDuty QBCORE?", QBCore.Functions.GetPlayerData().job.onduty)
        return QBCore.Functions.GetPlayerData().job.onduty
    end
    return nil
end

function SetDuty(status)
    if (Framework == "ESX") then
        ESX.GetPlayerData().job.onDuty = status
        return ESX.GetPlayerData().job.onDuty
    elseif (Framework == "QBCore") then
        local setDuty = lib.callback.await("yecoyz_duty:setDuty", false, status)
        if (not setDuty) then return false end
        return setDuty
    end
    return nil
end

if (Framework == "ESX") then
    RegisterNetEvent('esx:playerLoaded', function()
        Duty = GetPlayerOnDuty()
        if (Duty) then
            local startDutyTime = lib.callback.await("yecoyz_duty:startDuty", false)
        end
    end)

    AddEventHandler("playerDropped", function()
        local onDuty = GetPlayerOnDuty()

        if (onDuty) then
            local endDuty = lib.callback.await("yecoyz_duty:endDuty")
            SetDuty(false)
        end
    end)
elseif (Framework == "QBCore") then
    RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
        Duty = GetPlayerOnDuty()
        if (Duty) then
            local startDutyTime = lib.callback.await("yecoyz_duty:startDuty", false)
        end
    end)

    AddEventHandler("playerDropped", function()
        local onDuty = GetPlayerOnDuty()

        if (onDuty) then
            local endDuty = lib.callback.await("yecoyz_duty:endDuty")
            SetDuty(false)
        end
    end)
end
