# Install dependencies
sudo apt install xsensors lm-sensors fancontrol

# Install sensors and configure fancontrol
# sudo /sbin/modprobe nct6775 force_id=0xd120 # uncommment if NUVOTON NCT6795D SIO sensors are not suppported by your kernel
sudo sensors-detect
sudo pwmconfig
sudo systemctl restart fancontrol

# Configure rgb-cpu.sh with a specific case fan (if any, but it is 'cool')
# Run install-rgb.sh