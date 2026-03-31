# Softwarearchitektur: Familien Hero

Dieses Dokument beschreibt die Architektur der "Familien Hero" Anwendung anhand eines simplen **C4-Container-Diagramms**. Es eignet sich optimal für die Präsentationsfolien.

## Systemarchitektur (Container)

Die Anwendung ist als klassische MERN-Stack (MongoDB, Express, React, Node.js) Webanwendung konzipiert.

```mermaid
C4Container
    title Container-Diagramm für Familien Hero

    Person(parent, "Eltern", "Elternteil, das Aufgaben erstellt und den Fortschritt kontrolliert")
    Person(child, "Kind", "Kind (z.B. Marlene), das Aufgaben abhakt um Punkte zu sammeln")

    System_Boundary(c1, "Familien Hero System") {
        Container(spa, "Single Page Application", "React, TypeScript, Vite", "Stellt die Benutzeroberfläche zur Verfügung. Holt und sendet Daten via API.")
        Container(api, "API Application", "Node.js, Express", "Stellt Endpunkte für Aufgaben und Benutzerpunkte bereit. Implementiert die Business-Logik.")
        ContainerDb(db, "Database", "MongoDB", "Speichert Nutzer, Aufgaben und die gesammelten Punkte.")
    }

    Rel(parent, spa, "Weist Aufgaben zu und betrachtet den Status", "HTTPS")
    Rel(child, spa, "Hakt Aufgaben ab, checkt Punkte", "HTTPS")
    
    Rel(spa, api, "Liest/Schreibt Daten via JSON", "HTTPS/REST")
    Rel(api, db, "Liest/Schreibt persistente Daten", "Mongoose/TCP")
```

## Komponentenübersicht (Frontend)

Die Vue/React Applikation wurde im Sinne einer besseren Wartbarkeit strukturiert:

```mermaid
graph TD
    App[App.tsx<br/><i>State & API Fetching</i>] --> Header[Header.tsx<br/><i>UI & Profil</i>]
    App --> StatsGrid[StatsGrid.tsx<br/><i>Dashboard KPIs & Punkte</i>]
    App --> TaskList[Task-Container]
    TaskList --> TaskItem[TaskItem.tsx<br/><i>Einzelne Aufgabe & Action logic</i>]
```
