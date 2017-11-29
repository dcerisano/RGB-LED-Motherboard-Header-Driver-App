#!/bin/bash

# Install dependencies
sudo apt install xsensors lm-sensors fancontrol

# Install sensors and configure fancontrol
# sudo /sbin/modprobe nct6775 force_id=0xd120 # uncommment if NUVOTON NCT6795D SIO sensors are not suppported by your kernel
sudo sensors-detect
sudo pwmconfig
sudo systemctl restart fancontrol

# Configure rgb-cpu.sh with your specific PWM fan (if any, but DON'T configure the CPU fan)
# Run install-rgb.sh