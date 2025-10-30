@echo off
echo Killing existing Java processes...
taskkill /F /IM java.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Starting backend with fix...
cd insurance-backend-final
mvn spring-boot:run
pause
