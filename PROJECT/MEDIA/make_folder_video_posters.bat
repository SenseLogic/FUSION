if not exist "..\CODE\CLIENT\public\image\%1" mkdir "..\CODE\CLIENT\public\image\%1"
for %%f in (image\%1\*.mp4) do (
    %TOOL%\REMIX\remix %2 %TOOL%\FFMPEG\bin\ffmpeg -y -i "%%f" -frames:v 1 "image\%1\%%~nf_video_frame.png"
    %TOOL%\REMIX\remix %2 %TOOL%\UPSCAYL\upscayl-bin.exe -n upscayl-standard-4x -i "image\%1\%%~nf_video_frame.png" -w 3840 -o "image\%1\%%~nf_video_background.png"
)
