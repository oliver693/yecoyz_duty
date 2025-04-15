lib.locale()

RegisterCommand("duty", function()
    local playerJob = GetPlayerJobName()
    local allowedJob = HasAllowedJob(playerJob)
    if (not allowedJob) then ShowNotification(locale("noAccess"), "error") return end

    SetNuiFocus(true, true)
    local playerName = GetPlayerFullName()
    local playerJobLabel = GetPlayerJobLabel()
    local playerRank = GetPlayerJobGradeName()
    local dutyStarted = nil

    
    if (GetPlayerOnDuty()) then
        dutyStarted = lib.callback.await("yecoyz_duty:getActiveDutyTime", false)
    end

    local activeWorkers = lib.callback.await("yecoyz_duty:getActiveWorkers", false, playerJob)
    if (not activeWorkers) then return false end
    
    local dutyHistory = GetDutyHistory()

    local isBoss = GetIfBoss()
    local employees =  lib.callback.await("yecoyz_duty:getAllEmployees", false, playerJob)
    
    if (activeWorkers) then
        local existingEmployees = {}
        
        for i = 1, #activeWorkers do
            existingEmployees[activeWorkers[i].identifier] = true
        end
        
        for i = 1, #employees do
            local employeeIdentifier = employees[i].identifier
            
            if (not existingEmployees[employeeIdentifier]) then
                table.insert(activeWorkers, {
                    source = nil,
                    identifier = employeeIdentifier,
                    name = employees[i].firstname .. " " .. employees[i].lastname,
                    job = employees[i].job.label,
                    grade = employees[i].job_grade,
                    phone = employees[i].phone_number or "0",
                    dutyTime = nil,
                    online = false
                })

                existingEmployees[employeeIdentifier] = true
            end
        end
    end

    SendNUIMessage({
        action = "showUI",
        character = { name = playerName, job = playerJobLabel, grade = playerRank, isOnDuty = GetPlayerOnDuty(), dutyStarted = dutyStarted, isBoss = isBoss},
        workers = activeWorkers,
        shifts = dutyHistory
    })
end, false)


AddEventHandler("onResourceStart", function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
        return
    end
    local allowedJob = HasAllowedJob(GetPlayerJobName())
    if (not allowedJob) then return end
    local duty = GetPlayerOnDuty()

    if (duty) then
        local startDutyTime = lib.callback.await("yecoyz_duty:startDuty", false)
    end
end)
