lib.callback.register("yecoyz_duty:getActiveWorkers", function (soure, jobName)
    local activeWorkersData = GetActiveWorkers(jobName)
    if (not activeWorkersData) then return false end

    return activeWorkersData
end)

lib.callback.register("yecoyz_duty:getAllEmployees", function(source, jobName)
    return GetAllEmployees(jobName) or nil
end)

lib.callback.register("yecoyz_duty:getActiveDutyTime", function(source)
    return Cache.DutyData[source].startTime
end)


lib.callback.register("yecoyz_duty:getActiveEndDutyTime", function(source)
    return os.time()
end)

lib.callback.register("yecoyz_duty:formatTime", function (source, time)
    return os.date("%Y-%m-%d %H:%M:%S", time)
end)

lib.callback.register("yecoyz_duty:startDuty", function(source)
    local timeNow = os.time()
    Cache.DutyData[source] = {
        onDuty = true,
        startTime = timeNow
    }
    return true
end)

lib.callback.register("yecoyz_duty:stopDuty", function(source)
    Cache.DutyData[source] = {}
    return true
end)

lib.callback.register("yecoyz_duty:isBoss", function(source)
    return GetBossPermission(source)
end)

function FormatDutyTime(startTime)
    if (not startTime) then return "N/A" end
    local elapsedSeconds = os.time() - startTime
    return string.format("%d h, %d m", math.floor(elapsedSeconds / 3600), math.floor((elapsedSeconds % 3600) / 60))
end


lib.callback.register("yecoyz_duty:updateHistory", function(source)
    local startTime = Cache.DutyData[source].startTime
    local endTime = os.time()

    local duration = endTime - startTime

    local result = MySQL.single.await("SELECT `history` FROM `yecoyz_duty` WHERE `identifier` = ? LIMIT 1", {
        GetIdentifier(source)
    })

    local history = {
        startTime = startTime,
        endTime = endTime,
        startTimeFormatted = os.date("%Y-%m-%d %H:%M:%S", startTime),
        endTimeFormatted = os.date("%Y-%m-%d %H:%M:%S", endTime),
        duration = duration,
    }

    if (not result) then
        local initialHistory = {history}
        local initializeHistory = MySQL.insert.await("INSERT INTO `yecoyz_duty` (identifier, history) VALUES (?, ?)", {
            GetIdentifier(source), json.encode(initialHistory)
        })
        if (not initializeHistory) then return false end
        
        return true
    end

    local getHistory = json.decode(result.history) or {}
    table.insert(getHistory, history)

    local updateHistory = MySQL.update.await("UPDATE yecoyz_duty SET history = ? WHERE identifier = ?", {
        json.encode(getHistory), GetIdentifier(source)
    })
    if (not updateHistory) then return false end

    return true
end)

lib.callback.register("yecoyz_duty:getHistory", function(source)
    local result = MySQL.single.await("SELECT `history` FROM `yecoyz_duty` WHERE `identifier` = ? LIMIT 1", {
        GetIdentifier(source)
    })

    if (not result) then return {} end
    local historyData = json.decode(result.history) or {}

    return historyData
end)

lib.callback.register("yecoyz_duty:getEmployeHistory", function (source, identifier)
    local employeeHistory = MySQL.single.await("SELECT `history` FROM `yecoyz_duty` WHERE `identifier` = ? LIMIT 1", {
        identifier
    })
    if (not employeeHistory) then return {} end
    local employeHistoyData = json.decode(employeeHistory.history) or {}

    return employeHistoyData
end)