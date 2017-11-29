# Install package deps
sudo apt install xsensors lm-sensors fancontrol

# Install sensors and configure fancontrol
sudo /sbin/modprobe nct6775 force_id=0xd120 # uncommment if NUVOTON NCT6795D SIO chip is not fully suppported by your kernel
sudo sensors-detect
sudo pwmconfig
sudo systemctl restart fancontrol

# Make a note of which PWM fan you wish to be managed by the rgb-cpu service (if any, but it is 'cool')