@echo off
title The Coffee Circle Menu Server
echo.
echo  Starting The Coffee Circle menu...
echo  Opening http://localhost:8123 in your browser...
echo  Close this window to stop the server.
echo.
node "%~dp0server.js"
pause
