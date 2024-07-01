@echo off
set /p serverHost="Enter the server hostname: " 
start cmd /k node --max-old-space-size=512 . %serverHost%
exit
