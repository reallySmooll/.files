#!/usr/bin/bash

while true; do
    xsetroot -name "BATTERY: $(cat /sys/class/power_supply/axp288_fuel_gauge/capacity)% | TIME: $(date +'%a, %d-%m-%Y, %H:%M:%S') "
    sleep 5
done
