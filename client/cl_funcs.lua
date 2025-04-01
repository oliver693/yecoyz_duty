Duty = nil

function ToggleDuty()
    Duty = not Duty
    local setNewDuty = SetDuty(Duty)
    if (not Duty) then
        local endTime = lib.callback.await("yecoyz_duty:stopDuty", false)
        if (not endTime) then return false end
    else
        local startTime = lib.callback.await("yecoyz_duty:startDuty", false)
        if (not startTime) then return false end
    end
    return true
end

function SaveDutyHistory()
    local updateHistory = lib.callback.await("yecoyz_duty:updateHistory", false)
    if (not updateHistory) then return false end

    return true
end

function GetDutyHistory()
    local history = lib.callback.await("yecoyz_duty:getHistory", false)
    if (not history) then return "[]" end

    return history
end

function GetIfBoss()
    local isBoss = lib.callback.await("yecoyz_duty:isBoss", false)
    if (not isBoss) then return false end

    return isBoss
end

RegisterNUICallback("Eventhandler", function(data, cb)
    if (data.event == "toggleDuty") then
        local newDutyState = not Duty

        if (not newDutyState) then
            local saveHistory = SaveDutyHistory()
            if (not saveHistory) then return cb({success = false}) end
        end
        
        local toggleDuty = ToggleDuty()
        if (not toggleDuty) then return cb({success = false}) end

        local getActiveDutyTime = lib.callback.await("yecoyz_duty:getActiveDutyTime", false)

        return cb({ success = true, isOnDuty = Duty ,dutyStarted = getActiveDutyTime})
    elseif (data.event == "getEmployeeHistory") then
    local employeHistory = lib.callback.await("yecoyz_duty:getEmployeHistory", false, data.data.identifier)
    print(json.encode(employeHistory))
    return cb(employeHistory)
    elseif (data.event == "closePage") then
        SetNuiFocus(false, false)
        return cb({ success = true })
    end

    return cb({ success = false })
end)

exports("GetOwnHistory", GetDutyHistory)