@echo off
set /p serverHost="Enter the server host: " 
start cmd /k node --max-old-space-size=512 . %serverHost%
exit
