local function mapkey(mode, key, command, option)
  vim.api.nvim_set_keymap(mode, key, command, option)
end

--[[ Normal Mode ]]
                    --

-- Exit NeoVim by pressing CTRL+Q
mapkey("n", "<C-q>", "<CMD>qa<CR>", { noremap = true })

-- Exit all windows and views by pressing SPACE+Q+A
mapkey("n", "<LEADER>q", "<CMD>qa!<CR>", { noremap = true })

-- Close current buffer
mapkey("n", "<LEADER>bd", "<CMD>bdelete<CR>", { noremap = true })

-- Save all files by pressing CTRL+S
mapkey("n", "<C-s>", "<CMD>wa<CR>", { noremap = true })

-- Source the current file
mapkey("n", "<LEADER>s", "<CMD>source %<CR>", { noremap = true })

-- Find and replace
mapkey("n", "<LEADER>fr", ":%s/", { noremap = true })

-->> START [ Split view commands ] <<--

-- Split view horizontaly
mapkey("n", "<LEADER>sv", "<CMD>sv<CR>", { noremap = true })

-- Split view vertically
mapkey("n", "<LEADER>vs", "<CMD>vsp<CR>", { noremap = true })

-- Change between splits (in order: up, down, left, right)
mapkey("n", "<LEADER>sck", "<CMD>wincmd k<CR>", { noremap = true })
mapkey("n", "<LEADER>scj", "<CMD>wincmd j<CR>", { noremap = true })
mapkey("n", "<LEADER>sch", "<CMD>wincmd h<CR>", { noremap = true })
mapkey("n", "<LEADER>scl", "<CMD>wincmd l<CR>", { noremap = true })

-->> END [ Split view commands ] <<--

-- Cycle to previous buffer
mapkey("n", "<S-TAB>", "<CMD>BufferLineCyclePrev<CR>", { noremap = true })

-- Cycle to next buffer
mapkey("n", "<TAB>", "<CMD>BufferLineCycleNext<CR>", { noremap = true })

-- Open nvim-tree
mapkey("n", "<Leader>o", "<CMD>NvimTreeToggle<CR>", { noremap = true })

-- Open todo-comments
mapkey("n", "<Leader>t", "<CMD>TodoTrouble<CR>", { noremap = true })

-- LSP
vim.keymap.set("n", "<Leader>e", vim.diagnostic.open_float)
vim.keymap.set("n", "[d", vim.diagnostic.goto_prev)
vim.keymap.set("n", "]d", vim.diagnostic.goto_next)
vim.keymap.set("n", "<Leader>q", vim.diagnostic.setloclist)

-- Trouble
mapkey("n", "<LEADER>xx", "<CMD>Trouble diagnostics toggle<CR>", { noremap = true, desc = "Diagnostics (Trouble)" })
mapkey("n", "<LEADER>xX", "<CMD>Trouble diagnostics toggle filter.buf=0<CR>", { noremap = true, desc = "Buffer Diagnostics (Trouble)" })
mapkey("n", "<LEADER>cs", "<CMD>Trouble symbols toggle focus=false<CR>", { noremap = true, desc = "Symbols (Trouble)" })
mapkey("n", "<LEADER>cl", "<CMD>Trouble lsp toggle focus=false win.position=right<CR>", { noremap = true, desc = "LSP Definitions / references / ... (Trouble)" })
mapkey("n", "<LEADER>xL", "<CMD>Trouble loclist toggle<CR>", { noremap = true, desc = "Location List (Trouble)" })
mapkey("n", "<LEADER>xQ", "<CMD>Trouble qflist toggle<CR>", { noremap = true, desc = "Quickfix List (Trouble)" })

-- nvim-dap-ui
mapkey("n", "<LEADER>do", "<CMD>lua require(\"dapui\").open()<CR>", { noremap = true })
mapkey("n", "<LEADER>dc", "<CMD>lua require(\"dapui\").close()<CR>", { noremap = true })
mapkey("n", "<LEADER>dt", "<CMD>lua require(\"dapui\").toggle()<CR>", { noremap = true })

-- nvim-dap
mapkey("n", "<F5>", "<CMD>lua require(\"dap\").continue()<CR>", { noremap = true })
mapkey("n", "<F10>", "<CMD>lua require(\"dap\").step_over()<CR>", { noremap = true })
mapkey("n", "<F11>", "<CMD>lua require(\"dap\").step_into()<CR>", { noremap = true })
mapkey("n", "<F12>", "<CMD>lua require(\"dap\").step_out()<CR>", { noremap = true })
mapkey("n", "<F9>", "<CMD>lua require(\"dap\").terminate()<CR>", { noremap = true })
mapkey("n", "<LEADER>b", "<CMD>lua require(\"dap\").toggle_breakpoint()<CR>", { noremap = true })

-- Telescope
mapkey("n", "<LEADER>t", "<CMD>Telescope<CR>", { noremap = true })

-- Overseer
mapkey("n", "<LEADER>or", "<CMD>OverseerRun<CR>", { noremap = true })
mapkey("n", "<LEADER>ot", "<CMD>OverseerToggle<CR>", { noremap = true })

-- Navbuddy
mapkey("n", "<LEADER>n", "<CMD>Navbuddy<CR>", { noremap = true })

--[[ Insert Mode ]]

-- Pressing CTRL+BACKSPACE will remove the word
mapkey("i", "<C-BS>", "<C-w>", { nil })
mapkey("i", "<C-h>", "<C-w>", { nil })

--[[ Visual Mode ]]
                    --

-- Comment
mapkey("v", "<Leader>/", "<CMD>normal gcc<CR>", { noremap = true })
