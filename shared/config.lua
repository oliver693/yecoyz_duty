Config = {}

Config.PayOffDuty = false -- Should you be paid if your not in duty.
Config.OffDutyMultiplier = 1 -- How much of your salary should you be paid if your off duty.

Config.SalaryMultiplier = true -- If you want to use the built in SaleryMultiplier

-- How much the multiplier should be per hour.
Config.Multiplier = {
    { hours = 1, multiplier = 10.0 },
    { hours = 2, multiplier = 1.2 },
    { hours = 3, multiplier = 1.4 },
    { hours = 4, multiplier = 1.6 },
    { hours = 5, multiplier = 1.8 },
    { hours = 6, multiplier = 2.0 }
}

-- Only if you use ESX.
Config.BossGrades = {
    "boss",
    "chef"
}