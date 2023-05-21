#!/usr/bin/bash

COUNTER=5

begin()
{
    # Entry point of the program with a nice message.
    clear

    echo NOTE: MAKE SURE YOU RUN THIS SCRIPT INSIDE OF THE DOTFILES FOLDER.

    echo
    echo Welcome to the \"Smooll but Advanced Dotfiles Setup System\" or \"SADSS\" for short! \(GNOME Edition\)

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

    # GNOME Edition
    copy_gnome_extensions

    return
}

install_programs()
{
    # Function installs all programs and dependencies needed for the config to run well.
    clear

    install_yay
    install_pkglist
    install_starship
    install_packer
}

install_yay()
{
    echo Installing yay...

    sudo pacman -S --needed git base-devel
    git clone https://aur.archlinux.org/yay.git
    cd ./yay
    makepkg -si --noconfirm
    sleep 2

    clear

    echo Successfully installed yay!
    echo Removing yay directory...

    cd ../
    rm -rf ./yay

    echo Successfully removed yay directory!

    sleep 2
}

install_pkglist()
{
    clear

    echo Installing programs from pkglist.pacman...

    sudo pacman -S --needed --noconfirm - < ./pkglist.pacman
    sleep 2

    clear

    echo Successfully installed programs from pkglist.pacman!
    echo Installing programs from pkglist.yay...

    sudo yay -S --needed --noconfirm - < ./pkglist.yay
    sleep 2

    clear

    echo Successfully installed programs from pkglist.yay!

    sleep 2
}

install_starship()
{
    clear

    echo Installing starship.rs...

    curl -sS https://starship.rs/install.sh | sh

    clear

    echo Successfully installed starship.rs!

    sleep 2
}

install_packer()
{
    clear

    echo Installing packer...

    git clone --depth 1 https://github.com/wbthomason/packer.nvim\
 ~/.local/share/nvim/site/pack/packer/start/packer.nvim

    echo Successfully installed packer!

    sleep 2
}

copy_configs()
{
    clear

    echo Copying configs from .config...

    mkdir ~/.config/
    cp ./.config/* ~/.config/

    echo Copied configs from .config!
    echo Copying configs from gnome/.config...

    cp ./gnome/.config/* ~/.config/

    echo Copied configs from gnome/.config!

    sleep 2
}

copy_gnome_extensions()
{
    clear

    echo Copying GNOME extensions from gnome/.local/share/gnome-shell/extensions...

    mkdir -p ~/.local/share/gnome-shell/
    cp ./gnome/local/share/gnome-shell/extensions ~/.local/share/gnome-shell

    echo Successfully copied GNOME extensions!

    sleep 2
}

copy_themes_and_icons()
{
    clear

    echo Copying themes and icons...

    sudo mkdir -p /usr/share/themes /usr/share/icons
    sudo rm -rf /usr/share/icons/default
    sudo cp ./usr/share/icons/* /usr/share/icons
    sudo cp ./usr/share/themes/* /usr/share/themes
    rm -rf ~/.icons ~/.themes
    cp ./.icons ./.themes ~/

    echo Successfully copied themes and icons!

    sleep 2
}

copy_fonts()
{
    clear

    Copying fonts...

    cp ./.local/share/fonts ~/.local/share

    echo Successfully copied fonts!

    sleep 2
}

copy_everything_else()
{
    clear

    echo Copying 50-mouse-acceleration.conf

    sudo mkdir -p /etc/X11/xorg.conf.d
    sudo ./etc/X11/xorg.conf.d/50-mouse-acceleration.conf /etc/X11/xorg.conf.d/

    echo Successfully copied everything!

    sleep 2
}


end()
{
    clear

    echo Finished installing my config!
    echo If anything broke, then I\'m sorry, but I already told you that I\'m not responsible for any damage, so bye!

    sleep 10

    clear
}

# Call "begin()" and "end()".
begin
end
