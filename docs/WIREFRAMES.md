# Wireframes & UI-Design: Familien Hero

Dieses Dokument visualisiert die konzeptionellen Oberflächen der Anwendung "Familien Hero" in ihrem aktuellen Implementierungsstand. Der Fokus liegt auf einer intuitiven, spielerischen Benutzeroberfläche (Gamification) im "Glassmorphism"-Stil.

## 1. Dashboard (Hauptansicht)
Das Dashboard bietet eine schnelle Übersicht über alle relevanten Kennzahlen und Familienmitglieder.

```mermaid
graph TD
    subgraph "Screen: Dashboard"
        direction TB
        
        subgraph "Header / Navigation"
            H[Logo 'Familien Hero'] --- N[Icons: Home, CheckSquare, Star, User]
        end
        
        subgraph "Stats Grid (Kacheln)"
            direction LR
            S1[Offene Aufgaben: X]
            S2[Marlenes Super-Punkte ★<br/>Fortschrittsbalken]
            S3[API Status: Online]
            S1 --- S2 --- S3
        end
        
        subgraph "Helden der Familie"
            direction TB
            H1((S)) --- HT1["Stefan - Vater & Admin"]
            H2((A)) --- HT2["Alexandra - Mutter & Admin"]
            H3((M)) --- HT3["Marlene (8) - Kleine Heldin"]
        end
        
        Header --> Stats
        Stats --> Helden
    end
```

### Kern-Elemente:
- **Stats Grid:** Drei Kacheln für offene Aufgaben, den Punktestand des Kindes inkl. Fortschrittsbalken und den Backend-Verbindungsstatus.
- **Helden-Liste:** Eine Übersicht aller registrierten Familienmitglieder.
- **Glassmorphism:** Alle UI-Elemente nutzen halbtransparente Hintergründe mit Blur-Effekten.

---

## 2. Aufgaben-Übersicht (Tasks)
Eine Liste aller existierenden Aufgaben, aufgeteilt in offene und bereits erledigte Missionen.

```mermaid
graph TD
    subgraph "Screen: Helden-Aufgaben"
        direction TB
        
        A1[Header: Offene Aufgaben]
        
        subgraph "Task List (Open)"
            direction TB
            T1["Tisch decken<br/>10 ★ - Zugewiesen an: S"] --- B1["Button: Erledigt!"]
            T2["Müll rausbringen<br/>15 ★ - Zugewiesen an: M"] --- B2["Button: Erledigt!"]
        end
        
        A2["Header: Erledigte Missionen"]
        
        subgraph "Task List (Done)"
            direction TB
            T3["Hausaufgaben<br/>20 ★ - Erledigt"]
        end
    end
```

---

## 3. Aufgaben erstellen (TaskCreate)
Hier können Eltern (Admins) neue Aufgaben für die Kinder anlegen.

```mermaid
graph TD
    subgraph "Screen: Neue Mission erstellen"
        direction TB
        
        F1["Input: Was gibt es zu tun? (Titel)"]
        F2["Textarea: Details & Beschreibung"]
        
        subgraph "Auswahl: Zuständigkeit"
            R1("Stefan") --- R2("Alexandra") --- R3("Marlene")
        end
        
        F3["Slider/Input: Belohnung (Sterne)"]
        B["Button: Heldentat anlegen"]
        
        F1 --> F2 --> Auswahl --> F3 --> B
    end
```

---

## 4. Belohnungsshop (Rewards)
In diesem Bereich können die gesammelten Punkte "ausgegeben" werden.

```mermaid
graph TD
    subgraph "Screen: Belohnungs-Shop"
        direction TB
        
        P["Hero Stats: Dein aktuelles Sternen-Konto"]
        
        subgraph "Rewards Grid"
            direction LR
            R1["Icon 🎮<br/>1h Extra Nintendo<br/>Kosten: 50 ★<br/>Button: Einlösen"]
            R2["Icon 🍦<br/>Eis essen gehen<br/>Kosten: 100 ★<br/>Button: Eingelöst (Deaktiviert)"]
            R3["Icon 🧱<br/>Kleines LEGO Set<br/>Kosten: 600 ★<br/>Button: Einlösen (Deaktiviert falls Punkte < 600)"]
        end
    end
```

---

## 5. Profil & Helden-Wechsel (Profile)
Verwaltung des aktuellen Benutzers. Da Tablets oft geteilt werden, gibt es hier einen schnellen Profilwechsel (ähnlich Netflix).

```mermaid
graph TD
    subgraph "Screen: Profil"
        direction TB
        
        P1["Aktueller Held: Avatar, Name, Rolle, Sterne"]
        
        subgraph "Hero Switcher"
            direction TB
            S1["Stefan (Eltern)"]
            S2["Alexandra (Eltern)"]
            S3["Marlene (Kind) - ACTIVE"]
        end
        
        B[Button: Abmelden]
        
        P1 --> Switcher --> B
    end
```

---

## 6. Design-Vorgaben & UI-Tokens
- **Styling-Ansatz:** Reines CSS (Glassmorphism) ohne Tailwind, definiert in `index.css`.
- **Farbpalette:** 
  - Hintergrund: Dunkler Mesh-Gradient (Violett/Blau/Schwarz).
  - Primary: Indigo (`#6366f1`).
  - Secondary/Accent: Violett (`#8b5cf6`), Pink (`#ec4899`), Bernstein (`#f59e0b`).
- **Typography:** System-Fonts (`Inter`, `system-ui`) für maximale Performance und Lesbarkeit.
- **Komponenten:** Stark abgerundete Ecken (`border-radius: 20px`), subtile Rahmen (`border: 1px solid rgba(...)`) und Drop-Shadows.
