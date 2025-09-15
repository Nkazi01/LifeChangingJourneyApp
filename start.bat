// Starting script for Life Changing Journey App with network connection handling
@echo off

title Life Changing Journey App Starter
echo ===================================
echo Life Changing Journey App Launcher
echo ===================================
echo.

:check_node
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Error: Node.js is not installed or not in PATH
  echo Please install Node.js from https://nodejs.org/
  pause
  exit /b 1
)

:check_dependencies
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if %ERRORLEVEL% NEQ 0 (
    echo Error installing dependencies.
    pause
    exit /b 1
  )
)

:menu
echo Choose a connection method:
echo 1. LAN mode (use on local network)
echo 2. Tunnel mode (best for hotspot)
echo 3. Offline mode (no internet needed)
echo 4. Exit
echo.

choice /c 1234 /n /m "Enter your choice (1-4): "

if %ERRORLEVEL% EQU 1 goto start_lan
if %ERRORLEVEL% EQU 2 goto start_tunnel
if %ERRORLEVEL% EQU 3 goto start_offline
if %ERRORLEVEL% EQU 4 goto :EOF

:start_lan
echo.
echo Starting app in LAN mode...
echo (Use this when your phone and computer are on the same WiFi network)
echo.
call npx expo start --lan
goto :EOF

:start_tunnel
echo.
echo Starting app in Tunnel mode...
echo (Best option for mobile hotspot connections)
echo.
call npx expo start --tunnel
goto :EOF

:start_offline
echo.
echo Starting app in Offline mode...
echo (App will use demo data only - no internet connection required)
echo.
call npx expo start --offline
goto :EOF
