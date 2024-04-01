local colors = {
  black = '#000000',
  blue = '#89b4fb',
  green = '#A6E3A2',
  purple = '#CBA6F8',
  red = '#F38BA8',
  mute = '1e1e30',
  dark = '#11111C',
  white = '#ffffff'
}

local custom_theme = {
  normal = {
    a = { fg = colors.black, bg = colors.red  },
    b = { fg = colors.red,   bg = colors.mute },
    c = { fg = colors.red,   bg = colors.dark },
    y = { fg = colors.red,   bg = colors.mute },
    z = { fg = colors.black, bg = colors.red  }
  },

  insert = {
    a = { fg = colors.black, bg = colors.green },
    b = { fg = colors.green, bg = colors.mute  },
    c = { fg = colors.green, bg = colors.dark  },
    y = { fg = colors.green, bg = colors.mute  },
    z = { fg = colors.black, bg = colors.green }
  },
  visual = {
    a = { fg = colors.black,  bg = colors.purple },
    b = { fg = colors.purple, bg = colors.mute   },
    c = { fg = colors.purple, bg = colors.dark   },
    y = { fg = colors.purple, bg = colors.mute   },
    z = { fg = colors.black,  bg = colors.purple }
  },
  replace = {
    a = { fg = colors.black, bg = colors.blue },
    b = { fg = colors.blue,  bg = colors.mute },
    c = { fg = colors.blue,  bg = colors.dark },
    y = { fg = colors.blue,  bg = colors.mute },
    z = { fg = colors.black, bg = colors.blue }
  },

  inactive = {
    a = { fg = colors.red, bg = colors.mute },
    z = { fg = colors.red, bg = colors.mute }
  }
}

require('lualine').setup {
  options = {
    icons_enabled = true,
    theme = custom_theme,
    --theme = 'catppuccin',
    --component_separators = { left = '', right = '' },
    --section_separators = { left = '', right = '' },
    component_separators = '|',
    section_separators = { left = '', right = '' }
  },
  sections = {
    lualine_a = {
      { 'mode', separator = { left = '' }, right_padding = 2 }
    },
    lualine_b = { 'filename', 'branch' },
    lualine_c = { 'fileformat' },
    lualine_x = {},
    lualine_y = { 'filetype', 'progress' },
    lualine_z = {
      { 'location', separator = { right = '' }, left_padding = 2 }
    }
  },
  inactive_sections = {
    lualine_a = { 'filename' },
    lualine_b = {},
    lualine_c = {},
    lualine_x = {},
    lualine_y = {},
    lualine_z = { 'location' }
  },
  tabline = {},
  extensions = {}
}
