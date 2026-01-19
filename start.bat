@echo off
echo ========================================
echo QA Task Manager - Quick Start
echo ========================================
echo.
echo Refreshing environment variables...
echo.

REM Refresh PATH from registry
for /f "tokens=2*" %%a in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path 2^>nul') do set "SysPath=%%b"
for /f "tokens=2*" %%a in ('reg query "HKCU\Environment" /v Path 2^>nul') do set "UserPath=%%b"
set "PATH=%SysPath%;%UserPath%"

echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Node.js not found in PATH. Trying default location...
    set "PATH=%PATH%;C:\Program Files\nodejs"
)

node --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is still not accessible.
    echo.
    echo Please:
    echo 1. Close ALL PowerShell/CMD windows
    echo 2. Open a NEW PowerShell window
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)

echo Node.js found!
node --version
npm --version
echo.

echo ========================================
echo Installing Backend Dependencies...
echo ========================================
cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Installing Frontend Dependencies...
echo ========================================
cd client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Starting Servers...
echo ========================================
echo.
echo Starting backend on http://localhost:3001
start "Backend Server" cmd /k "cd /d %~dp0server && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend on http://localhost:3000
start "Frontend App" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ========================================
echo SUCCESS! Application is starting...
echo ========================================
echo.
echo Two windows opened:
echo   - Backend Server (localhost:3001)
echo   - Frontend App (localhost:3000)
echo.
echo Your browser should open automatically.
echo If not, go to: http://localhost:3000
echo.
pause
