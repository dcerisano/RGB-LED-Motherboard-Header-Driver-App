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
#   ./rgb-sound-visualizer.sh
#
#   IMPORTANT - CHOOSE AUDIO SOURCE (Music or Microphone)
#   Using the mixer on your volume control (while visualizer is running)
#   Go to the Recording tab and choose:
#     Capture from Monitor of HD Audio, or:
#     Capture from Microphone
#   Adjust volume levels to desired sensitivity (also important).
#   Test loop: https://soundcloud.com/nebogeo/midimutant-evolved-test-tones
#
# To run as auto-starting user service (your system must support modern systemctl):
#   
#   sudo cp ./rgb-sound-visualizer.service /etc/systemd/user
#   sudo cp ./target/release/msi-rgb       /usr/local/bin
#   sudo cp ./rgb-sound-visualizer.sh      /usr/local/bin
#   sudo chmod u+s /usr/local/bin/msi-rgb
#   systemctl --user enable rgb-sound-visualizer
#   systemctl --user start  rgb-sound-visualizer
#
# To stop user service:
#   systemctl stop rgb-sound-visualizer
#
# To disable user service:
#   systemctl disable rgb-sound-visualizer
#
#
###############################################################################
# Graceful exit: turn off RGB effect.
  trap 'USER=root; $rgb_driver 0 0 0 -p; exit 1' SIGINT SIGTERM EXIT

# Sound Constants
  samplerate=2000 # Larger value increases sensitivity and CPU load.
  periodsize=100  # Smaller value increases sensitivity and CPU load.

# RGB Header Constants  (loop of 8 rgb settings with configurable delay)
  r=00000000      # Default given here is an afterburner spectrum (amber to blue)
  g=00000000      # Note that the bytes are little endian, so: 
  b=00000000      # Expected curve of cdffedcb must be set as dcffdebc
  d=4             # Delay
  
  rgb_driver="./target/release/msi-rgb"  

# Check if running as user service
  if [ "`systemctl --user is-active rgb-sound-visualizer`" = "active" ] 
    then
      echo ALERT: rgb-sound-visualizer user service is active
      rgb_driver="/usr/local/bin/msi-rgb"
  fi

# MAIN LOOP
# This command outputs an endless stream of max peak volume levels to stderr 
# which are converted to RGB.

  (arecord -c 2 -d 0 -f S16_LE -r $samplerate --period-size $periodsize -vvv) 2>&1 >/dev/null |

  while read line
  do
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