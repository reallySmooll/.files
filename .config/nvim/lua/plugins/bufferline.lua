local bufferline = require("bufferline")

local colors = {
    red     = "#f38ba8",
    bg      = "#202021",
    fg      = "#27272a",
    nvim_fg = "#f5b14a",
    fill    = "#161617",
    inactive_fg = "#101011"
}

bufferline.setup({
    options = {
        mode = "buffers",
        themable = true,
        diagnostics = "nvim_lsp",
        diagnostics_indicator = function(count, level, diagnostics_dict, context)
            local s = ""
            for e, n in pairs(diagnostics_dict) do
                local sym = e == "error" and " "
                or (e == "warning" and " " or "" )
                s = s .. n .. sym
            end
            return s
        end,
        offsets = {
            {
                filetype = "NvimTree",
                text = "󰙅 File Explorer",
                highlight = "Directory",
                separator = true
            }
        },
        separator_style = "slant" --{ "any", "hello" }
    },
    highlights = {
        fill = {
            --fg = '<colour-value-here>',
            --bg = colors.fill
        },
        background = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        tab = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        tab_selected = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        tab_separator = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        tab_separator_selected = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --sp = '<colour-value-here>',
            --underline = '<colour-value-here>'
        },
        tab_close = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        close_button = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        close_button_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        close_button_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg
        },
        buffer_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        buffer_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --bold = true,
            --italic = true
        },
        numbers = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        numbers_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        numbers_selected = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        diagnostic = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        diagnostic_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        diagnostic_selected = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        hint = {
            --fg = '<colour-value-here>',
            --sp = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        hint_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        hint_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --sp = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        hint_diagnostic = {
            --fg = '<colour-value-here>',
            --sp = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        hint_diagnostic_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        hint_diagnostic_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --sp = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        info = {
            --fg = '<colour-value-here>',
            --sp = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        info_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        info_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --sp = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        info_diagnostic = {
            --fg = '<colour-value-here>',
            --sp = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        info_diagnostic_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        info_diagnostic_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --sp = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        warning = {
            --fg = '<colour-value-here>',
            --sp = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        warning_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        warning_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --sp = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        warning_diagnostic = {
            --fg = '<colour-value-here>',
            --sp = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        warning_diagnostic_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        warning_diagnostic_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --sp = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        error = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --sp = '<colour-value-here>'
        },
        error_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        error_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --sp = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        error_diagnostic = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --sp = '<colour-value-here>'
        },
        error_diagnostic_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        error_diagnostic_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --sp = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        modified = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        modified_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        modified_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg
        },
        duplicate_selected = {
            --fg = '<colour-value-here>',
            --bg = colors.bg,
            --italic = true
        },
        duplicate_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --italic = true
        },
        duplicate = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --italic = true
        },
        separator_selected = {
            --fg = colors.fill,
            --bg = colors.bg
        },
        separator_visible = {
            --fg = colors.fill,
            --bg = '<colour-value-here>'
        },
        separator = {
            --fg = colors.fill,
            --bg = colors.bg
        },
        indicator_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        indicator_selected = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        },
        pick_selected = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        pick_visible = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        pick = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>',
            --bold = true,
            --italic = true
        },
        offset_separator = {
            --fg = '<colour-value-here>',
            bg = colors.fill
        },
        trunc_marker = {
            --fg = '<colour-value-here>',
            --bg = '<colour-value-here>'
        }
    }
})
