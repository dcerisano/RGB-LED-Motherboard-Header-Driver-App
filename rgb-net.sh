#!/bin/bash                                                                                                                                                                                                     


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
         curl -X GET 'http://kronos:8080?method=set_shader_req&shader=notifier&options.image=vrip.png' > /dev/null 2>&1 
     fi
     
     if [[ $line == *"standard3d"* ]]
     then
         curl -X GET 'http://kronos:8080?method=set_shader_req&shader=notifier&options.image=s3d.png' > /dev/null 2>&1 
     fi
     
          if [[ $line == *"rgbify"* ]]
     then
         curl -X GET 'http://kronos:8080?method=set_shader_req&shader=notifier&options.image=rgbify.png' > /dev/null 2>&1 
     fi
     
  done
