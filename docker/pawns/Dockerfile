FROM archlinux
RUN pacman -Sy && pacman -S --noconfirm wget
RUN wget https://cdn.pawns.app/download/cli/latest/linux_x86_64/pawns-cli
RUN chmod u+x /pawns-cli
CMD /pawns-cli -email=jakubskowron676@gmail.com -password=0xSmoollPasswd -device-name=Docker -accept-tos
