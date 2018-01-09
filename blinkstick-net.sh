#!/bin/bash
###############################################################################
#
# RGB NET VISUALIZER
#
#   Real-time network notifications for BlinkStick
#   D. Cerisano September 4, 2017
#   Follow msi-rgb build instructions in README
#
# Special Requirements:
#
#   Pulse Audio
#   npm blinkstick
#   In apache conf files for each site (this just includes domain name in each log entry):
#   LogFormat "%v - %h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-agent}i\"" combined-vhost
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
#   sudo cp ./rgb-net.service          /etc/systemd/system
#   sudo cp ./rgb-net.sh               /usr/local/bin
#   systemctl -enable rgb-net
#   systemctl -start  rgb-net
#
# To stop user service:
#   systemctl stop rgb-net
#
# To disable user service:
#   systemctl disable rgb-net
#
#
###############################################################################



# MAIN LOOP


  tail -F /var/log/apache2/access.log |
  while read line
  do 
     # skip dummy spawn messages that are tagged with domain names
     if [[ $line == *"dummy"* ]]
     then
        continue
     fi
  
     if [[ $line == *"vrip360"* ]]
     then
        aplay /usr/local/share/vrip360.wav &
        curl -X GET 'http://dino:5000/?shader=notifier&filename=img/vrip.jpg' > /dev/null 2>&1 
     fi
     
     if [[ $line == *"standard3d"* ]]
     then
        aplay /usr/local/share/standard3d.wav &


     fi
     

  done

