# 🚀 Quick Start Guide - QA Task Manager

## ⚠️ Important: You Need a Fresh Terminal

Node.js was just installed, but the current PowerShell session doesn't have access to it yet.

## 📋 Follow These Steps:

### Step 1: Close This Terminal
Close the current PowerShell/terminal window you're using.

### Step 2: Open a NEW PowerShell Window
1. Press `Windows + X`
2. Select "Windows PowerShell" or "Terminal"

### Step 3: Navigate to the Project
```powershell
cd d:\Todo-APP
```

### Step 4: Run the Start Script
```powershell
.\start.bat
```

That's it! The script will:
- ✅ Install all backend dependencies
- ✅ Install all frontend dependencies
- ✅ Start the backend server (port 3001)
- ✅ Start the frontend app (port 3000)
- ✅ Open your browser automatically

---

## 🎯 Alternative: Manual Steps

If the script doesn't work, run these commands manually:

### Install Backend Dependencies
```powershell
cd d:\Todo-APP\server
npm install
```

### Install Frontend Dependencies
```powershell
cd d:\Todo-APP\client
npm install
```

### Start Backend Server (Terminal 1)
```powershell
cd d:\Todo-APP\server
npm run dev
```

### Start Frontend App (Terminal 2 - New Window)
```powershell
cd d:\Todo-APP\client
npm run dev
```

---

## 🌐 Access the App

Once both servers are running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

The app should open automatically in your browser!

---

## 🐛 Troubleshooting

**"npm is not recognized"**
- You need to open a NEW terminal window
- Node.js was just installed and needs a fresh session

**Port already in use**
- Close any existing Node processes
- Or change the port in the config files

**Dependencies won't install**
- Make sure you have internet connection
- Try running as Administrator

---

## 📞 Need Help?

If you encounter issues, let me know and I'll help you troubleshoot!
