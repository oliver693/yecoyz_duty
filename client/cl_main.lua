RegisterCommand("duty", function()
    SetNuiFocus(true, true)

    local playerName = GetPlayerName()
    local playerJob = GetPlayerJobLabel()
    local playerRank = GetPlayerJobGradeName()
    local dutyStarted = nil

    
    if (Duty) then
        dutyStarted = lib.callback.await("yecoyz_duty:getActiveDutyTime", false)
    end
    
    local activeWorkers = lib.callback.await("yecoyz_duty:getActiveWorkers", false, GetPlayerJobName())
    if (not activeWorkers) then return false end
    
    local dutyHistory = GetDutyHistory()
    
    local isBoss = GetIfBoss()
    local employees =  {}
    
    if (isBoss) then
        employees = lib.callback.await("yecoyz_duty:getAllEmployees", false, GetPlayerJobName())     
    end
    
    print(playerName, playerJob, playerRank, isBoss)

    SendNUIMessage({
        action = "showUI",
        type = "dutyData",
        name = playerName,
        job = playerJob,
        rank = playerRank,
        isOnDuty = Duty,
        dutyStarted = lib.callback.await("yecoyz_duty:formatTime", false, dutyStarted), --os.date("%Y-%m-%d %H:%M:%S", dutyStarted),
        activeWorkers = activeWorkers,
        dutyHistory = dutyHistory,
        isBoss = isBoss,
        employees = employees,
    })
end, false)


AddEventHandler("onResourceStart", function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
        return
    end
    local duty = GetPlayerOnDuty()

    if (duty) then
        local startDutyTime = lib.callback.await("yecoyz_duty:startDuty", false)
    end
end)
