local function mapkey(mode, key, command, option)
  vim.api.nvim_set_keymap(mode, key, command, option)
end

--[[ Normal Mode ]]--

-- Exit NeoVim by pressing CTRL+Q
mapkey('n', '<C-q>', '<CMD>q<CR>', { noremap = true })

-- Exit all windows and views by pressing SPACE+Q+A
mapkey('n', '<LEADER>q', '<CMD>q!<CR>', { noremap = true})

-- Close current buffer
mapkey('n', '<LEADER>bd', '<CMD>bdelete<CR>', { noremap = true })

-- Save all files by pressing CTRL+S
mapkey('n', '<C-s>', '<CMD>wa<CR>', { noremap = true })

-- Source the current file
mapkey('n', '<LEADER>s', '<CMD>source<CR>', { noremap = true })

-- New file
mapkey('n', '<C-n>', '<CMD>tabnew<CR>', { noremap = true })

-- Find and replace
mapkey('n', '<LEADER>fr', ':%s/', { noremap = true })

-- Sync packages in packer
mapkey('n', '<LEADER>ps', '<CMD>PackerSync<CR>', { noremap = true })

-->> START [ Split view commands ] <<--

-- Split view horizontaly
mapkey('n', '<LEADER>sv', '<CMD>sv<CR>', { noremap = true })

-- Split view vertically
mapkey('n', '<LEADER>vs', '<CMD>vsp<CR>', { noremap = true })

-- Change between splits (in order: up, down, left, right)
mapkey('n', '<LEADER>sck', '<CMD>wincmd k<CR>', { noremap = true })
mapkey('n', '<LEADER>scj', '<CMD>wincmd j<CR>', { noremap = true })
mapkey('n', '<LEADER>sch', '<CMD>wincmd h<CR>', { noremap = true })
mapkey('n', '<LEADER>scl', '<CMD>wincmd l<CR>', { noremap = true })

-->> END [ Split view commands ] <<--

-- Toggle Trouble
mapkey('n', '<LEADER>xx', '<CMD>TroubleToggle<CR>', { silent = true, noremap = true })

-- Cokeline
mapkey('n', '<S-Tab>',   '<Plug>(cokeline-focus-prev)',  { silent = true })
mapkey('n', '<Tab>',     '<Plug>(cokeline-focus-next)',  { silent = true })
mapkey('n', '<Leader>p', '<Plug>(cokeline-switch-prev)', { silent = true })
mapkey('n', '<Leader>n', '<Plug>(cokeline-switch-next)', { silent = true })

for i = 1,9 do
  mapkey('n', ('<F%s>'):format(i),      ('<Plug>(cokeline-focus-%s)'):format(i),  { silent = true })
  mapkey('n', ('<Leader>%s'):format(i), ('<Plug>(cokeline-switch-%s)'):format(i), { silent = true })
end

-- Open CHADtree
mapkey('n', '<Leader>o', '<CMD>NvimTreeToggle<CR>', { noremap = true })

-- LSP
vim.keymap.set('n', '<Leader>e', vim.diagnostic.open_float)
vim.keymap.set('n', '[d', vim.diagnostic.goto_prev)
vim.keymap.set('n', ']d', vim.diagnostic.goto_next)
vim.keymap.set('n', '<Leader>q', vim.diagnostic.setloclist)

--[[ Insert Mode ]]--

-- Pressing CTRL+BACKSPACE will remove the word
mapkey('i', '<C-BS>', '<C-w>', { nil })
mapkey('i', '<C-h>', '<C-w>', { nil })
