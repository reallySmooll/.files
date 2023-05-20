local ensure_packer = function()
	local fn = vim.fn
	local install_path = fn.stdpath('data')..'/site/pack/packer/start/packer.nvim'

	if fn.empty(fn.glob(install_path)) > 0 then
		fn.system({ 'git', 'clone', '--depth', '1', 'https://www.github.com/wbthomason/packer.nvim', install_path })
		vim.cmd [[packadd packer.nvim]]

		return true
	end

	return false
end

local packer_bootstrap = ensure_packer()
local packer           = require('packer')

packer.init({
--        max_jobs = 1,
        git = {
                clone_timeout = 3600
        },
        display = {
                open_fn = function()
                        return require('packer.util').float({ border = 'single' })
                end
        }
})

packer.startup(function()
	use('wbthomason/packer.nvim')						-- Self update of packer
	use('nvim-lualine/lualine.nvim')					-- Status bar
	use('ryanoasis/vim-devicons')						-- Icon pack
	use('kyazdani42/nvim-web-devicons')                 -- More icons
	use('sheerun/vim-polyglot')							-- Better syntax highlighting
	use('neovim/nvim-lspconfig')						-- Neovim's LSP config
	use('luochen1990/rainbow')							-- Bracket colorizer from VSCode
	use('ziontee113/color-picker.nvim')                 -- Color picker
	use('lukas-reineke/indent-blankline.nvim')			-- Adds indentation guides to all lines (including empty ones)
	use('mg979/vim-visual-multi')						-- Multiple cursors
	use('williamboman/mason.nvim')						-- NeoVim LSP server installer
	use('williamboman/mason-lspconfig.nvim')			-- 3rd party plugin for mason.nvim
	use('p00f/clangd_extensions.nvim')					-- Extensions for clangd lsp
	use('hrsh7th/cmp-nvim-lsp')							-- Autocompletion sources
	use('hrsh7th/cmp-buffer')							--
	use('hrsh7th/cmp-cmdline')							--
	use('hrsh7th/cmp-nvim-lsp-document-symbol')			--
	use('hrsh7th/cmp-nvim-lsp-signature-help')			--
	use('FelipeLema/cmp-async-path')					--
	use('ray-x/cmp-treesitter')							--
	use('hrsh7th/nvim-cmp')								-- Autocompletion
	use('hrsh7th/cmp-vsnip')							-- Autocompletion code snippets
	use('hrsh7th/vim-vsnip')							--
	use('onsails/lspkind.nvim')							--
	use('nvim-tree/nvim-tree.lua') 						-- File explorer

	use({ 'nvim-treesitter/nvim-treesitter', run = ':TSUpdate' }) 							  -- Syntax highlighting
	use({ 'folke/trouble.nvim', requires = 'nvim-web-devicons' })							  -- Errors
	use({ 'nvim-telescope/telescope-fzf-native.nvim', run = ':make' })						  -- Fuzzy finder
	use({ 'tzachar/fuzzy.nvim', requires = 'nvim-telescope/telescope-fzf-native.nvim' })	  --
	use({ 'tzachar/cmp-fuzzy-path', requires = { 'hrsh7th/nvim-cmp', 'tzachar/fuzzy.nvim' }}) -- Source for file autocompletion in cmd mode
	use({ 'catppuccin/nvim', as = 'catppuccin' }) 											  -- Theme

	use({ 'windwp/nvim-autopairs', config = function()
		require('nvim-autopairs').setup {}
	end })
	use({ 'willothy/nvim-cokeline', requires = 'nvim-web-devicons', config = function()
			require('cokeline').setup()
		end
	})

	if packer_bootstrap then
		require('packer').sync()
	end
end)

vim.cmd([[
	augroup packer_user_config
		autocmd!
		autocmd BufWritePost plugins.lua source <afile> | PackerSync
	augroup end
]])

require('mason').setup()
