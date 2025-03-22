AddEventHandler("onResourceStart", function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
        return
    end
    local duty = GetPlayerOnDuty()
    while (not PlayerLoaded()) do
        Wait(1000)
    end

    if (PlayerLoaded() and duty) then
        local startDutyTime = lib.callback.await("yecoyz_duty:startDuty", false)
    end
end)