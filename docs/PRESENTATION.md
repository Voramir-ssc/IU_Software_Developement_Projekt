# 🎭 Präsentationsentwurf: Familien Hero

Dieses Dokument dient als Vorlage für Ihre Präsentation. Die Folien sind mit `---` getrennt und können direkt für Tools wie **Marp** (Markdown-to-Slides) genutzt oder in PowerPoint übertragen werden.

---

## Folie 1: Titelfolie
# Familien Hero
### Spielerische Haushaltsorganisation im SCRUM-Rahmen

* **GitHub-Repository:** *[GitHub-Link eintragen, z. B. https://github.com/voramir/IU_Software_Developement_Projekt]*
* **Prüfungsleistung:** Modul *DLBSEPPSD01_D – Projekt: Software Development*
* **Autor:** Stefan (voramir)
* **Hochschule:** IU Internationale Hochschule

---

## Folie 2: Problemstellung, Zielgruppe & Nutzen
### Warum "Familien Hero"?

* **Problemstellung:**
  * Ungerechte Aufgabenverteilung führt zu Alltagsfrust.
  * Fehlende extrinsische Motivation für Kinder, Aufgaben zu übernehmen.
  * Hoher *Mental Load* für Eltern durch ständige Ermahnungen.
* **Nutzergruppen:** Eltern (Administratoren) & Kinder (Helden).
* **Warum eine mobile Anwendung (Responsive Web SPA)?**
  * Haushaltsaufgaben finden überall im Haus statt.
  * Ein mobiles Endgerät (Küchentablet, Smartphone) ist direkt am Ort des Geschehens einsatzbereit.
  * Ermöglicht das direkte Eintragen und Bestätigen von Aufgaben ("Missionen") vor Ort.

*Referenz:* [CONCEPT.md: Problemstellung & Zielgruppen](file:///g:/VoramirGit/IU_Software_Developement_Projekt/docs/CONCEPT.md#L3-L16)

---

## Folie 3: Konzept & Wireframes
### Komponenten der Webanwendung & Wireframe-Konzept

* **Komponenten im UI:**
  * **Stats Grid:** Schnelle Übersicht über den Status (offene Aufgaben, Punktestand, API-Status).
  * **Helden-Liste (Netflix-Modell):** Visualisierte Profile zur leichten Rollen-Umschaltung.
  * **Task-Board:** Unterteilung in offene und erledigte Missionen.
  * **Belohnungsshop:** Kacheln mit Symbolen, Kosten in Sternen und Kauf-Aktionen.
* **Wireframes (Umsatz in CSS-Glassmorphism):**
  * Strukturierung durch halbdurchsichtige Panels, abgerundete Ecken und klare Farb-Badges.

![Dashboard Mockup](file:///g:/VoramirGit/IU_Software_Developement_Projekt/docs/assets/dashboard_mockup.png)
*(Das implementierte Dashboard im Glassmorphism-Design)*

*Referenz:* [WIREFRAMES.md](file:///g:/VoramirGit/IU_Software_Developement_Projekt/docs/WIREFRAMES.md)

---

## Folie 4: Softwarearchitektur & Backend-Konzeption
### C4-Modell (Level 2: Container) & Datenmodell

* **Gesamtarchitektur:**
  * **React Frontend (SPA):** Verwaltet State, Routing und Benutzer-Interaktion.
  * **Express Backend (API):** Verarbeitet REST-Anfragen, validiert Eingaben und berechnet Punkte.
  * **MongoDB Datenbank:** Persistiert Benutzer, Aufgaben und Belohnungen flexibel als NoSQL-Dokumente.
* **Datenmodell (ER/UML):**
  * `User` (1) ── (0..*) `Task` (ist_zugewiesen)
  * `User` (1) ── (0..*) `Reward` (löst_ein)

*Referenz:* [ARCHITECTURE.md](file:///g:/VoramirGit/IU_Software_Developement_Projekt/docs/ARCHITECTURE.md)

---

## Folie 5: Projektmanagement & Vorgehensmodell
### Warum SCRUM?

* **Begründung des Modells:**
  * **Iterative Entwicklung:** Ermöglichte die schrittweise Einführung von Features (Inkrementen).
  * **Anpassungsfähigkeit:** Schnelle UX-Anpassungen (z. B. Integration des Netflix-like Hero-Switch in Sprint 3).
  * **Präsentationsbereitschaft:** Die Web-App war nach jedem Sprint in einem stabilen, funktionsfähigen Zustand.
* **Sprint-Breakdown:**
  * **Sprint 1:** Setup & Basis-Dashboard (MERN-Stack).
  * **Sprint 2:** Aufgabenverwaltung & Sterne-Logik.
  * **Sprint 3:** Rollenspezifisches UI (Admin vs. Kind) & Hero-Switch.
  * **Sprint 4:** Refactoring, Test-Abdeckung & Dokumentation.

*Referenz:* [MANAGEMENT.md](file:///g:/VoramirGit/IU_Software_Developement_Projekt/docs/MANAGEMENT.md)

---

## Folie 6: Implementierung – Datenstrukturen
### Definition der TypeScript Interfaces im Frontend

```typescript
// Auszug aus frontend/src/types.ts
export interface User {
  _id: string;
  name: string;
  role: 'parent' | 'child';
  points: number;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  assignedTo: UserRef;
  pointsReward: number;
  status: 'open' | 'done';
}
```
* **Erklärung:** Typsicherheit stellt sicher, dass Rollen und Punkte zur Laufzeit nicht ungültig überschrieben werden.

*Referenz:* [types.ts](file:///g:/VoramirGit/IU_Software_Developement_Projekt/frontend/src/types.ts)

---

## Folie 7: Implementierung – Navigation & Routing
### Clientseitiges Routing im React-Framework

```tsx
// Auszug aus frontend/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
```
* **Erklärung:** Das Routing erfolgt clientseitig ohne Neuladen der Seite (typisch für eine Single Page Application). Die `Layout`-Komponente stellt die persistente Navigation bereit.

*Referenz:* [App.tsx](file:///g:/VoramirGit/IU_Software_Developement_Projekt/frontend/src/App.tsx)

---

## Folie 8: Implementierung – Dateneingabe & API-Kommunikation
### Aufgabenerstellung im Frontend (POST-Request)

```typescript
// Auszug aus frontend/src/pages/Tasks.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, pointsReward: points, assignedTo, status: 'open' })
  });
  if (res.ok) {
    setShowForm(false);
    setTitle('');
    fetchData(); // Aktualisiert die Aufgabenliste
  }
};
```
* **Erklärung:** Ein Formular sammelt Daten (`title`, `points`, `assignedTo`). Beim Absenden wird die REST-API im Backend via `fetch` asynchron angesprochen. Nach Erfolg wird die Liste neu geladen.

*Referenz:* [Tasks.tsx](file:///g:/VoramirGit/IU_Software_Developement_Projekt/frontend/src/pages/Tasks.tsx#L58-L71)

---

## Folie 9: Qualitätssicherung – Testabdeckung
### Backend Unit Tests mit Vitest

```typescript
// Auszug aus backend/src/logic.test.ts
describe('Punkte-Logik (Unit Tests)', () => {
  it('sollte Punkte korrekt abziehen, wenn genug vorhanden sind', () => {
    const currentPoints = 500;
    const cost = 200;
    const remaining = calculateRemainingPoints(currentPoints, cost);
    expect(remaining).toBe(300);
  });

  it('sollte einen Fehler werfen, wenn nicht genug Punkte vorhanden sind', () => {
    const currentPoints = 100;
    const cost = 200;
    expect(() => calculateRemainingPoints(currentPoints, cost)).toThrow('Nicht genug Punkte');
  });
});
```
* **Erklärung:** Das Kernfeature – die korrekte Verrechnung und Validierung von Sternenpunkten beim Kauf von Belohnungen – wird ohne Datenbankabhängigkeiten per Unit Tests abgesichert.

*Referenz:* [logic.test.ts](file:///g:/VoramirGit/IU_Software_Developement_Projekt/backend/src/logic.test.ts)

---

## Folie 10: Kritische Evaluation
### Wurden die Projektziele erreicht?

* **Inhaltliche Zielerreichung:**
  * Das spielerische Aufgabensystem motiviert nachweislich durch Gamification.
  * Das Rollensystem trennt erfolgreich Administratives (Eltern) von der Ausführung (Kinder).
* **Technische Zielerreichung:**
  * Umsetzung als performante SPA (React, Vite, Node.js, MongoDB).
  * Vollständig dokumentierte Endpunkte und Codekommentare.
  * Unit-Tests sichern Kernlogiken ab.
* **Zukünftige Verbesserungen:**
  * Integration von Push-Benachrichtigungen bei Aufgabenzuweisung.
  * Echtes Multi-User-Login mit Passwörtern anstelle des Demomodus (Hero-Switching).

*Referenz:* [EVALUATION.md](file:///g:/VoramirGit/IU_Software_Developement_Projekt/docs/EVALUATION.md)

---

## Folie 11: Lessons Learned & Persönliches Fazit
### Reflexion des Entwicklungsprozesses

* **Positive Erfahrungen:**
  * Das agile SCRUM-Vorgehen verhinderte "Feature Creep" und hielt den Fokus scharf.
  * Die Gestaltung eines modernen, responsiven CSS-Designs (Glassmorphism) ohne vorgefertigte Frameworks vertiefte das Styling-Verständnis.
* **Herausforderungen (Negativ/Lernfaktor):**
  * Betriebssystem-Eigenheiten (Port-Konflikt 5000 mit macOS AirPlay) erfordern flexible Konfigurationen (Umzug auf Port 5001).
* **Persönliche Entwicklung:**
  * Gestärktes Verständnis für Fullstack-TypeScript-Typisierung.
  * Erfahrung im Entwurf modularer API-Endpunkte und automatisierter Tests.
