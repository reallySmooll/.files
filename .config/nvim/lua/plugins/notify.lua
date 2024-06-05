vim.notify.setup({
    background_colour = "NotifyBackground",
    fps = 60,
    icons = {
      DEBUG = "",
      ERROR = "",
      INFO = "",
      TRACE = "✎",
      WARN = ""
    },
    level = 2,
    max_width = 75,
    minimum_width = 75,
    render = "default",
    stages = "slide",
    time_formats = {
      notification = "%T",
      notification_history = "%FT%T"
    },
    timeout = 3000,
    top_down = true
})
