#!/usr/bin/bash

COUNTER=5

begin()
{
    # Entry point of the program with a nice message.
    clear

    echo NOTE: MAKE SURE YOU RUN THIS SCRIPT INSIDE OF THE DOTFILES FOLDER.

    echo
    echo Welcome to the \"Smooll but Advanced Dotfiles Setup System\" or \"SADSS\" for short! \(dwm-startx Edition\)

    echo
    echo In about... right now, my files and any other programs I need to live with Linux will polute your system.
    echo It\'s recomended that you install your Arch system using \"archinstall\".

    echo
    echo If you\'d like to stop the process of pollution, you can! \(unfortunately...\)
    echo Before starting the pollution, I will need a signed agreement that I\'m not responsible for any problems SADSS caused on your system.

    echo
    echo Type \"I Agree\" below to start the process or \"I Don\'t Agree\" \(case sensitive\) to stop the process...

    # Input going to "agreement" variable.
    echo
    read -p "Here's an input field: " agreement

    # "agreement" variable checked if is "I Don't Agree", if it is, echo a message and exit.
    # If not, proceed to "start_setup()".
    if [ "$agreement" = "I Don't Agree" ]
    then
        clear
        echo Ok, more for me!
        exit
    elif [ "$agreement" = "I Agree" ]
    then
        start_setup
    else
        exit
    fi

    return
}

start_setup()
{
    # Echo a message and execute every dotfiles setup function.
    clear

    echo Thank you!

    echo
    while [ $COUNTER -gt 0 ]
    do
        echo -ne "Process starting in $COUNTER...\033[0K\r"
        ((COUNTER--))
        sleep 1
    done

    # Execute dotfiles setup functions.
    install_programs
    copy_configs
    copy_themes_and_icons
    copy_fonts
    copy_everything_else

    return
}

install_programs()
{
    # Function installs all programs and dependencies needed for the config to run well.
    clear

    install_yay
    install_pkglist
    #install_starship
    #install_packer
    install_dwm
    install_dwmblocks
}

install_yay()
{
    echo Installing yay...
    sudo pacman -S --needed git base-devel
    git clone https://aur.archlinux.org/yay.git
    cd ./yay
    makepkg -si --noconfirm
    sleep 2

    echo
    echo Successfully installed yay!
    echo Removing yay directory...
    cd ../
    rm -rf ./yay

    echo Successfully removed yay directory!

    sleep 2
}

install_pkglist()
{
    echo

    echo Installing programs from pkglist.pacman...
    sudo pacman -S --needed --noconfirm - < ./pkglist.pacman
    sleep 2

    echo
    echo Successfully installed programs from pkglist.pacman!
    echo Installing programs from pkglist.yay...
    yay -S --needed --noconfirm - < ./pkglist.yay
    sleep 2

    echo
    echo Successfully installed programs from pkglist.yay!

    sleep 2
}

install_starship()
{
    echo

    echo Installing starship.rs...
    curl -sS https://starship.rs/install.sh | sh

    echo
    echo Successfully installed starship.rs!

    sleep 2
}

install_packer()
{
    echo

    echo Installing packer...
    echo Compiling telescope-fzf-native.nvim
    cd ~/.local/share/nvim/site/pack/packer/start/telescope-fzf-native.nvim/
    make
    cd ~/dotfiles

    echo Successfully installed packer!

    sleep 2
}

install_dwm()
{
    echo

    echo Installing dwm...
    cd ~/dotfiles/suckless/dwm/
    sudo make clean install
    cd ../..

    echo Successfully installed dwm!

    sleep 2
}

install_dwmblocks()
{
    echo

    echo Installing dwmblocks...
    cd ~/dotfiles/suckless/dwmblocks-async
    sudo make clean install

    echo
    echo Successfully installed dwmblocks!
    cd modules
    ./install.sh
    cd ../../../

    sleep 2
}

copy_configs()
{
    echo

    echo Installing configs...
    mkdir ~/.config/
    cp -r ./.config/* ~/.config/

    echo
    echo Successfully installed configs!
    echo Installing GTK configs...
    cp -r ./gnome/.config/* ~/.config/

    echo
    echo Successfully installed GTK configs!
    echo Installing rofi config...
    cp -r ./.config/rofi ~/.config/

    echo
    echo Successfully installed rofi config!
    echo Installing SSH config...
    mkdir -p ~/.ssh/
    cp ./.ssh/config ~/.ssh/

    echo
    echo Successfully installed SSH config!

    sleep 5
}

copy_themes_and_icons()
{
    echo

    echo Installing themes and icons...
    sudo mkdir -p /usr/share/themes /usr/share/icons
    sudo rm -rf /usr/share/icons/default
    sudo cp -r ./usr/share/icons/* /usr/share/icons
    sudo cp -r ./usr/share/themes/* /usr/share/themes
    rm -rf ~/.icons ~/.themes
    cp -r ./.icons ./.themes ~/

    echo Successfully installed themes and icons!

    sleep 2
}

copy_fonts()
{
    echo

    echo Installing fonts...
    cp -r ./.local/share/fonts ~/.local/share

    echo Successfully installing fonts!

    sleep 2
}

copy_everything_else()
{
    echo

    echo Installing .xprofile...
    cp ./.xprofile ~/

    echo
    echo Installing .xinitrc
    cp ./.xinitrc ~/

    echo
    echo Installing cpupower config
    sudo cp ./etc/default/cpupower /etc/default

    echo
    echo Installing grub config
    sudo cp ./etc/default/grub /etc/default

    echo
    echo Running grub-mkconfig
    sudo grub-mkconfig -o /boot/grub/grub.cfg

    echo
    echo Installing pacman.conf
    sudo cp ./etc/pacman.conf /etc

    echo
    echo Installing zram-generator.conf
    sudo cp ./etc/systemd/zram-generator.conf /etc/systemd

    echo
    echo Installing 50-mouse-acceleration.conf
    sudo mkdir -p /etc/X11/xorg.conf.d
    sudo cp ./etc/X11/xorg.conf.d/50-mouse-acceleration.conf /etc/X11/xorg.conf.d

    echo
    echo Installing 20-intel.conf
    sudo cp ./etc/X11/xorg.conf.d/20-intel.conf /etc/X11/xorg.conf.d

    echo
    echo Installing environment...
    sudo cp ./etc/environment /etc/environment

    echo
    echo Installing powermenu.sh
    sudo cp ./.config/rofi/powermenu.sh /usr/local/bin

    echo
    echo Starting bluetooth service...
    sudo systemctl enable bluetooth

    echo
    echo Starting cpupower service
    sudo systemctl enable cpupower

    echo
    echo Successfully installed everything!

    sleep 2
}

end()
{
    echo

    echo Finished installing my config!

    echo
    echo If anything broke, then I\'m sorry, but I already told you that I\'m not responsible for any damage, so bye!
}

# Call "begin()" and "end()".
begin
end
