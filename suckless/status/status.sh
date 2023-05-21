#!/usr/bin/bash

while true; do
    xsetroot -name "🔋 $(cat /sys/class/power_supply/axp288_fuel_gauge/capacity)% | 🗓 $(date +'%d/%m/%Y | 🕑 %H:%M:%S') "
    sleep 5
done
