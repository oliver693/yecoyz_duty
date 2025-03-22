local duty = GetPlayerOnDuty()

function ToggleDuty()
    duty = not duty
    local setNewDuty = SetDuty(duty)
    if (not duty) then
        lib.callback.await("yecoyz_duty:endTime", false)
    else
        lib.callback.await("yecoyz_duty:startTime", false)
    end
    return setNewDuty
end


function SaveDutyHistory()
    local kvpKey = "duty_history"
    local history = json.decode(GetResourceKvpString(kvpKey) or "[]")

    local startTime = lib.callback.await("yecoyz_duty:getActiveDutyTime", false)
    if (not startTime) then return false end

    local endTime = lib.callback.await("yecoyz_duty:getActiveEndDutyTime")
    if (not endTime) then return false end

    local duration = endTime - startTime

    table.insert(history, {
        startTime = startTime,
        endTime = endTime,
        startTimeFormatted = lib.callback.await("yecoyz_duty:formatTime", false, startTime),
        endTimeFormatted = lib.callback.await("yecoyz_duty:formatTime", false, endTime),
        duration = duration
    })

    SetResourceKvp(kvpKey, json.encode(history))

    return true
end

function GetDutyHistory()
    local kvpKey = "duty_history"
    local history = json.decode(GetResourceKvpString(kvpKey) or "[]")
    return history
end

RegisterCommand("OpenDuty", function()
    SetNuiFocus(true, true)

    print(json.encode(ESX.PlayerData.job))

    local playerName = GetPlayerName()
    local playerJob = GetPlayerJobLabel()
    local playerRank = GetPlayerJobGradeName()
    local dutyStarted = nil

    if (duty) then
        dutyStarted = lib.callback.await("yecoyz_duty:getActiveDutyTime", false)
    end

    local activeWorkers = lib.callback.await("yecoyz_duty:getActiveWorkers", false, GetPlayerJobName())
    if (not activeWorkers) then return false end

    local dutyHistory = GetDutyHistory()

    SendNUIMessage({
        action = "showUI",
        type = "dutyData",
        name = playerName,
        job = playerJob,
        rank = playerRank,
        isOnDuty = duty,
        dutyStarted = lib.callback.await("yecoyz_duty:formatTime", false, dutyStarted), --os.date("%Y-%m-%d %H:%M:%S", dutyStarted),
        activeWorkers = activeWorkers,
        dutyHistory = dutyHistory
    })
end, false)

RegisterNUICallback("Eventhandler", function(data, cb)
    if (data.event == "toggleDuty") then
        local newDutyState = not duty

        if (not newDutyState) then
            local saveHistory = SaveDutyHistory()
            if (not saveHistory) then return cb({success = false}) end
        end
        
        local toggle = ToggleDuty()
        if (not toggle) then return cb({success = false}) end

        return cb({
            success = true,
            isOnDuty = newDutyState,
            dutyStarted = newDutyState and os.time() or nil
        })
    end
end)