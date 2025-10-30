@echo off
color 0C
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║   CRITICAL: LOGIN FIX - BACKEND RESTART REQUIRED             ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo ⚠️  Backend MUST be restarted for login to work!
echo.
echo Changes made:
echo   ✅ Fixed AuthController - removed hardcoded admin check
echo   ✅ Fixed password hashes in data.sql
echo   ✅ Fixed database initialization
echo.
echo ┌───────────────────────────────────────────────────────────────┐
echo │ STEP 1: STOP BACKEND                                          │
echo └───────────────────────────────────────────────────────────────┘
echo.
echo Killing any running Java processes...
taskkill /F /IM java.exe 2>nul
timeout /t 3 /nobreak >nul
echo ✅ Backend stopped
echo.
echo ┌───────────────────────────────────────────────────────────────┐
echo │ STEP 2: START BACKEND WITH NEW DATA                           │
echo └───────────────────────────────────────────────────────────────┘
echo.
echo Starting backend...
echo.
start "Insurance Backend - FIXED" cmd /k "cd insurance-backend-final && echo Starting with fixed login... && mvn spring-boot:run"
echo.
echo ⏳ Waiting 30 seconds for backend to start...
timeout /t 30 /nobreak
echo.
echo ┌───────────────────────────────────────────────────────────────┐
echo │ STEP 3: TEST LOGIN                                            │
echo └───────────────────────────────────────────────────────────────┘
echo.
echo Testing vignesh login...
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"vignesh\",\"password\":\"vignesh2003\"}"
echo.
echo.
echo ┌───────────────────────────────────────────────────────────────┐
echo │ CREDENTIALS TO TEST                                            │
echo └───────────────────────────────────────────────────────────────┘
echo.
echo   1. admin / admin123
echo   2. john_doe / password
echo   3. jane_smith / password
echo   4. vignesh / vignesh2003
echo.
echo Open: http://localhost:4200
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║  If login still fails, check backend window for errors       ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
pause
