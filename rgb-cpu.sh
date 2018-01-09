#!/bin/bash                                                                                                                                                                                                     
###############################################################################                                                                                                                                 
#                                                                                                                                                                                                               
# RGB CPU THRUSTER                                                                                                                                                                                              
#                                                                                                                                                                                                               
#   CPU load monitor with synchronized RGB & fan effect                                                                                                                                                         
#   D. Cerisano September 4, 2017                                                                                                                                                                               
#   Follow msi-rgb build instructions in README                                                                                                                                                                 
#                                                                                                                                                                                                               
# Special Requirements:                                                                                                                                                                                         
#                                                                                                                                                                                                               
#   Motherboard supported by github.com/nagisa/msi-rgb                                                                                                                                                          
#   fancontrol                                                                                                                                                                                                  
#     sudo apt install lm-sensors fancontrol                                                                                                                                                                    
#     sudo /sbin/modprobe nct6775 force_id=0xd120                                                                                                                                                               
#     sudo pwmconfig (use defaults and choose any CASE fan,  eg. hwmon0/pwm3)                                                                                                                                   
#                                                                                                                                                                                                               
# To build RGB driver:                                                                                                                                                                                          
#                                                                                                                                                                                                               
#    sudo apt install rustc cargo                                                                                                                                                                               
#    cargo --cargo build --release
#
# To test from your git repo:
#
#   sudo ./rgb-cpu.sh &
#
#   CPU stress test: https://jsfiddle.net/dcerisano/0b2yh78j/48/
#
# To run as auto-starting system service:
#
#   sudo cp ./rgb-cpu.service /etc/systemd/system
#   sudo cp ./target/release/msi-rgb   /usr/local/bin
#   sudo cp ./rgb-cpu.sh      /usr/local/bin
#   sudo systemctl enable rgb-cpu
#   sudo systemctl start  rgb-cpu
#   
# To stop system service:
#   sudo systemctl stop rgb-cpu
#
# To disable system service:
#   sudo systemctl disable rgb-cpu
#
###############################################################################

# Sleep mode only available when X user is logged in
export xuser=dcerisano
export DISPLAY=:0.0

sudo -u $xuser /home/dcerisano/.nvm/versions/node/v8.9.3/bin/node /home/dcerisano/node/node_modules/rgb-led-matrix/webserver/rgb_led_matrix_server.js &
# Graceful exit: turn off RGB effect and set fan to minimum.
  trap '$rgb_driver 0 0 0 -p; echo $pwm_min > $fan; exit 1' SIGINT SIGTERM EXIT

# Bounce fancontrol with reliable PWM driver as of 10/2017
  sudo systemctl stop fancontrol
  sudo /sbin/modprobe nct6775 force_id=0xd120
  sudo systemctl start fancontrol

# Fan Constants. Select a fan from /etc/fancontrol after running pwmconfig (do not select the CPU fan!)
  fan=/sys/class/hwmon/hwmon0/pwm3
#  fan=/sys/class/hwmon/hwmon1/device/pwm1
  pwm_min=85      # Minimum fan level
  pwm_step=12     # (16 cpu levels)*pwm_step+pwm_min = 255 (maximum fan level)

# RGB Super I/O Header Constants (loop of 8 rgb settings with configurable delay)
  r=edfedecd  # Default given here is an afterburner spectrum (amber at min to blue at max)
  g=12112132  # Note that the bytes are little endian, so:
  b=00000000  # Expected curve of cdffedcb must be set as dcffdebc
  d=4        # Delay (~ms*10) - note this loop is performed by SIO, not CPU
  
  rgb_driver="./target/release/msi-rgb"
    
# Check if running as service
  if [ "`systemctl is-active rgb-cpu`" = "active" ] 
    then
      echo ALERT: rgb-cpu system service is active
      rgb_driver="/usr/local/bin/msi-rgb"
  fi

# CPU Sampling Constant
samplerate=0.100 # seconds (100ms for initial testing)

# MAIN LOOP
  while :
  do
    # Sample total CPU load percentage every 100ms (returns a scaled floating point percentage)
    cpu=$(cat <(grep 'cpu ' /proc/stat) <(sleep $samplerate && grep 'cpu ' /proc/stat) | awk -v RS="" '{print (($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5))/6.5}' )
 
    # Convert float to one of 16 RGB hex brightness levels (0-F)
    int=${cpu%.*}
    
    c=$(printf '%x\n' $int) 
    
    # Sync fan to CPU load
    if [ "`systemctl is-active fancontrol`" = "active" ] 
      then
        echo $((0x$c*pwm_step+pwm_min)) > $fan
    fi
    
    b=$c$c$c$c$c$c$c$c
    
 
    # Sync RGB to CPU load and screen power management
    old_blank=$blank
    blank=$(sudo -u $xuser xset q)
    if [[ "$blank" != "$old_blank" ]]
      then
        if [[ $blank == *"Monitor is Off"* ]]  
          then 
          $rgb_driver 0 0 11111111  # Sleep mode
          curl -X GET 'http://dino:5000/?shader=aurora' > /dev/null 2>&1
        else
          curl -X GET 'http://dino:5000/?shader=cpu_meter' > /dev/null 2>&1
      fi
   fi

  
   if [[ $blank != *"Monitor is Off"* ]]  
      then 
        $rgb_driver $r $g $b -d $d  # Sync to CPU
   fi
  done
