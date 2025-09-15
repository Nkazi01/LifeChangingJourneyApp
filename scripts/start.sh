#!/bin/bash
# Life Changing Journey App - Quick Start Script

echo "=== Life Changing Journey App Setup ==="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# For the remote update error - start in offline mode
echo "Starting Expo in offline mode to avoid remote update errors..."
echo "This will prevent the java.io.IOException: Failed to download remote update"

# Kill any existing metro processes
pkill -f "expo" 2>/dev/null
pkill -f "metro" 2>/dev/null
pkill -f "node" 2>/dev/null

# Clear cache and start offline
npx expo start --clear --offline --port 8081

echo "Scan the QR code with Expo Go app on your phone"
echo "Or press 'w' for web browser (recommended for testing)"
echo ""
echo "Note: Android emulator requires Android Studio setup"
echo "For now, use your phone with Expo Go or web browser"
