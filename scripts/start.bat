@echo off
REM Life Changing Journey App - Windows Quick Start

echo === Life Changing Journey App Setup ===

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Kill any existing processes
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im expo.exe >nul 2>&1

echo Starting Expo in offline mode to avoid remote update errors...
echo This prevents: java.io.IOException: Failed to download remote update

REM Clear cache and start offline
npx expo start --clear --offline --port 8081

echo.
echo Scan the QR code with Expo Go app on your phone
echo Or press 'w' for web browser (recommended for testing)
echo.
echo Note: Android emulator requires Android Studio setup
echo For now, use your phone with Expo Go or web browser
