@echo off
color 0A
cls
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║   INSURANCE MANAGEMENT SYSTEM - COMPLETE STARTUP             ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo This will:
echo   1. Kill any running Java/Node processes
echo   2. Start Backend on port 8080
echo   3. Start Frontend on port 4200
echo.
echo ┌───────────────────────────────────────────────────────────────┐
echo │ STEP 1: Cleanup                                               │
echo └───────────────────────────────────────────────────────────────┘
echo.
echo Stopping any running processes...
taskkill /F /IM java.exe 2>nul
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo ✅ Cleanup complete
echo.
echo ┌───────────────────────────────────────────────────────────────┐
echo │ STEP 2: Starting Backend                                      │
echo └───────────────────────────────────────────────────────────────┘
echo.
echo Starting backend on port 8080...
start "Insurance Backend" cmd /k "cd insurance-backend-final && echo Starting backend... && mvn spring-boot:run"
echo.
echo ⏳ Waiting 40 seconds for backend to start...
timeout /t 40 /nobreak
echo.
echo Testing backend...
curl -s http://localhost:8080/api/statistics/dashboard >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is running!
) else (
    echo ❌ Backend may not be ready yet. Check the backend window.
)
echo.
echo ┌───────────────────────────────────────────────────────────────┐
echo │ STEP 3: Starting Frontend                                     │
echo └───────────────────────────────────────────────────────────────┘
echo.
echo Starting frontend on port 4200...
start "Insurance Frontend" cmd /k "cd insurance-frontend-angular && echo Starting frontend... && ng serve --open"
echo.
echo ┌───────────────────────────────────────────────────────────────┐
echo │ SYSTEM INFORMATION                                             │
echo └───────────────────────────────────────────────────────────────┘
echo.
echo   Backend:  http://localhost:8080
echo   Frontend: http://localhost:4200
echo   H2 Console: http://localhost:8080/h2-console
echo.
echo   Login Credentials:
echo   - admin / admin123
echo   - john_doe / password
echo   - jane_smith / password
echo   - vignesh / vignesh2003
echo.
echo ┌───────────────────────────────────────────────────────────────┐
echo │ TROUBLESHOOTING                                                │
echo └───────────────────────────────────────────────────────────────┘
echo.
echo   If backend fails:
echo   - Check backend window for errors
echo   - Read: BACKEND-NOT-STARTING.md
echo   - Ensure Java 17+ is installed
echo.
echo   If frontend fails:
echo   - Check frontend window for errors
echo   - Run: npm install
echo   - Ensure Node.js is installed
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║  Applications starting... Check the new windows! 🚀          ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
pause
