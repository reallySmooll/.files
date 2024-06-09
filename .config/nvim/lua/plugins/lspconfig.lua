require("neodev").setup()

local lspconfig = require("lspconfig")
local capabilities = require("cmp_nvim_lsp").default_capabilities()
local navbuddy = require("nvim-navbuddy")

--local capabilities = vim.lsp.protocol.make_client_capabilities()
--capabilities.textDocument.foldingRange = {
--    dynamicRegistration = false,
--    lineFoldingOnly = true
--}
local lsps = {
    "cmake",
    "lua_ls",
    "tsserver",
    "clangd",
    "typos_lsp",
    "emmet_language_server"
}
for _, lsp in ipairs(lsps) do
    lspconfig[lsp].setup {
        capabilities = capabilities,
        on_attach = (lsp ~= "typos_lsp") and function (client, bufnr)
            navbuddy.attach(client, bufnr)
        end or nil,
        init_options = (lsp == "clangd") and {
            fallbackFlags = { "--std=c++23" }
        } or nil
    }
end

-- Use LspAttach autocommand to only map the following keys
-- after the language server attaches to the current buffer
vim.api.nvim_create_autocmd("LspAttach", {
    group = vim.api.nvim_create_augroup("UserLspConfig", {}),
    callback = function(ev)
        -- Enable completion triggered by <c-x><c-o>
        vim.bo[ev.buf].omnifunc = "v:lua.vim.lsp.omnifunc"

        -- Buffer local mappings.
        -- See `:help vim.lsp.*` for documentation on any of the below functions
        local opts = { buffer = ev.buf }
        vim.keymap.set("n", "gD", vim.lsp.buf.declaration, opts)
        vim.keymap.set("n", "gd", vim.lsp.buf.definition, opts)
        vim.keymap.set("n", "K", vim.lsp.buf.hover, opts)
        vim.keymap.set("n", "gi", vim.lsp.buf.implementation, opts)
        vim.keymap.set("n", "<C-k>", vim.lsp.buf.signature_help, opts)
        vim.keymap.set("n", "<Leader>wa", vim.lsp.buf.add_workspace_folder, opts)
        vim.keymap.set("n", "<Leader>wr", vim.lsp.buf.remove_workspace_folder, opts)
        vim.keymap.set("n", "<Leader>wl", function()
          print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
        end, opts)
        vim.keymap.set("n", "<Leader>D", vim.lsp.buf.type_definition, opts)
        vim.keymap.set("n", "<Leader>rn", vim.lsp.buf.rename, opts)
        vim.keymap.set({ "n", "v" }, "<Leader>ca", vim.lsp.buf.code_action, opts)
        vim.keymap.set("n", "gr", vim.lsp.buf.references, opts)
        vim.keymap.set("n", "<Leader>f", function()
          vim.lsp.buf.format { async = true }
        end, opts)
    end,
})
