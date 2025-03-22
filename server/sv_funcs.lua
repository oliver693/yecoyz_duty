lib.callback.register("yecoyz_duty:getActiveWorkers", function (soure, jobName)
    local activeWorkersData = GetActiveWorkers(jobName)
    if (not activeWorkersData) then return false end

    local formatedActiveWorkers = {}

    for i = 1, #activeWorkersData do
        table.insert(formatedActiveWorkers, {
            id = i,
            name = activeWorkersData[i].name,
            job = activeWorkersData[i].job.label,
            grade = activeWorkersData[i].job.grade_label,
            phone = "0000000",
            dutyTime = "02:45:10",
        })
    end

    return formatedActiveWorkers or nil
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
    return false
end)