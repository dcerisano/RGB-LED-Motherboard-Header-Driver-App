sudo apt install rustc cargo make
cargo build --release

sudo cp ./rgb-cpu-thruster.service /etc/systemd/system
sudo chown root /target/release/msi-rgb
sudo chmod u+s ./target/release/msi-rgb
sudo cp ./target/release/msi-rgb   /usr/local/bin
sudo cp ./rgb-cpu-thruster.sh      /usr/local/bin
sudo cp ./rgb-sound-visualizer.sh      /usr/local/bin

sudo systemctl enable rgb-cpu-thruster
sudo systemctl start  rgb-cpu-thruster

# systemctl --user enable rgb-sound-visualizer
# systemctl --user start  rgb-sound-visualizer

