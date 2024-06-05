vim.loader.enable()

require("config")

vim.notify = require("notify")

require("plugins")

local group = vim.api.nvim_create_augroup("Group", { clear = true })
vim.api.nvim_create_autocmd("BufWritePost", {
    pattern = "*.lua",
    callback = function ()
        local file_path = vim.fn.expand("%")
        vim.cmd("luafile " .. file_path)
        vim.notify(file_path .. " sourced!")
    end,
    group = group
})
