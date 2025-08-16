@echo off
echo Starting Meeting Summarizer Application...

echo.
echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Development Server...
start cmd /k "cd frontend/meeting-summarizer && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul