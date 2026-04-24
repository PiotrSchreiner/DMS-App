# DMS-App Core

Ein modernes Dokumenten-Management-System (DMS) auf Basis von Nuxt 3 und Supabase.

## 🎯 Ziel der App

Die App dient der effizienten Verwaltung, Speicherung und Kategorisierung von Dokumenten. Nutzer sollen in der Lage sein, Dateien hochzuladen, die dazugehörigen Metadaten in einer Datenbank zu speichern und die Dokumente über ein Dashboard zu verwalten.

## 🛠 Tech-Stack

- **Framework:** [Nuxt 3](https://nuxt.com/)
- **Frontend-Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Datenbank:** [Supabase](https://supabase.com/) (PostgreSQL & Storage)
- **Sprache:** TypeScript / Vue.js (Composition API)

## 🏗 Projekt-Struktur

- `pages/`: Enthält die Hauptansichten (Dashboard).
- `components/`: Wiederverwendbare UI-Elemente.
- `layouts/`: Grundgerüste für die Seitenstruktur.
- `app.vue`: Haupteinstiegspunkt der Anwendung.

## 🚀 Features (geplant & integriert)

- [x] Grundlegendes Dashboard-Layout mit Tailwind CSS
- [x] Integration von `@nuxtjs/supabase`
- [x] Datenbank-Schema für Dokumenten-Metadaten
- [x] Datei-Upload in den Supabase Storage
- [x] Dokumentenvorschau und Download-Funktion
- [ ] Filter- und Suchfunktionen für Dateien

## ⚙️ Installation & Setup

1. Repository klonen
2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
