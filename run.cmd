@echo off
echo =======================================
echo Familien Hero - Start.Skript
echo =======================================
echo.

echo 1. Wechsle ins Backend...
cd backend

echo 2. Fuehre Seed-Skript aus (Testdaten laden)...
call npm run seed

echo 3. Starte Backend Server...
start "Familien Hero Backend" cmd /k "npm run dev"

echo 4. Wechsle ins Frontend...
cd ../frontend

echo 5. Starte Frontend Server...
start "Familien Hero Frontend" cmd /k "npm run dev"

echo.
echo =======================================
echo Erledigt! 
echo Das Backend laeuft nun in einem neuen Fenster.
echo Das Frontend laeuft in einem weiteren neuen Fenster.
echo Deine Applikation ist gleich erreichbar unter: http://localhost:5173
echo =======================================
pause
