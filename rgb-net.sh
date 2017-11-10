#!/bin/bash
###############################################################################
#
# RGB SOUND VISUALIZER
#
#   Real-time sound volume meter for msi-rgb
#   D. Cerisano September 4, 2017
#   Follow msi-rgb build instructions in README
#
# Special Requirements:
#
#   Pulse Audio
#
# To build RGB driver:
#
#    sudo apt install rustc cargo
#    cargo --cargo build --release
#    sudo chown root /target/release/msi-rgb
#    sudo chmod u+s ./target/release/msi-rgb
#
# To test from your git repo: 
#
#   ./rgb-net.sh
#
# To run as auto-starting user service (your system must support modern systemctl):
#   
#   sudo cp ./rgb-net.service          /etc/systemd/user
#   sudo cp ./target/release/msi-rgb   /usr/local/bin
#   sudo cp ./rgb-net.sh               /usr/local/bin
#   sudo chmod u+s /usr/local/bin/msi-rgb
#   systemctl --user enable rgb-net
#   systemctl --user start  rgb-net
#
# To stop user service:
#   systemctl --user stop rgb-net
#
# To disable user service:
#   systemctl --user disable rgb-net
#
#
###############################################################################


# Graceful exit: turn off RGB effect.
  trap 'USER=root; $rgb_driver 0 0 0 -p; exit 1' SIGINT SIGTERM EXIT


# RGB Super I/O Header Constants (loop of 8 rgb settings with configurable delay)
#  r=00000000      # Default given here is an afterburner spectrum (amber to blue)
#  g=00000000      # Note that the bytes are little endian, so: 
#  b=00000000      # Expected curve of cdffedcb must be set as dcffdebc
#  d=4             # Delay (~ms*10) - note this loop is performed by SIO, not CPU
  
#  rgb_driver="./target/release/msi-rgb"  

# Check if running as user service
#  if [ "`systemctl --user is-active rgb-net`" = "active" ] 
#    then
#      echo ALERT: rgb-net user service is active
#      rgb_driver="/usr/local/bin/msi-rgb"
#  fi


# MAIN LOOP

  tail -F /var/log/apache2/access.log |
  while read line
  do 
     # skip dummy spawn messages that are tagged with domain names
     if [[ $line == *"dummy"* ]]
        continue;
     fi
  
     if [[ $line == *"vrip360"* ]]
        aplay /usr/local/share/vrip360.wav &
        # $rgb_driver 11111111 0 # flash red
     fi
     
     if [[ $line == *"standard3d"* ]]
        aplay /usr/local/share/standard3d.wav &
        # $rgb_driver 0 11111111 0 # flash green
     fi
     
     # $rgb_driver 0 0 0 # turn down RGB

  done

