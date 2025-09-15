Param(
  [switch]$Offline,
  [switch]$Hard
)

Write-Host '=== LifeChangingJourneyApp Cleanup Script ==='
$ErrorActionPreference = 'Stop'

function Step($msg){ Write-Host "`n>> $msg" -ForegroundColor Cyan }

# 1. Kill node / metro processes (quietly)
Step 'Stopping lingering node / metro processes'
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process expo -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# 2. Optional hard clean
if ($Hard){
  Step 'Removing node_modules and lock files'
  if (Test-Path node_modules){ Remove-Item -Recurse -Force node_modules }
  if (Test-Path package-lock.json){ Remove-Item -Force package-lock.json }
  if (Test-Path yarn.lock){ Remove-Item -Force yarn.lock }
}

# 3. Clear Expo caches
Step 'Clearing Expo & Metro caches folders if present'
$expoDir = Join-Path $env:LOCALAPPDATA 'Expo'
$expoCache = Join-Path $expoDir 'Cache'
$metroCache = Join-Path $env:LOCALAPPDATA 'Temp' | Join-Path -ChildPath 'metro-cache'
if (Test-Path $expoCache){ Remove-Item -Recurse -Force $expoCache }
if (Test-Path $metroCache){ Remove-Item -Recurse -Force $metroCache }

# 4. Reinstall dependencies when hard clean
if ($Hard){
  Step 'Installing npm dependencies'
  npm install
}

# 5. Doctor check
Step 'Running expo doctor'
if ($Offline){
  npx expo doctor --offline
} else {
  npx expo doctor
}

# 6. Start project (optionally offline)
Step 'Starting Expo'
if ($Offline){
  npx expo start --offline
} else {
  npx expo start
}

Write-Host '\nCleanup complete.' -ForegroundColor Green
