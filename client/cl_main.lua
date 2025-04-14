lib.locale()

RegisterCommand("duty", function()
    SetNuiFocus(true, true)
    local playerName = GetPlayerFullName()
    local playerJob = GetPlayerJobLabel()
    local playerRank = GetPlayerJobGradeName()
    local dutyStarted = nil

    
    if (GetPlayerOnDuty()) then
        dutyStarted = lib.callback.await("yecoyz_duty:getActiveDutyTime", false)
    end
    print(GetPlayerOnDuty(), dutyStarted)
    local activeWorkers = lib.callback.await("yecoyz_duty:getActiveWorkers", false, GetPlayerJobName())
    if (not activeWorkers) then return false end
    
    local dutyHistory = GetDutyHistory()
    
    local isBoss = GetIfBoss()
    local employees =  lib.callback.await("yecoyz_duty:getAllEmployees", false, GetPlayerJobName())  
    
    if (activeWorkers) then
        for i = 1, #employees do
            table.insert(activeWorkers, {
                source = nil,
                identifier = employees[i].identifier,
                name = employees[i].firstname .. " " .. employees[i].lastname,
                job = employees[i].job.label,
                grade = employees[i].job_grade,
                phone = employees[i].phone_number or "0",
                dutyTime = nil,
                online = false
            })
        end
    end

    SendNUIMessage({
        action = "showUI",
        character = { name = playerName, job = playerJob, grade = playerRank, isOnDuty = GetPlayerOnDuty(), dutyStarted = dutyStarted, isBoss = isBoss},
        workers = activeWorkers,
        shifts = dutyHistory
    })

    -- SendNUIMessage({
    --     action = "showUI",
    --     type = "dutyData",
    --     name = playerName,
    --     job = playerJob,
    --     rank = playerRank,
    --     isOnDuty = Duty,
    --     dutyStarted = lib.callback.await("yecoyz_duty:formatTime", false, dutyStarted), --os.date("%Y-%m-%d %H:%M:%S", dutyStarted),
    --     activeWorkers = activeWorkers,
    --     dutyHistory = dutyHistory,
    --     isBoss = isBoss,
    --     employees = employees,
    -- })
end, false)


RegisterCommand("dutyState", function()
    print(GetPlayerOnDuty())
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
