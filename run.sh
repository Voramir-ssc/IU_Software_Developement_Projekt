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

# Go to the script's directory
cd "$(dirname "$0")" || exit

echo "1. Wechsle ins Backend..."
cd backend || exit

echo "1.5. Starte lokale In-Memory-Datenbank in neuem Fenster..."
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npx tsx src/start-db.ts"'
sleep 5

echo "2. Fuehre Seed-Skript aus (Testdaten laden)..."
npm run seed

echo "3. Starte Backend Server in neuem Fenster..."
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npm run dev"'

echo "4. Wechsle ins Frontend..."
cd ../frontend || exit
echo "5. Starte Frontend Server in neuem Fenster..."
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && npm run dev"'

echo
echo "⏳ Warte auf Backend-Verfügbarkeit (http://127.0.0.1:5001)..."
MAX_RETRIES=15
COUNT=0
while ! curl -s http://127.0.0.1:5001/api/health > /dev/null; do
    if [ $COUNT -ge $MAX_RETRIES ]; then
        echo "⚠️  Backend scheint noch offline zu sein. Bitte überprüfe die Fehlermeldungen im Backend-Fenster."
        break
    fi
    echo -n "."
    sleep 2
    COUNT=$((COUNT + 1))
done

echo
echo "======================================="
echo "Erledigt! ✅"
echo "Backend und Frontend wurden gestartet."
echo "Deine Applikation ist erreichbar unter: http://localhost:5173"
echo "======================================="
