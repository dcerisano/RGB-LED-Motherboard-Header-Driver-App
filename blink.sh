#!/usr/bin/env bash
#

while true
do
    if [ $((RANDOM % 100)) -le 50 ]
    then
		blinkstick --duration $((RANDOM % 100 + 1)) --morph --index $((RANDOM % 8)) --limit  $((RANDOM % 64 + 1)) random
	else
		blinkstick --duration $((RANDOM % 100 + 1)) --morph --index $((RANDOM % 8)) 080808 
	fi
done