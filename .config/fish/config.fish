# MISCELLANEOUS FUNCTIONS
set fish_greeting # Suppress fish greeting message
set fish_add_path /home/smoolldev/.local/bin/
set -Ux EDITOR nvim
set LD_BIND_NOW 1
set LC_ALL C

# START OF ALIASES
alias "ls"="exa -laFh --icons --group-directories-first"
alias "cat"="bat"
alias "fish-config"="nvim ~/.config/fish/config.fish && source ~/.config/fish/config.fish"
alias "fix-keys"="sudo killall gpg-agent && sudo rm -rf /etc/pacman.d/gnupg && sudo pacman-key --init && sudo pacman-key --populate archlinux"
alias "find-package"="pacman -Ss"
alias "github-init"="/home/smoolldev/SmoollDev/Development/Bash/github-init.sh"
alias "scr-cap"="/home/smoolldev/record.sh"
alias "grep"="grep -EinDskip --color=always"
alias "count-lines"="/home/smoolldev/count_lines.sh"

# START OF FUNCTION FOR "!!" AND "!$"

# # "!!" and "!$" functions from bash
function bind_bang
    switch (commandline -t)[-1]
	case "!"
		commandline -t $history[1];
	case "*"
		commandline -i !
   end
end

function bind_dollar
    switch (commandline -t)[-1]
	case "!"
		commandline -t ""
		commandline -f history-token-search-backward
	case "*"
		commandline -i '$'
   end
end

function fish_user_key_bindings
    bind ! bind_bang
    bind '$' bind_dollar
end

# STARSHIP INITIALIAZATION SCRIPT
starship init fish | source
