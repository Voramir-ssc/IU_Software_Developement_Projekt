# Projektmanagement: Vorgehensmodell SCRUM

Für die Entwicklung von "Familien Hero" wurde das **SCRUM-Modell** als iterativ-inkrementelles Vorgehensmodell gewählt. Dieses Dokument begründet die Auswahl und dokumentiert die Anwendung.

## 1. Begründung des Vorgehensmodells
Die Wahl von SCRUM wurde durch folgende Anforderungen der Aufgabenstellung motiviert:

- **Iterative Entwicklung:** Die Softwarelösung wurde in kurzen Zyklen (Sprints) entwickelt, um frühzeitig Feedback zu erhalten und das Produkt schrittweise zu verbessern. 
- **Anpassungsfähigkeit:** Da sich Anforderungen im Laufe eines Softwareprojekts (besonders bei UI/UX) ändern können, ermöglicht SCRUM eine schnelle Reaktion auf neue Prioritäten (z.B. der Wunsch nach "mehr als nur dem Dashboard").
- **Fokus auf Nutzerwert:** Jedes Inkrement liefert einen direkten Mehrwert für die Zielgruppe (Familien). 
- **Vergleich zu klassischen Modellen:** Ein lineares Wasserfallmodell wäre aufgrund der dynamischen Feedback-Schleifen während der Prototyperstellung weniger effizient gewesen.

## 2. Anwendung im Projekt (Auszug)

### Rollen:
- **Product Owner / Developer:** Stefan (Meister), vereint die Vision des Produkts mit der technischen Umsetzung.
- **Scrum Master:** In dieser Lernumgebung dient die Reflexion über die eigene Arbeitsweise als Scrum-Master-Proxy.

### Artefakte:
- **Product Backlog:** Eine priorisierte Liste aller gewünschten Features (z.B. Aufgaben-Erstellung, Belohnungs-System).
- **Sprint Backlog:** Aufgaben für den aktuellen Entwicklungszyklus (siehe `task.md` im Artifact-Verzeichnis).
- **Product Increment:** Eine funktionsfähige Version der SPA am Ende jedes Sprints.

### Zeremonien (Beispiel: Sprint 1):
- **Sprint Planning:** Auswahl der Kernfunktionen (Dashboard & Basis-API).
- **Daily Scrum:** Tägliche Überprüfung der Fortschritte und Hürden (z.B. Integration der MongoDB-Verbindung).
- **Sprint Review:** Vorstellung des Dashboards und Vergleich mit den ursprünglichen UI-Zielen.
- **Sprint Retrospective:** Reflexion über den Entwicklungsprozess (z.B. "Wie können wir TSX Watch effizienter nutzen?").

## 3. Zeitplan & Meilensteine
1. **Analysenphase:** Identifikation des Problems und der Nutzerbedürfnisse.
2. **Setup-Sprint:** Aufsetzen des MERN-Stacks und Grundlayout.
3. **Feature-Sprints:** Implementierung der Logik für Aufgaben und Belohnungen.
4. **Finalisierungs-Sprint:** Testing, Dokumentation und Vorbereitung der Präsentation.
