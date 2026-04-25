@echo off
set NODE="C:\Program Files\nodejs\node.exe"
set NPM="C:\Program Files\nodejs\npm.cmd"

start "Backend - DO NOT CLOSE" cmd /k "%NODE% C:\Users\squae\portfolio\server\index.js"
timeout /t 3 /nobreak >nul
start "Frontend - DO NOT CLOSE" cmd /k "set PATH=C:\Program Files\nodejs;%PATH% && cd /d C:\Users\squae\portfolio\client && %NPM% run dev"

echo.
echo Both servers started!
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo DO NOT close the two black windows that opened.
pause
