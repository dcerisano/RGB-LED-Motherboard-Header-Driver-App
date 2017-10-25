sudo apt install rustc cargo make xsensors lm-sensors fancontrol stress tcpdump

# sudo sensors-detect
# sudo pwmconfig

cargo build --release

sudo cp         ./rgb-cpu.service     /etc/systemd/system
sudo cp         ./rgb-net.service     /etc/systemd/system
sudo cp         ./rgb-sound.service   /etc/systemd/system
sudo chown root ./target/release/msi-rgb
sudo chmod u+s  ./target/release/msi-rgb
sudo cp         ./target/release/msi-rgb     /usr/local/bin
sudo cp         ./rgb-cpu.sh                 /usr/local/bin
sudo cp         ./rgb-net.sh                 /usr/local/bin
sudo cp         ./rgb-sound.sh               /usr/local/bin
       
sudo systemctl disable rgb-cpu
sudo systemctl disable rgb-net
sudo systemctl enable  rgb-cpu
sudo systemctl enable  rgb-net
sudo systemctl start   rgb-cpu
sudo systemctl start   rgb-net

# systemctl --user disable rgb-sound-visualizer
# systemctl --user enable  rgb-sound-visualizer
# systemctl --user start   rgb-sound-visualizer

