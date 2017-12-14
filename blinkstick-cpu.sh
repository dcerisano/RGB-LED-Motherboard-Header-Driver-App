#!/bin/bash
###############################################################################
#
# BLINKSTICK CPU THRUSTER
#
#   CPU load monitor with synchronized RGB & fan effect
#   D. Cerisano September 4, 2017
#
# Special Requirements:
#
#   Blinkstick flex or pro usb rgb controller
#   fancontrol
#     sudo apt install lm-sensors fancontrol
#     sudo /sbin/modprobe nct6775 force_id=0xd120
#     sudo pwmconfig (use defaults and choose any CASE fan,  eg. hwmon0/pwm3)
#
# To install blinkstick driver
#   sudo apt-get install python-pip
#   sudo pip install --upgrade pip
#   sudo pip install blinkstick
#   sudo blinkstick --add-udev-rule
#    sudo reboot
#
# To test from your git repo:
#
#   CPU stress test: https://jsfiddle.net/dcerisano/0b2yh78j/48/
#
# To run as auto-starting system service:
#
#   sudo cp ./blinkstick-cpu.service /etc/systemd/system
#   sudo cp ./blinkstick-cpu.sh      /usr/local/bin
#   sudo systemctl enable blinkstick-cpu
#   sudo systemctl start  blinkstick-cpu
#   
# To stop system service:
#   sudo systemctl stop blinkstick-cpu
#
# To disable system service:
#   sudo systemctl disable blinkstick-cpu
#
###############################################################################

  rgb_driver="/usr/local/bin/blinkstick"

# Graceful exit: turn off RGB effect and restore fancontrol.
  trap '$rgb_driver --set-led-count 8; exit 1' SIGINT SIGTERM EXIT

# Bounce fancontrol with reliable PWM driver as of 10/2017
#  sudo systemctl stop fancontrol
#  sudo /sbin/modprobe nct6775 force_id=0xd120
#  sudo systemctl start fancontrol

# Fan Constants. Select a fan from /etc/fancontrol after running pwmconfig (do not select the CPU fan!)
  fan=/sys/class/hwmon/hwmon1/device/pwm1
#  fan=/sys/class/hwmon/hwmon1/device/pwm1
  pwm_min=50      # Minimum fan level
  pwm_step=7     # (16 cpu levels)*pwm_step+pwm_min = 255 (maximum fan level)

  rgb_driver="/usr/local/bin/blinkstick"

  $rgb_driver --set-led-count 8 # clear all leds

# CPU Sampling Constant
  samplerate=0.100 # seconds (100ms for initial testing)


# MAIN LOOP
  old_led=0
  new_led=0
  while :
  do
    led_off=$(( RANDOM % 8 ))
    led_on=$(( RANDOM % 8 ))

    if [ $((RANDOM % 100)) -le 90 ]
    then
      color=804000
    else
      color=random
    fi

    # Sample total CPU load percentage every 100ms (returns a scaled floating point percentage)
    cpu=$(cat <(grep 'cpu ' /proc/stat) <(sleep $samplerate && grep 'cpu ' /proc/stat) | awk -v RS="" '{print (($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5))/6.5}' )

    # Convert float to one of 16 RGB hex brightness levels (0-F)
    int=${cpu%.*}

    c=$(printf '%x\n' $int) 

    # Sync RGB to CPU load
    if [ $c -le 1 ]
    then # idle
      if [ $((RANDOM % 100)) -le 50 ]
      then
        $rgb_driver --duration $((RANDOM % 500)) --morph --index $led_off 000000
      else
        $rgb_driver --duration $((RANDOM % 500)) --morph --index $led_on --limit 96 $color
      fi
    else # load
      $rgb_driver --index $led_on $c$c$c$c$c$c 
    fi
    # Sync fan to CPU load
    if [ "`systemctl is-active fancontrol`" = "active" ] 
    then
      echo $((0x$c*pwm_step+pwm_min)) > $fan
    fi

  done
