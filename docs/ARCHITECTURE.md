# Softwarearchitektur: Familien Hero

Dieses Dokument beschreibt die technische Struktur der "Familien Hero"-Anwendung nach dem **C4-Modell (Level 2: Container)**.

## 1. System-Kontext
Die Anwendung dient Familien zur Organisation von Aufgaben. Sie interagiert direkt mit den Familienmitgliedern und nutzt eine persistente Datenbank zur Speicherung von Zuständen.

## 2. Container-Diagramm (Level 2)

```mermaid
graph TB
    User((Familien-Mitglieder))
    
    subgraph "Web App Container"
        SPA[React Web SPA\n'Frontend']
    end
    
    subgraph "Server Container"
        API[Node.js / Express\n'REST API Server']
    end
    
    subgraph "Database Container"
        DB[(MongoDB\n'Datenspeicher')]
    end

    User -->|Benutzt / Interagiert mit| SPA
    SPA -->|HTTPS/JSON API Requests| API
    API -->|Mongoose Queries| DB
```

### Beschreibung der Container:
- **React Web SPA:** Die Single Page Application ist der primäre Einstiegspunkt für den Nutzer. Sie wird im Browser ausgeführt und verwaltet den UI-State sowie die Kommunikation mit dem Backend.
- **Node.js / Express API:** Das Backend validiert Anfragen, verarbeitet die Geschäftslogik (z.B. Punkteberechnung bei Aufgabenerledigung) und kommuniziert mit der Datenbank.
- **MongoDB:** Speichert persistent Nutzerdaten, Aufgaben-Definitionen, erledigte Aufgaben und den Punktestand.

## 3. Datenmodell (ER-Diagramm / UML)

```mermaid
classDiagram
    class User {
        +String name
        +String role (parent|child)
        +Number points
    }
    
    class Task {
        +String title
        +String description
        +Number pointsReward
        +String status (open|done)
        +ObjectId assignedTo
    }
    
    class Reward {
        +String title
        +Number cost
        +String icon
    }

    User "1" -- "0..*" Task : ist_zugewiesen
    User "1" -- "0..*" Reward : löst_ein
```

## 4. Technologie-Begründung
- **SPA (Single Page Application):** Gewährleistet eine flüssige Benutzererfahrung ohne ständiges Neuladen der Seite.
- **NoSQL (MongoDB):** Bietet die nötige Flexibilität für Dokumentstrukturen (Tasks, Users, Rewards).
- **Node.js / Port 5001:** Der Wechsel von Standard-Port 5000 auf 5001 erfolgte aufgrund von Port-Überschneidungen mit dem AirPlay-Receiver unter macOS.
- **End-to-End Type Safety:** Verwendung von TypeScript im gesamten Stack zur Reduzierung von Laufzeitfehlern.
