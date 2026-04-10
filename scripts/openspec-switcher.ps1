#!/usr/bin/env pwsh
<#
.SYNOPSIS
    OpenSpec Smart Switcher (PowerShell)
    
.DESCRIPTION
    Intelligently routes 'openspec' calls between a stable global install and a local development mirror.
    
.INSTALLATION
    1. Rename C:\Users\voothi\AppData\Roaming\npm\node_modules\@fission-ai\openspec -> openspec-stable
    2. Replace C:\Users\voothi\AppData\Roaming\npm\openspec.ps1 with this file.
    3. Set $env:USE_OPENSPEC_FORK = "true" to switch to local development mode.
#>

$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent
# 1. Stable version path (requires renaming original folder to openspec-stable)
$stablePath = "$basedir/node_modules/@fission-ai/openspec-stable/bin/openspec.js"

# 2. Local Fork Mirror path
$forkPath = "U:/voothi/20260406202446-openspec/dist-release/bin/openspec.js"

if ($env:USE_OPENSPEC_FORK -eq "true") {
    $target = $forkPath
    # Optional: Log the switch so you know what version you are running
    Write-Host "[OPENSPEC] Mode: Local Fork (/dist-release)" -ForegroundColor Yellow
} else {
    $target = $stablePath
}

# 3. Fallback verification
if (-not (Test-Path $target)) {
    if ($env:USE_OPENSPEC_FORK -eq "true") {
        Write-Warning "Local fork mirror not found at $forkPath. Falling back to Stable..."
        $target = $stablePath
    }
    
    if (-not (Test-Path $target)) {
        Write-Error "Critical: OpenSpec binary not found. Please check your installation paths."
        exit 1
    }
}

# --- Execution ---
$ret=0
if (Test-Path "$basedir/node$exe") {
  if ($MyInvocation.ExpectingInput) {
    $input | & "$basedir/node$exe" $target $args
  } else {
    & "$basedir/node$exe" $target $args
  }
  $ret=$LASTEXITCODE
} else {
  if ($MyInvocation.ExpectingInput) {
    $input | & "node$exe" $target $args
  } else {
    & "node$exe" $target $args
  }
  $ret=$LASTEXITCODE
}
exit $ret
