# .files
My .files (get it, cause `dot` is `.` so `.files` haha).

## Usage
**NOTE: It's recommended that you install your Arch system using `archinstall`.**

Usage is pretty easy, you just select the `setup-dwm-startx.sh` script and run it:

```bash
$ ./setup-dwm-startx.sh
```

If the script doesn't start try:

```bash
$ chmod +x ./setup-dwm-startx.sh
```

This should make the script executable, and you'll be able to run it.

## Hotkeys
You can see the hotkeys assigned to different functions by running `cat` or editing the `suckless/dwm/config.def.h` file.

To open the terminal use the WINDOWS, SHIFT and ENTER keys together.

## dwm patches
Here's a list of patches that reside in the `suckless/dwm/patches` directory (I don't remember if all of them are applied):

- actualfullscreen - Actually toggle fullscreen for a window, instead of toggling the status bar and the monocle layout.
- adjecenttag - This patch allow to focus on the adjacent tag (left or right) or move a client to it, the version with 'skipvacant' will skip vacant tags
- alwayscenter - All floating windows are centered, like the center patch, but without a rule.
- bar height spacing - This patch allows user to change dwm's default bar height.
- cool autostart - Allow dwm to execute commands from autostart array in your config.h file. And when you exit dwm all processes from autostart array will be killed.
- decoration hints - Make dwm respect \_MOTIF_WM_HINTS property, and not draw borders around windows requesting for it. Some applications use this property to notify window managers to not draw window decorations. Not respecting this property leads to issues with applications that draw their own borders, like chromium (with "Use system title bar and borders" turned off) or vlc in fullscreen mode.
- fixborders - Fixes borders so that they're not transparent anymore when using picom.
- fullgaps - Adds gaps between client windows.
- preserveonrestart - By default, when dwm is recompiled-restarted all clients will lose it's current tag and collapse to first tag. This patch preserves clients on old tags, however note that layout order is not preserved.
- restartsig - dwm can now be restarted via MOD+CTRL+SHIFT+Q or by kill -HUP dwmpid. In addition, a signal handler was added so that dwm cleanly quits by kill -TERM dwmpid.
- statuscmd - This patch adds the ability to signal a status monitor program such as dwmblocks the location and button when clicking on the status bar. Alternatively, there is a version that executes shell commands defined in config.h instead of using signals.
- sticky - Press MODKEY+s (default) to make a client 'sticky'. A sticky client is visible on all tags. This is similar to setting the client's tags to all 1's, but with the ability to easily return it to its original tag by toggling it off by pressing MODKEY+s again.
- systray - A simple system tray implementation. Multi-monitor is also supported. The tray follows the selected monitor.
- underlinetags - Underlines selected tags.
- colorful tags - A fork of rainbowtags by [@fitrh](https://www.github.com/fitrh) (this patch is not in the patches folder as it does not have a .diff file and had to be implemented by me).
- winicon - Shows app icons next to the title of the app.

## Credits
Rofi theme shamelessly copied from [adi1090x/rofi](https://www.github.com/adi1090x/rofi)'s type-7 style-1 launcher.
Powermenu shamelessly copied from [adi1090x/rofi](https://www.github.com/adi1090x/rofi)'s type-6 style-1 powermenu.
