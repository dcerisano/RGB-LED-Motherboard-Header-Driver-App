#!/usr/bin/env bash
# blinkstick --set-mode 0
# blinkstick --set-led-count 8

while true
do
    if [ $((RANDOM % 100)) -le 50 ]
    then
		blinkstick --duration $((RANDOM % 100 + 1)) --morph --index $((RANDOM % 8)) --limit  $((RANDOM % 64 + 1)) random
	else
		blinkstick --duration $((RANDOM % 100 + 1)) --morph --index $((RANDOM % 8)) 040100 
	fi
done