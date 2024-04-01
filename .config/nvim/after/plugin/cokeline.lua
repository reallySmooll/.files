local get_hex = require('cokeline.hlgroups').get_hl_attr

local colors = {
    grey      = '#313245',
    mute      = '#1e1e30',
    less_mute = '#45475b',
    blue      = '#89B4FB',
    red       = '#f38ba8'
}

require('cokeline').setup({
    default_hl = {
        --fg = function(buffer)
        --return
        --    buffer.is_focused
        --    and get_hex('Normal', 'fg')
        --    or get_hex('Comment', 'fg')
        --end,
        --bg = '#313245'
        --bg = '#1E1E30'
        fg = function (buffer)
            return
                buffer.is_focused
                and colors.red
                or get_hex('Comment', 'fg')
        end,
        bg = colors.mute
    },
    components = {
        {
            text = ' ',
            bg = get_hex('Normal', 'bg')
        },
        {
            text = '',
            --fg = get_hex('ColorColumn', 'bg'),
            fg = colors.mute,
            bg = get_hex('Normal', 'bg')
        },
        {
            text = function(buffer)
                return buffer.devicon.icon
            end,
            fg = function(buffer)
                return buffer.devicon.color
            end
        },
        --{
        --    text = ' '
        --},
        {
            text = function(buffer) return buffer.filename .. ' ' end,
            on_mouse_enter = function (buffer)
                print("Hello")
            end
        },
        {
            text = function (buffer)
                return buffer.is_modified and '•' or '󰖭'
            end,
            delete_buffer_on_left_click = true
        },
        {
            text = '',
            --fg = get_hex('ColorColumn', 'bg'),
            fg = colors.mute,
            bg = get_hex('Normal', 'bg')
        }
    },
    sidebar = {
        filetype = {'NvimTree'},
        components = {
            {
                text = '  ',
                bg = get_hex('Normal', 'bg')
            },
            {
                text = function (buf)
                    return buf.filetype
                end,
                fg = '#f5b14a',
                bg = function () return get_hex('NvimTreeNormal', 'bg') end,
                bold = true
            }
        }
    }
})
