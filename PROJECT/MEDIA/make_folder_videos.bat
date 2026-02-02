if not exist "..\CODE\CLIENT\public\video\%1" mkdir "..\CODE\CLIENT\public\video\%1"
for %%f in (image\%1\*.mp4) do (
    %TOOL%\REMIX\remix %2 %TOOL%\FFMPEG\bin\ffmpeg -y -i "%%f" -vf scale=640:-2 -c:v libx264 -crf 30 -preset slow -c:a aac -movflags +faststart "..\CODE\CLIENT\public\video\%1\%%~nf.mp4.small.mp4"
    %TOOL%\REMIX\remix %2 %TOOL%\FFMPEG\bin\ffmpeg -y -i "%%f" -vf scale=1280:-2 -c:v libx264 -crf 30 -preset slow -c:a aac -movflags +faststart "..\CODE\CLIENT\public\video\%1\%%~nf.mp4.wide.mp4"
    %TOOL%\REMIX\remix %2 %TOOL%\FFMPEG\bin\ffmpeg -y -i "%%f" -vf scale=1920:-2 -c:v libx264 -crf 30 -preset slow -c:a aac -movflags +faststart "..\CODE\CLIENT\public\video\%1\%%~nf.mp4"
)
