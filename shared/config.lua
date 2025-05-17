Config = {}

Config.FrameworkBased = false -- If true then get duty value from ESX or QBCore else built in.

Config.Jobs = {
    "ambulance",
    "police",
    "offambulance",
    "offpolice",
}

Config.OffDutySettings = {
    PayOffDuty = false, -- Should you be paid if your not in duty.
    OffDutyMultiplier = 1 -- How much of your salary should you be paid if your off duty.
}

Config.MultiplierSettings = {
    SalaryMultiplier = false,
    Hourlyloss = 0.1,
    Multiplier = {
        ["police"] = {
            increasePerHour = 0.2, -- How much it will add per hour.
            maxMultiplier = 2.0, -- The limit of how high your multiplier can go.
        },
        ["mechanic"] = {
            increasePerHour = 0.1, -- How much it will add per hour.
            maxMultiplier = 1.8, -- The limit of how high your multiplier can go.
        } 
    }
}

-- Only if you use ESX.
Config.BossGrades = {
    "boss",
    "cheif"
}
