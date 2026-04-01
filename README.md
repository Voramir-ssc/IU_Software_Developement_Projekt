# Familien Hero – Projekt Software Development (DLBSEPPSD01_D)

Dieses Repository enthält die Fullstack-Webanwendung **"Familien Hero"**, entwickelt als Prüfungsleistung für das IU-Modul DLBSEPPSD01_D.

## 🚀 Über das Projekt
"Familien Hero" ist eine interaktive Single Page Application (SPA), die Familien dabei unterstützt, Haushaltsaufgaben spielerisch zu organisieren. Über ein Punktesystem (Gamification) werden insbesondere Kinder (wie Marlene) motiviert, Aufgaben zu übernehmen, während Eltern den Fortschritt im Dashboard verfolgen können.

### Tech-Stack (MERN)
- **Frontend:** React.js, TypeScript, Vite, React Router, Lucide Icons
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Testing:** Vitest (Frontend & Backend)
- **Vorgehensmodell:** SCRUM (iterativ-inkrementell)

---

## 📂 Dokumentation & Konzept
Die vollständige Projektdokumentation befindet sich im Verzeichnis `/docs`:

- [Projektkonzept (CONCEPT.md)](./docs/CONCEPT.md) – Problemstellung, Nutzerrollen & Vorteile.
- [Softwarearchitektur (ARCHITECTURE.md)](./docs/ARCHITECTURE.md) – C4-Modell & Datenmodell.
- [Wireframes (WIREFRAMES.md)](./docs/WIREFRAMES.md) – UI-Entwürfe & Mockups.
- [Projektmanagement (MANAGEMENT.md)](./docs/MANAGEMENT.md) – Begründung von SCRUM & Protokoll.
- [Evaluation (EVALUATION.md)](./docs/EVALUATION.md) – Lessons Learned & Reflexion.

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

### Schritt A: MongoDB starten
Stelle sicher, dass dein lokaler MongoDB-Service läuft:
```bash
brew services start mongodb-community@8.0
```

### Schritt B: Backend starten (inkl. Seeding)
Im Verzeichnis `/backend`:
```bash
npm run seed  # Testdaten (Nutzer, Aufgaben, Belohnungen) laden
npm run dev   # Server starten auf http://localhost:5000
```

### Schritt C: Frontend starten
Im Verzeichnis `/frontend`:
```bash
npm run dev   # App erreichbar unter http://localhost:5173
```

---

## 🧪 Testen
Die Anwendung verfügt über eine automatisierte Testsuite für Frontend und Backend.

### Backend Tests ausführen
Im Verzeichnis `/backend`:
```bash
npm test
```

### Frontend Tests ausführen
Im Verzeichnis `/frontend`:
```bash
npm test
```

---
**Autor:** Stefan (voramir)  
**Hochschule:** IU Internationale Hochschule  
**Modul:** DLBSEPPSD01_D – Projekt: Software Development
