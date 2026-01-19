@echo off
echo ========================================
echo QA Task Manager - Setup and Run
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please run: install-nodejs.bat
    echo.
    pause
    exit /b 1
)

echo Node.js found! Version:
node --version
echo.
echo NPM Version:
npm --version
echo.

echo ========================================
echo Step 1: Installing Backend Dependencies
echo ========================================
cd server
if not exist node_modules (
    echo Installing server dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install server dependencies
        pause
        exit /b 1
    )
) else (
    echo Server dependencies already installed.
)
cd ..

echo.
echo ========================================
echo Step 2: Installing Frontend Dependencies
echo ========================================
cd client
if not exist node_modules (
    echo Installing client dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install client dependencies
        pause
        exit /b 1
    )
) else (
    echo Client dependencies already installed.
)
cd ..

echo.
echo ========================================
echo Step 3: Starting the Application
echo ========================================
echo.
echo Starting backend server...
echo Backend will run on: http://localhost:3001
echo.
start "QA Task Manager - Backend" cmd /k "cd /d %~dp0server && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend...
echo Frontend will run on: http://localhost:3000
echo.
start "QA Task Manager - Frontend" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ========================================
echo Application Starting!
echo ========================================
echo.
echo Two new windows have opened:
echo   1. Backend Server (port 3001)
echo   2. Frontend App (port 3000)
echo.
echo The app should open in your browser automatically.
echo If not, open: http://localhost:3000
echo.
echo To stop the application:
echo   - Close both terminal windows
echo   - Or press Ctrl+C in each window
echo.
echo ========================================
pause
