# MISCELLANEOUS FUNCTIONS
set fish_greeting
set -Ux EDITOR nvim
set LD_BIND_NOW 1
set LC_ALL C

# Start X at login
if status is-login
	if test -z "$DISPLAY" -a "$XDG_VTNR" = 1
		exec startx -- -keeptty
	end
end

# START OF ALIASES
alias "ls"="exa -lah --icons --group-directories-first"
alias "cat"="bat"
alias "fish-config"="nvim ~/.config/fish/config.fish && source ~/.config/fish/config.fish"
alias "fix-keys"="sudo killall gpg-agent && sudo rm -rf /etc/pacman.d/gnupg && sudo pacman-key --init && sudo pacman-key --populate archlinux"
alias "find-package"="yay -Ss"
alias "grep"="ugrep -EinDskip --color=always"
alias "dwm-build"="cd ~/dotfiles/suckless/dwm/ && sudo make clean install"
#alias "dmenu-build"="cd ~/dotfiles/suckless/dmenu/ && sudo make clean install"

# SSH agent
fish_ssh_agent
