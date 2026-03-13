@echo off
echo ==============================================
echo   Starting Rakshana 24/7 Application
echo ==============================================

echo [1] Starting Backend API Server (Port 5000)...
start cmd /k "cd backend && python run.py"

echo [2] Starting Frontend Local Server (Port 8000)...
start cmd /k "cd frontend && python -m http.server 8000"

echo [3] Opening Rakshana 24/7 in your browser...
timeout /t 3 > nul
start http://localhost:8000

echo ==============================================
echo   All services started!
echo   Close the newly opened CMD windows to stop.
echo ==============================================
pause
