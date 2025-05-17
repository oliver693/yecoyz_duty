Preview: https://www.youtube.com/watch?v=ea963DAjAaY -- Preview from Yecoyz 
Discord: https://discord.yecoyzresources.com/ -- Yecoyz Discord

# Features
All of the features our script have and all the possibilities.

- A sleek, modern, and easy-to-use interface designed for a smooth user experience. Easily see which players are online or offline, and whether they are on or off duty. You can also quickly access their phone numbers for easy communication, as well as view their rank within your company or organization.

- History: View how many hours you’ve worked with filters such as all-time, day, week, and month. You can also see the number of shifts and the average time per shift.

- Managing Workers system: This allows the boss or chief of a company to view all employees and monitor their work performance, including shifts, total work time, and average shift duration.

- Multiplier System: Rewards players for working longer shifts and staying active on duty. The more you work, the higher your multiplier grows. However, going off duty will gradually decrease the multiplier over time.

- Auto Job Switch on Duty Toggle (Custom Feature): Automatically changes the player’s job role when toggling duty status—ensuring accurate role assignment without manual intervention.

🛠️ How to Add More Jobs [yecoyz_duty/server/sv_funcs.lua]
                        * for on duty line 27 to 30 
                        * for off duty line 53 to 56

To support more jobs, just update the two job-mapping tables: 

        🟢 On-Duty Job Mapping
        This table is used when going on duty: 


        local onDutyJobs = {
            offpolice = "police",
            offambulance = "ambulance" -- example
        }
        🔴 Off-Duty Job Mapping
        This table is used when going off duty:


        local offDutyJobs = {
            police = "offpolice",
            ambulance = "offambulance"-- example
        }

⚠️ Important: Your job names must match what's in your jobs table in your database.

Note: This feature was not part of the original script by Yecoyz. It was added by Ollinox as a enhancement. All original resource credits go to Yecoyz.

![image](https://github.com/user-attachments/assets/49bc89a7-bb81-4d07-89cc-d911d11068bc)
