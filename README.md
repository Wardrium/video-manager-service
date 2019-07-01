#mkv 
mkv video files cannot be played in Chrome. Must convert to mp4 and extract subtitles.

Install ffmpeg:

`sudo apt-get install ffmpeg`

Convert video from mkv to mp4, without subtitles:

`ffmpeg -i input.mkv -c copy output.mp4`

Rip subtitle from mkv to vtt:

`ffmpeg -i input.mkv output.vtt`