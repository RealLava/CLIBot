@echo off
set /p numBots="Enter the number of bots to start: "
set /p serverHost="Enter the server host: " 
echo Starting %numBots% bot(s)...
for /l %%i in (1,1,%numBots%) do (
    start cmd /k node --max-old-space-size=512 . %serverHost%
)
echo Clibot was loaded.
exit