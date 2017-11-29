
# Install package deps
sudo apt install rustc cargo make xsensors lm-sensors fancontrol stress



# Init sensors and fancontrol
# Then edit rgb-cpu.sh to point to the fan you want to use as a thruster
# sudo /sbin/modprobe nct6775 force_id=0xd120 # uncommment if NUVOTON NCT6795D SIO chip is not fully suppported by your kernel
sudo sensors-detect
sudo pwmconfig

# Install sound effects 
sudo cp ./standard3d.wav      /usr/local/share
sudo cp ./vrip360.wav         /usr/local/share

# Install the RGB driver
cargo build --release
sudo cp ./target/release/msi-rgb  /usr/local/bin

# Install RGB services

sudo cp ./rgb-cpu.service     /etc/systemd/system
sudo cp ./rgb-net.service     /etc/systemd/system
sudo cp ./rgb-sound.service   /etc/systemd/system
sudo cp ./rgb-cpu.sh          /usr/local/bin
sudo cp ./rgb-net.sh          /usr/local/bin
sudo cp ./rgb-sound.sh        /usr/local/bin

sudo systemctl stop    rgb-cpu
sudo systemctl disable rgb-cpu
sudo systemctl enable  rgb-cpu
sudo systemctl start   rgb-cpu

sudo systemctl stop    rgb-net
sudo systemctl disable rgb-net
sudo systemctl enable  rgb-net
sudo systemctl start   rgb-net

sudo systemctl --user stop    rgb-sound
sudo systemctl --user disable rgb-sound
sudo systemctl --user enable  rgb-sound
sudo systemctl --user start   rgb-sound
