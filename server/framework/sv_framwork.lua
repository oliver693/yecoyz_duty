if (GetResourceState("es_extended") == "started") then
    Framework = "ESX"
    ESX = exports["es_extended"]:getSharedObject()
    print("[INFO] - ESX Framework")
elseif (GetResourceState("qb-core") == "started") then
    Framework = "QBCore"
    QBCore = exports['qb-core']:GetCoreObject()
    print("[INFO] - QBCore Framework")
end

function GetActiveWorkers(jobName)
    local activeWorkers = {}
    if (Framework == "ESX") then
        local playersWithSameJob = ESX.GetExtendedPlayers("job", jobName)
        for i = 1, #playersWithSameJob do
            if (playersWithSameJob[i].job.onDuty) then
                activeWorkers[i] = playersWithSameJob[i]
            end
        end
        return activeWorkers
    elseif (Framework == "QBCore") then

    end
    return nil
end