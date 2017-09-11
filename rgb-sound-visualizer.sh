#!/bin/bash
###############################################################################
#
# RGB CPU THRUSTER
#
#   Real-time sound volume meter for msi-rgb
#   D. Cerisano September 4, 2017
#   Follow msi-rgb build instructions in README
#
# Special Requirements:
#
#   ALSA (Pulse) Audio
#
# To test from your git repo:
#
#   sudo     ./rgb-sound-vumeter.sh &
#
# To run as autostarting system service (your system must support modern systemctl):
#
#   sudo cp ./rgb-sound-visualizer.service /etc/systemd/system
#   sudo cp ./target/release/msi-rgb       /usr/local/bin
#   sudo cp ./rgb-sound-visualizer.sh      /usr/local/bin
#   sudo systemctl enable rgb-sound-visualizer
#   sudo systemctl start  rgb-sound-visualizer
#
# Using the alsa mixer on your volume control while this script is running:
# Go to the Recording tab and choose:
#   ALSA Capture from Monitor of HD Audio , or:
#   ALSA Capture from Microphone
# Adjust recording and output levels to desired sensitivity.




# Sample Rate and Period Sizes
# Larger value increases sensitivity and CPU load.
  samplerate=2000 
# Smaller value increases sensitivity and CPU load.
  periodsize=100   

# RGB CONSTANTS
  r=00000000
  g=00000000
  b=00000000
  d=4
  
# Graceful exit: turn off RGB effect.
  trap 'USER=root; $rgb_driver 0 0 0 -p; exit 1' SIGINT SIGTERM EXIT

# Check if running as service
  rgb_driver="./target/release/msi-rgb"
  if [ "`systemctl is-active rgb-sound-visualizer`" = "active" ] 
    then
      echo ALERT: rgb-sound-visualizer service is active
      rgb_driver="/usr/local/bin/msi-rgb"
  fi

# This command outputs an endless stream of max peak volume levels to stderr 
# which are converted to RGB.

  (arecord -c 2 -d 0  -r $samplerate --period-size $periodsize -vvv) 2>&1 >/dev/null |

  while read line
  do
    echo $line
    # Look for max peak percentages
    if [[ $line == *[%]* ]]
    then
      line=${line: -3};
      line=${line:0:2};
    
      # Convert to hex brightness level
      line=$(echo $line/6.67+1|bc -l);
      int=${line%.*};
      s=$(printf '%x\n' $int);
  
      # White visualization
      r=$s$s$s$s$s$s$s$s
      g=$s$s$s$s$s$s$s$s 
      b=$s$s$s$s$s$s$s$s
      d=0
      $rgb_driver $r $g $b -d $d
    fi
  done