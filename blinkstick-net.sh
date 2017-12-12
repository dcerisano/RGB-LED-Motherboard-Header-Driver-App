#!/bin/bash
###############################################################################
#
# RGB SOUND VISUALIZER
#
#   Real-time sound volume meter for blinkstick
#   D. Cerisano September 4, 2017
#   Follow blinkstick build instructions in README
#
# Special Requirements:
#
#   Pulse Audio
#

# To test from your git repo: 
#
#   ./blinkstick-net.sh
#
# To run as auto-starting user service (your system must support modern systemctl):
#   
#   sudo cp ./blinkstick-net.service          /etc/systemd/user
#   sudo cp ./blinkstick-net.sh               /usr/local/bin
#   systemctl --user enable blinkstick-net
#   systemctl --user start  blinkstick-net
#
# To stop user service:
#   systemctl --user stop blinkstick-net
#
# To disable user service:
#   systemctl --user disable blinkstick-net
#
#
###############################################################################


# Graceful exit: turn off RGB effect.
  trap 'USER=root; $rgb_driver --set-led-count 8; exit 1' SIGINT SIGTERM EXIT

     # Delay (~ms*10) - note this loop is performed by SIO, not CPU
  
  rgb_driver="/usr/local/bin/blinkstick"  

  $rgb_driver --index 0 FFFFFF
  $rgb_driver --index 1 FFFFFF
  $rgb_driver --index 2 FFFFFF
  $rgb_driver --index 3 FFFFFF
  $rgb_driver --index 4 FFFFFF
  $rgb_driver --index 5 FFFFFF
  $rgb_driver --index 6 FFFFFF
  $rgb_driver --index 7 FFFFFF


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
        $rgb_driver --index 0 --pulse --duration 250 FF0000 &
     fi
     
     if [[ $line == *"standard3d"* ]]
     then
        aplay /usr/local/share/standard3d.wav &
        $rgb_driver --index 7 --pulse --duration 250 8888FF &

     fi
     
  done
