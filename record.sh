#!/bin/bash

VIDEO_SIZE="1280x720"
FRAMERATE="30"
VID="x11grab"
INPUT=":0.0"
ENCODER="libx264rgb"
CRF="18"
PRESET="ultrafast"
COLOR_RANGE="2"
FILENAME="output.mkv"

if ! [[ -z "$1" ]]; then FILENAME="$1"; fi

ffmpeg \
    -video_size "$VIDEO_SIZE" \
    -framerate "$FRAMERATE" \
    -f "$VID" \
    -i "$INPUT" \
    -c:v "$ENCODER" \
    -crf "$CRF" \
    -preset "$PRESET" \
    -color_range "$COLOR_RANGE" \
    "$FILENAME"
