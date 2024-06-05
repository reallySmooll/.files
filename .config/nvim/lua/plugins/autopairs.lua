local cmp = require("cmp")
local autopairs = require("nvim-autopairs.completion.cmp")

cmp.event:on(
    "confirm_done",
    autopairs.on_confirm_done()
)
