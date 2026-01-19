@echo off
echo ========================================
echo Node.js Installation Helper
echo ========================================
echo.
echo This script will help you install Node.js
echo.
echo Step 1: Opening Node.js download page...
echo.

REM Try to open the Node.js download page
start https://nodejs.org/

echo.
echo ========================================
echo INSTRUCTIONS:
echo ========================================
echo.
echo 1. A browser window should open with nodejs.org
echo 2. Click the GREEN button that says "LTS" (Recommended for most users)
echo 3. The installer will download (node-vXX.X.X-x64.msi)
echo 4. Run the downloaded installer
echo 5. Follow the installation wizard:
echo    - Click "Next"
echo    - Accept the license agreement
echo    - Keep the default installation path
echo    - IMPORTANT: Make sure "Add to PATH" is checked
echo    - Click "Install"
echo 6. Wait for installation to complete
echo 7. Click "Finish"
echo.
echo After installation is complete:
echo 1. Close this window
echo 2. Open a NEW PowerShell window
echo 3. Run: node --version
echo 4. If you see a version number, Node.js is installed!
echo.
echo Then you can run the setup script: setup-and-run.bat
echo.
echo ========================================
pause
