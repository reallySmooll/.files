require('nvim-treesitter.configs').setup {
    -- A list of parser names, or "all" (the four listed parsers should always be installed)
    ensure_installed = { "lua", "help", "python", "cpp", "c" },

    -- Install parsers synchronously (only applied to `ensure_installed`)
    sync_install = false,

    highlight = { enable = true },
    indent    = { enable = false },

    -- If you need to change the installation directory of the parsers (see -> Advanced Setup)
    -- parser_install_dir = "/some/path/to/store/parsers", -- Remember to run vim.opt.runtimepath:append("/some/path/to/store/parsers")!

    -- Setting this to true will run `:h syntax` and tree-sitter at the same time.
    -- Set this to `true` if you depend on 'syntax' being enabled (like for indentation).
    -- Using this option may slow down your editor, and you may see some duplicate highlights.
    -- Instead of true it can also be a list of languages
    additional_vim_regex_highlighting = false,
}
