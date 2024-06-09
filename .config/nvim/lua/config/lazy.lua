local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not (vim.uv or vim.loop).fs_stat(lazypath) then
    vim.fn.system({
        "git",
        "clone",
        "--filter=blob:none",
        "https://github.com/folke/lazy.nvim.git",
        "--branch=stable",
        lazypath
    })
end

vim.opt.rtp:append(lazypath)

require("lazy").setup({
	"nvim-lualine/lualine.nvim",					-- Status bar
	"ryanoasis/vim-devicons",						-- Icon pack
	"kyazdani42/nvim-web-devicons",                 -- More icons
	"sheerun/vim-polyglot",							-- Better syntax highlighting
	"neovim/nvim-lspconfig",						-- Neovim"s LSP config
	"luochen1990/rainbow",							-- Bracket colorizer from VSCode
	"ziontee113/color-picker.nvim",                 -- Color picker
	"lukas-reineke/indent-blankline.nvim",			-- Adds indentation guides to all lines (including empty ones)
	"williamboman/mason.nvim",						-- NeoVim LSP server installer
	"williamboman/mason-lspconfig.nvim",			-- 3rd party plugin for mason.nvim
	"hrsh7th/cmp-nvim-lsp",							-- Autocompletion sources
	"hrsh7th/cmp-buffer",							--
	"hrsh7th/cmp-cmdline",							--
	"hrsh7th/cmp-nvim-lsp-document-symbol",			--
	"hrsh7th/cmp-nvim-lsp-signature-help",			--
	"FelipeLema/cmp-async-path",					--
	"ray-x/cmp-treesitter",							--
	"hrsh7th/nvim-cmp",								-- Autocompletion
	"hrsh7th/cmp-vsnip",							-- Autocompletion code snippets
	"hrsh7th/vim-vsnip",							--
	"onsails/lspkind.nvim",							--
	"nvim-tree/nvim-tree.lua", 						-- File explorer
	"rebelot/kanagawa.nvim", 						-- Colorscheme
	"mfussenegger/nvim-dap", 						-- Debugging
	"folke/neodev.nvim", 							-- Type checking for dap-ui & setup for plugin development
	"stevearc/dressing.nvim", 						-- ui improvements
	"rcarriga/nvim-notify", 		                -- notification manager
	"stevearc/overseer.nvim", 						-- task runner and job management
	"folke/trouble.nvim",
	"luukvbaal/statuscol.nvim", 					-- fix for ufo styling

	{ "nvim-treesitter/nvim-treesitter",
	  build = ":TSUpdate"
	},
	{ "willothy/nvim-cokeline",
	  dependencies = {
		"nvim-lua/plenary.nvim",
		"nvim-tree/nvim-web-devicons"
	  },
	  config = true
	},
	{ "nvim-telescope/telescope-fzf-native.nvim",
	  build = "cmake -S. -Bbuild -DCMAKE_BUILD_TYPE=Release && cmake --build build --config Release && cmake --install build --prefix build"
	},
	{ "nvim-telescope/telescope-file-browser.nvim",
	  dependencies = { "nvim-telescope/telescope.nvim", "nvim-lua/plenary.nvim" }
	},
	{ "tzachar/fuzzy.nvim",
	  dependencies = "nvim-telescope/telescope-fzf-native.nvim"
	},
	{ "tzachar/cmp-fuzzy-path",
	  dependencies = { "hrsh7th/nvim-cmp", "tzachar/fuzzy.nvim" }
	},
	{ "windwp/nvim-autopairs",
	  event = "InsertEnter",
	  config = true
	},
	{ "folke/todo-comments.nvim",
	  dependencies = "nvim-lua/plenary.nvim"
	},
	{ "numToStr/Comment.nvim",
	  lazy = false
	},
	{ "akinsho/bufferline.nvim",
	  version = "*",
	  dependencies = "nvim-tree/nvim-web-devicons"
	},
	{ "rcarriga/nvim-dap-ui",
	  dependencies = { "mfussenegger/nvim-dap", "nvim-neotest/nvim-nio" }
	},
	{ "nvim-telescope/telescope.nvim",
	  tag = "0.1.6",
      dependencies = "nvim-lua/plenary.nvim"
	},
	{ "stevearc/oil.nvim",
	  dependencies = "nvim-tree/nvim-web-devicons"
	},
	{ "SmiteshP/nvim-navbuddy",
	  dependencies = {
		  "SmiteshP/nvim-navic",
		  "MunifTanjim/nui.nvim"
	  }
	},
	{ "kevinhwang91/nvim-ufo",
	  dependencies = "kevinhwang91/promise-async"
	}
})

require("mason").setup()
require("trouble").setup()
