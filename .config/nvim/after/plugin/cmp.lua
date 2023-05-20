local cmp = require('cmp')

local has_words_before = function ()
    unpack = unpack or table.unpack
    local line, col = unpack(vim.api.nvim_win_get_cursor(0))
    return col ~= 0 and vim.api.nvim_buf_get_lines(0, line - 1, line, true)[1]:sub(col, col):match('%s') == nil
end

local feedkey = function (key, mode)
    vim.api.nvim_feedkeys(vim.api.nvim_replace_termcodes(key, true, true, true), mode, true)
end

cmp.setup {
    snippet = {
        expand = function(args) vim.fn["vsnip#anonymous"](args.body) end
    },
    window = {
        completion = cmp.config.window.bordered(),
        documentation = cmp.config.window.bordered()
    },
    mapping = {
        ['<C-b>'] = cmp.mapping.scroll_docs(-4),
        ['<C-f>'] = cmp.mapping.scroll_docs(4),
        ['<TAB>'] = cmp.mapping(function (fallback)
            if cmp.visible() then
                cmp.confirm({ select = true })
            elseif vim.fn['vsnip#available'](1) == 1 then
                feedkey('<Plug>(vsnip-expand-or-jump)', '')
            elseif has_words_before() then
                cmp.complete()
            else
                fallback()
            end
        end, { 'i', 's', }),
        ['<S-TAB>'] = cmp.mapping(function ()
            if vim.fn['vsnip#jumpable'](-1) == 1 then
                feedkey('<Plug>(vsnip-jump-prev)', '')
            end
        end, { 'i', 's' }),
        ['<Down>'] = cmp.mapping.select_next_item(),
        ['<Up>'] = cmp.mapping.select_prev_item()
    },
    sources = cmp.config.sources({
        { name = 'nvim_lsp' },
        { name = 'vsnip' },
        { name = 'nvim_lsp_signature_help' },
        --{ name = 'treesitter' }
    }, {
        { name = 'buffer' }
    }),
    formatting = {
        format = require('lspkind').cmp_format({
            mode = 'symbol_text',
            maxwidth = 50,
            ellipsis_char = '...',
        })
    }
}

-- Use buffer source for `/` and `?` (if you enabled `native_menu`, this won't work anymore).
cmp.setup.cmdline('/', {
    mapping = cmp.mapping.preset.cmdline(),
    sources = cmp.config.sources({
        { name = 'nvim_lsp_document_symbol' }
    }, {
        { name = 'buffer' }
    })
})

-- Use cmdline & path source for ':' (if you enabled `native_menu`, this won't work anymore).
cmp.setup.cmdline(':', {
    mapping = cmp.mapping.preset.cmdline(),
    sources = cmp.config.sources({
        { name = 'async_path' },
        { name = 'fuzzy_path' }
    }, {
        { name = 'cmdline' }
    })
})
