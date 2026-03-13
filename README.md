# Familien Hero – Projekt Software Development (DLBSEPPSD01_D)

Dieses Repository enthält die Fullstack-Webanwendung **"Familien Hero"**, entwickelt als Prüfungsleistung für das IU-Modul DLBSEPPSD01_D.

## 🚀 Über das Projekt
"Familien Hero" ist eine interaktive Single Page Application (SPA), die Familien dabei unterstützt, Haushaltsaufgaben spielerisch zu organisieren. Über ein Punktesystem (Gamification) werden insbesondere Kinder (wie Marlene) motiviert, Aufgaben zu übernehmen, während Eltern den Fortschritt im Dashboard verfolgen können.

### Tech-Stack (MERN)
- **Frontend:** React.js, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Datenbank:** MongoDB (NoSQL)
- **Modellierung:** Mongoose
- **Vorgehensmodell:** SCRUM (iterativ-inkrementell)

---

## 🛠 Setup & Installation

Stelle sicher, dass **Node.js** (>= 22) und **MongoDB** auf deinem System installiert sind.

### 1. Repository klonen
```bash
git clone https://github.com/voramir/IU_Software_Developement_Projekt.git
cd IU_Software_Developement_Projekt
```

### 2. Backend vorbereiten
```bash
cd backend
npm install
# Erstelle eine .env Datei (Beispielwerte sind bereits in .env hinterlegt)
# MONGO_URI=mongodb://localhost:27017/familien-hero
```

### 3. Frontend vorbereiten
```bash
cd ../frontend
npm install
```

---

## 🏃‍♂️ Anwendung starten

Um die Anwendung Lokal zu testen, müssen sowohl das Backend als auch das Frontend gestartet werden.

### Schritt A: MongoDB starten
Stelle sicher, dass dein lokaler MongoDB-Service läuft:
```bash
brew services start mongodb-community@8.0
```

### Schritt B: Backend starten
Im Verzeichnis `/backend`:
```bash
npm run dev
```
Der Server läuft standardmäßig auf `http://localhost:5000`.

### Schritt C: Frontend starten
Im Verzeichnis `/frontend`:
```bash
npm run dev
```
Die Anwendung ist nun unter `http://localhost:5173` erreichbar.

---

## 🧪 Testen & Demo-Daten

Damit die App direkt mit echten Inhalten bespielt wird (Stefan, Alexandra und Marlene), kannst du das Seeding-Skript nutzen.

### 1. Testdaten laden (Seeding)
Im Verzeichnis `/backend`:
```bash
npm run seed
```
Dies leert die Datenbank und legt neue Test-Nutzer und Aufgaben an.

### 2. Unit-Tests ausführen
Ein beispielhafter Unit-Test für die Punkte-Logik kann wie folgt ausgeführt werden:
```bash
npx tsx src/test_demo.ts
```

---

## 📂 Projektstruktur
- `/frontend`: React SPA Quellcode & Assets.
- `/backend`: Node.js Express Server, Routen & MongoDB-Modelle.
- `/brain`: Konzept-Dokumentation, Wireframes und SCRUM-Protokoll (Artifacts).

---
**Autor:** Stefan (voramir)  
**Hochschule:** IU Internationale Hochschule  
**Modul:** DLBSEPPSD01_D – Projekt: Software Development
