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


#  Check if running as user service
   if [ "`systemctl --user is-active rgb-net`" = "active" ] 
     then
       echo ALERT: rgb-net user service is active
   fi


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
        curl -X GET 'http://praxis:8080?method=set_shader_req&shader=notifier&options.image=vrip.jpg' > /dev/null 2>&1 
     fi
     
     if [[ $line == *"standard3d"* ]]
     then
        aplay /usr/local/share/standard3d.wav &
        curl -X GET 'http://praxis:8080?method=set_shader_req&shader=notifier&options.image=s3d.jpg' > /dev/null 2>&1 
     fi
     
          if [[ $line == *"rgbify"* ]]
     then
        aplay /usr/local/share/rgbify.wav &
        curl -X GET 'http://praxis:8080?method=set_shader_req&shader=notifier&options.image=rgbify.jpg' > /dev/null 2>&1 
     fi
     
  done
