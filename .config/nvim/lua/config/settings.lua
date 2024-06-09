local g   = vim.g
local opt = vim.opt
local o   = vim.o

g.mapleader = ' ' -- Leader key

opt.number 	       = true	       -- Show line numbers
opt.autoindent 	   = true          -- Automatically indent new lines
opt.tabstop	       = 4		       -- Number of spaces per tab
opt.mouse	       = 'a'	       -- Enable mouse
opt.showmatch	   = true          -- Show matching words
opt.ignorecase 	   = true	       -- Case insensitive
opt.hlsearch	   = true	       -- Highlight searched words
opt.expandtab	   = true	       -- Convert tabs to whitespace
opt.clipboard  	   = "unnamedplus" -- Use system clipboard
opt.cursorline     = true	       -- Highlight current line
opt.termguicolors  = true	                         -- Enable true colors support
opt.relativenumber = true                            -- Show number relative to the line
opt.guicursor      = "n-v-c-sm-i-ci-ve-r-cr-o:block" -- Change cursor in normal, vertical and other modes to insert mode line
opt.timeoutlen     = 1000          -- Time to wait for mapped sequence to complete

g.python_highlight_space_errors  = 0
g.python_highlight_indent_errors = 0

o.foldcolumn = '1'
o.foldlevel = 100
o.foldlevelstart = 100
o.foldenable = true
o.fillchars = [[eob: ,fold: ,foldopen:,foldsep: ,foldclose:]]

vim.cmd [[set noswapfile]]            -- Do not create any ".swp" files

--vim.cmd.colorscheme("kanagawa")
