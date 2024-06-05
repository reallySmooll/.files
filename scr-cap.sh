#!/bin/bash

ffmpeg \
          -video_size 1920x1080 \
          -framerate 30 \
          -f x11grab \
          -i :0.0 \
          -f pulse \
          -i bluez_output.41_42_D6_87_97_3C.1.monitor \
          -c:v libx264 \
          -vf scale=1280x720 \
          -crf 0 \
          -movflags \
          -faststart \
          -preset ultrafast \
          -color_range 2 \
          output.mkv
