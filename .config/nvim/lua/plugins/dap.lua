local dap = require("dap")

dap.adapters.gdb = {
    type = "executable",
    command = "gdb",
    args = { "-i", "dap" }
}

dap.configurations.cpp = {
    {
        name = "Launch",
        type = "gdb",
        request = "launch",
        program = function ()
            return vim.fn.input("Path to executable: ", vim.fn.getcwd() .. "/build/linux_x64-Debug/", "file") 
        end,
        cwd = "${workspaceFolder}",
        stopAtBeginningOfMainSubprogram = false
    } 
}

dap.configurations.c = dap.configurations.cpp
