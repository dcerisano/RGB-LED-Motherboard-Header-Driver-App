# Init sensors and fancontrol you must run these once
# Then edit rgb-cpu.sh to point to the fan you want to use as a thruster

# Install package deps
sudo apt install rustc cargo make xsensors lm-sensors fancontrol

sudo /sbin/modprobe nct6775 force_id=0xd120 # uncommment if NUVOTON NCT6795D SIO chip is not fully suppported by your kernel
sudo sensors-detect
sudo pwmconfig