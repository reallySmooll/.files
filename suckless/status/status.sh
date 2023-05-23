#!/usr/bin/bash

while true; do
    xsetroot -name "⟳ $(pacman -Qqu | wc -l) | 🗓 $(date +'%d/%m/%Y | 🕑 %H:%M:%S') | 🔋 $(cat /sys/class/power_supply/axp288_fuel_gauge/capacity)% "
    sleep 5
done
