# Init sensors and fancontrol

# Install package deps
sudo apt install xsensors lm-sensors fancontrol

sudo /sbin/modprobe nct6775 force_id=0xd120 # uncommment if NUVOTON NCT6795D SIO chip is not fully suppported by your kernel
sudo sensors-detect
sudo pwmconfig