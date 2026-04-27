# DMS-App Core

Ein modernes Dokumenten-Management-System (DMS) auf Basis von Nuxt 3 und Supabase.

## 🎯 Ziel der App

Die App dient der effizienten Verwaltung, Speicherung und Kategorisierung von Dokumenten. Nutzer sollen in der Lage sein, Dateien hochzuladen, die dazugehörigen Metadaten in einer Datenbank zu speichern und die Dokumente über ein Dashboard zu verwalten.

## 🛠 Tech-Stack

- **Framework:** [Nuxt 3](https://nuxt.com/)
- **Frontend-Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Datenbank:** [Supabase](https://supabase.com/) (PostgreSQL & Storage)
- **Sprache:** TypeScript / Vue.js (Composition API)
- **Testing:** [Playwright](https://playwright.dev/)

## 🏗 Projekt-Struktur

- `pages/`: Enthält die Hauptansichten (Dashboard).
- `components/`: Wiederverwendbare UI-Elemente.
- `layouts/`: Grundgerüste für die Seitenstruktur.
- `tests/`: End-to-End Testdateien.
- `app.vue`: Haupteinstiegspunkt der Anwendung.

## 🚀 Features (geplant & integriert)

- [x] Grundlegendes Dashboard-Layout mit Tailwind CSS
- [x] Integration von `@nuxtjs/supabase`
- [x] Datenbank-Schema für Dokumenten-Metadaten
- [x] Datei-Upload in den Supabase Storage
- [x] Dokumentenvorschau und Download-Funktion
- [x] Filter- und Suchfunktionen für Dateien
- [x] E2E-Testing mit Playwright & GitHub Actions CI

## 🧪 Testing

Die Anwendung nutzt Playwright für End-to-End Tests. Der Webserver wird für die Tests automatisch auf Port 3000 gestartet.

### Test-Abdeckung (E2E)

- [x] Initiales Laden der App (Smoke Test)
- [x] Funktionalität des Suchfelds (User Input)
- [x] Anzeige des Empty-State (Suche ohne Treffer)
- [x] Validierung der Layout-Grundstruktur (Tailwind CSS Integration)
- [x] Vollständiger Datei-Upload-Flow (Mocking & Storage Check)
- [x] Dokumenten-Löschvorgang mit UI-Synchronisation
- [x] Download-Trigger & URL-Validierung

### ⚙️ Installation & Setup

1. Repository klonen

2. Abhängigkeiten installieren:

```bash

npm install

```

### Tests ausführen

```bash

npx playwright test

```
