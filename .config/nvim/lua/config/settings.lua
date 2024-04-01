local g   = vim.g
local set = vim.opt

g.mapleader = ' ' -- Leader key

set.number 	       = true	       -- Show line numbers
set.autoindent 	   = true          -- Automatically indent new lines
set.tabstop	       = 4		       -- Number of spaces per tab
set.mouse	       = 'a'	       -- Enable mouse
set.showmatch	   = true          -- Show matching words
set.ignorecase 	   = true	       -- Case insensitive
set.hlsearch	   = true	       -- Highlight searched words
set.expandtab	   = true	       -- Convert tabs to whitespace
set.clipboard  	   = 'unnamedplus' -- Use system clipboard
set.cursorline     = true	       -- Highlight current line
set.termguicolors  = true	                         -- Enable true colors support
set.relativenumber = true                            -- Show number relative to the line
set.guicursor      = 'n-v-c-sm-i-ci-ve-r-cr-o:block' -- Change cursor in normal, vertical and other modes to insert mode line
set.timeoutlen     = 1000          -- Time to wait for mapped sequence to complete
g.python_highlight_space_errors  = 0
g.python_highlight_indent_errors = 0

vim.cmd [[set noswapfile]]            -- Do not create any '.swp' files
