local duty = GetPlayerOnDuty()

function ToggleDuty()
    duty = not duty
    local setNewDuty = SetDuty(duty)

    return setNewDuty
end

RegisterCommand("OpenDuty", function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "OpenUi",
    })
end, false)