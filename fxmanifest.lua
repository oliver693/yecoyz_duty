fx_version "cerulean"
game "gta5"

author "Yecoyz - Yecoyz Resources"
version "1.0.0"
lua54 "yes"

client_scripts {
    "client/framework/cl_framework.lua",
    "client/cl_main.lua",
    "client/cl_funcs.lua",
}

server_scripts {
    "server/framework/sv_framwork.lua",
    "server/sv_funcs.lua",
    "server/sv_main.lua",
}

shared_scripts {
    "shared/config.lua",
    '@ox_lib/init.lua',
}

ui_page "nui_source/reload.html" -- Dev onl

files {
    "nui_source/reload.html"
}