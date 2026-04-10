@ECHO off
:: OpenSpec Smart Switcher (Batch/CMD)
:: 
:: INSTALLATION:
:: 1. Rename C:\Users\voothi\AppData\Roaming\npm\node_modules\@fission-ai\openspec -> openspec-stable
:: 2. Replace C:\Users\voothi\AppData\Roaming\npm\openspec.cmd with this file.
:: 3. Set USE_OPENSPEC_FORK=true to switch to local development mode.

SETLOCAL

:: Configuration
SET "STABLE_PATH=%~dp0node_modules\@fission-ai\openspec-stable\bin\openspec.js"
SET "FORK_PATH=U:\voothi\20260406202446-openspec\openspec-fork\bin\openspec.js"

:: Routing Logic
IF "%USE_OPENSPEC_FORK%"=="true" (
    SET "TARGET=%FORK_PATH%"
    ECHO [OPENSPEC] Mode: Local Fork (/dist-release)
) ELSE (
    SET "TARGET=%STABLE_PATH%"
)

:: Fallback Check
IF NOT EXIST "%TARGET%" (
    ECHO [ERROR] OpenSpec binary not found at: %TARGET%
    IF "%USE_OPENSPEC_FORK%"=="true" (
        ECHO [WARNING] Fork mirror missing, falling back to stable...
        SET "TARGET=%STABLE_PATH%"
    )
)

IF NOT EXIST "%TARGET%" (
    ECHO [CRITICAL] No OpenSpec binary found.
    EXIT /b 1
)

:: Execute
node "%TARGET%" %*
