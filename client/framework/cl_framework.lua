if (GetResourceState("es_extended") == "started") then
    Framework = "ESX"
    ESX = exports["es_extended"]:getSharedObject()
    print("[INFO] - ESX Framework")
elseif (GetResourceState("qb-core") == "started") then
    Framework = "QBCore"
    QBCore = exports['qb-core']:GetCoreObject()
    print("[INFO] - QBCore Framework")
end

function ShowNotification(text, notifyType)
    if (Framework == "ESX") then
        notifyType = notifyType or "inform"
        local notify = ESX.ShowNotification(text, notifyType)
        return notify
    elseif (Framework == "QBCore") then
        notifyType = notifyType or "primary"
        local notify = TriggerEvent("QBCore:Notify", text, notifyType)
        return notify
    end
end

function GetPlayerJobGradeName()
    if (Framework == "ESX") then
        return ESX.GetPlayerData().job.grade_label
    elseif (Framework == "QBCore") then
        return QBCore.Functions.GetPlayerData().job.grade.name
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
    if (Framework == "ESX") and (Config.FrameworkBased) then
        return ESX.GetPlayerData().job.onDuty
    elseif (Framework == "QBCore") and (Config.FrameworkBased) then
        return QBCore.Functions.GetPlayerData().job.onduty
    elseif (not Config.FrameworkBased) then
        return lib.callback.await("yecoyz_duty:getStandaloneDuty")
    end
    return nil
end

function SetDuty(status)
    return lib.callback.await("yecoyz_duty:setDuty", false, status)
end

if (Framework == "ESX") then
    RegisterNetEvent('esx:playerLoaded', function()
        while (not ESX.IsPlayerLoaded()) do
            Wait(100)
        end
        Duty = GetPlayerOnDuty()
        if (Duty) then
            local startDutyTime = lib.callback.await("yecoyz_duty:startDuty", false)
        end
    end)
elseif (Framework == "QBCore") then
    RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
        Duty = GetPlayerOnDuty()
        if (Duty) then
            local startDutyTime = lib.callback.await("yecoyz_duty:startDuty", false)
        end
    end)
end
