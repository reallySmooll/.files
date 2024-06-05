local ibl   = require("ibl")
local hooks = require("ibl.hooks")

vim.opt.list = true
vim.opt.listchars:append "space:⋅"
vim.opt.listchars:append "eol:↴"

local scope_highlight = {
    "White"
}

hooks.register(hooks.type.HIGHLIGHT_SETUP, function ()
    vim.api.nvim_set_hl(0, "White", { fg = "#FFFFFF" })
end)

ibl.setup {
    scope = { highlight = scope_highlight }
}
