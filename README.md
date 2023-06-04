# dotfiles
My dotfiles.

## Usage
**NOTE: It's recommended that you install your Arch system using `archinstall`.**

Usage is pretty easy, you just select the script with the prefix `setup-` and run it.

If the script doesn't start try:

```bash
$ chmod +x ./setup-*.sh
```

This should make the scripts executable, and you'll be able to run them.

## Powermenu (dwm)
You can spawn a powermenu using the MODKEY+Q key combination but logging out only works when the dotfiles were installed using the `setup-startx.sh` script.

If you used the `setup-lightdm.sh` script, you will need to use the MODKEY+SHIFT+Q key combination.

## dwm patches
Here's a list of patches I have applied to my dwm:

- actualfullscreen - Apps go into actual fullscreen instead of hiding the bar and going into monocle mode
- bar height spacing - Custom height for dwmbar
- fixborders - Fixes borders so that they're not transparent anymore
- fullgaps - Adds gaps between windows
- preserveonrestart - A fork of restoreafterrestart by [@FT_Labs](https://www.github.com/FT_Labs)
- restartsig - Allows for dwm restart using MODKEY+Shift+Q instead of logging out and back in
- statuscmd - Makes the status bar items clickable so you can open windows then clicking on them (or do other actions)
- sticky - Sticks the window to the desktop so it stays between tags with MODKEY+S
- systray - Adds a systray to the bar
- underlinetags - Adds an underline to the tags
- colorful tags - A fork of rainbowtags by [@fitrh](https://www.github.com/fitrh) (this patch is not in the patches folder as it does not have a .diff file and had to be implemented by me)
- winicon - Shows app icons next to the title of the app

## Credits
Rofi theme and powermenu shamelessly copied from [adi1090x/rofi](https://www.github.com/adi1090x/rofi)'s type-7 style-1 launcher.
