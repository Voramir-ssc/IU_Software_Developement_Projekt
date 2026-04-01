#!/bin/bash
echo "======================================="
echo " Familien Hero - macOS Start-Skript 🚀"
echo "======================================="
echo

# Check for node
if ! command -v node &> /dev/null
then
    echo "❌ Fehler: Node.js wurde nicht gefunden. Bitte installieren Sie Node.js."
    exit 1
fi

echo "1. Wechsle ins Backend..."
cd backend || exit
echo "2. Fuehre Seed-Skript aus (Testdaten laden)..."
npm run seed

echo "3. Starte Backend Server in neuem Fenster..."
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npm run dev"'

echo "4. Wechsle ins Frontend..."
cd ../frontend || exit
echo "5. Starte Frontend Server in neuem Fenster..."
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npm run dev"'

echo
echo "======================================="
echo "Erledigt! ✅"
echo "Backend und Frontend wurden in neuen Fenstern gestartet."
echo "Deine Applikation ist gleich erreichbar unter: http://localhost:5173"
echo "======================================="
