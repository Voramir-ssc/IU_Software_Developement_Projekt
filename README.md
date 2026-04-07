# Familien Hero – Projekt Software Development (DLBSEPPSD01_D)

Dieses Repository enthält die Fullstack-Webanwendung **"Familien Hero"**, entwickelt als Prüfungsleistung für das IU-Modul DLBSEPPSD01_D.

## 🚀 Über das Projekt
"Familien Hero" ist eine interaktive Single Page Application (SPA), die Familien dabei unterstützt, Haushaltsaufgaben spielerisch zu organisieren. Über ein Punktesystem (Gamification) werden insbesondere Kinder motiviert, Aufgaben zu übernehmen, während Eltern den Fortschritt im Dashboard verfolgen können.

### Hauptfunktionen
- **Drei Helden-Profile**: Stefan (Vater/Admin), Alexandra (Mutter/Admin) und Marlene (Kind/Held).
- **Hero-Switching**: Einfacher Wechsel zwischen den Profilen zur Demonstration der rollenbasierten UI.
- **Aufgabenverwaltung**: Erstellung, Zuweisung und Abschluss von Haushaltsaufgaben.
- **Belohnungssystem**: Einlösen gesammelter Sterne gegen vordefinierte Belohnungen.
- **LEGO-Fortschritt**: Visuelle Motivationshilfe speziell für das Kind-Profil.

### Tech-Stack (MERN)
- **Frontend:** React.js, TypeScript, Vite, React Router, Lucide Icons
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Testing:** Vitest (Frontend & Backend)

---

## 📂 Dokumentation
Die vollständige Projektdokumentation befindet sich im Verzeichnis `/docs`:
- [Projektkonzept (CONCEPT.md)](./docs/CONCEPT.md)
- [Softwarearchitektur (ARCHITECTURE.md)](./docs/ARCHITECTURE.md)
- [Wireframes (WIREFRAMES.md)](./docs/WIREFRAMES.md)
- [Projektmanagement (MANAGEMENT.md)](./docs/MANAGEMENT.md)
- [Evaluation (EVALUATION.md)](./docs/EVALUATION.md)

---

## 🛠 Setup & Start (Der schnellste Weg)

Stelle sicher, dass **Node.js** (>= 22) und **MongoDB** installiert sind und die MongoDB läuft.

### 1. Schnellstart über Skripte
Um Backend (inkl. Seeding) und Frontend gleichzeitig zu starten, nutze die bereitgestellten Skripte im Hauptverzeichnis:

- **macOS/Linux:**
  ```bash
  chmod +x run.sh
  ./run.sh
  ```
- **Windows:**
  ```cmd
  run.cmd
  ```

### 2. Manueller Start (Alternative)
Falls die Skripte nicht genutzt werden sollen:

- **Backend:** 
  ```bash
  cd backend && npm install
  npm run seed  # WICHTIG: Erstellt die Helden-Profile
  npm run dev   # Startet auf Port 5001 (Workaround für macOS AirPlay)
  ```
- **Frontend:**
  ```bash
  cd frontend && npm install
  npm run dev   # Erreichbar unter http://localhost:5173
  ```

> [!NOTE]
> Das Backend läuft standardmäßig auf **Port 5001**, da Port 5000 unter macOS häufig durch den AirPlay-Receiver blockiert wird.

---

## 🧪 Testen
Die Anwendung verfügt über eine automatisierte Testsuite.

- **Backend:** `cd backend && npm test`
- **Frontend:** `cd frontend && npm test`

---
**Autor:** Stefan (voramir)  
**Hochschule:** IU Internationale Hochschule  
**Modul:** DLBSEPPSD01_D – Projekt: Software Development
