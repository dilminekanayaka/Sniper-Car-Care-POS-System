@echo off
echo 🔧 Starting Backend Server...
echo.
cd /d "%~dp0"
echo Checking database connection...
node test-db-connection.js
echo.
echo Starting server...
npm run dev
pause

