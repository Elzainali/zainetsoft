# Elzain Ali — Portfolio-Website

Persönliche Portfolio-Website von **Elzain Ali** (Informatiker, Softwareentwicklung & PC-Hardware).
Die Seite dient als digitale Visitenkarte für Bewerbungen und zeigt technische Projekte,
Fähigkeiten und Kontaktmöglichkeiten in kompakter, professioneller Form.

🔗 **Live-Website:** über GitHub Pages abrufbar (Link nach Aktivierung siehe unten)

---

## Über dieses Projekt

Diese Website wurde bewusst **ohne Frameworks oder Build-Tools** umgesetzt — reines
HTML, CSS und JavaScript. Dadurch läuft sie direkt im Browser und kann ohne zusätzliche
Installation über GitHub Pages gehostet werden.

**Design-Konzept:** Ein dunkles, technisches "Datenblatt"-Layout, das die Fähigkeiten
des Nutzers wie einzelne Hardware-Komponenten präsentiert — passend zum praktischen
Hintergrund in PC-Hardware und Softwareentwicklung.

---

## Struktur

```
├── index.html          # Startseite (Hero, Über mich, Fähigkeiten, Projekte, Kontakt)
├── impressum.html       # Impressum gemäß § 5 DDG
├── datenschutz.html     # Datenschutzerklärung gemäß DSGVO
├── style.css            # Gesamtes Styling (Farben, Layout, Responsive Design)
├── script.js            # Interaktivität (Navigation, Scroll-Animationen, Theme-Umschalter)
└── images/              # Profilbild und weitere Bilddateien
```

---

## Funktionen

- **Vollständig responsiv** — getestet von 320px (kleine Mobilgeräte) bis 1920px (Desktop)
- **Hell-/Dunkelmodus** mit Speicherung der Auswahl (localStorage)
- **Barrierefreiheit**: semantisches HTML, Tastaturfokus, `prefers-reduced-motion` wird respektiert
- **Keine externen Abhängigkeiten**: keine Google Fonts, keine externen Skripte, kein Tracking
- **Rechtssicher für Deutschland**: eigene Seiten für Impressum und Datenschutzerklärung

---

## Rechtliche Hinweise

Diese Website erfüllt die rechtlichen Anforderungen für Websites in Deutschland:

- **Impressum** gemäß § 5 DDG (Digitale-Dienste-Gesetz, vormals TMG)
- **Datenschutzerklärung** gemäß DSGVO, inklusive Hinweisen zum Hosting über GitHub Pages
- Es werden **keine Cookies** und **kein Tracking** eingesetzt
- Alle Schriftarten sind Systemschriften — es erfolgt **keine externe Schriftart-Anfrage**
  (relevant für den Datenschutz, da so keine IP-Adressen an Drittanbieter wie Google Fonts
  übermittelt werden)

---

## Lokale Vorschau

Da keine Build-Tools notwendig sind, reicht es, `index.html` direkt im Browser zu öffnen.

Alternativ mit einem einfachen lokalen Server (empfohlen für korrektes Laden aller Dateien):

```bash
# Python
python3 -m http.server 8000

# oder mit VS Code: Erweiterung "Live Server" verwenden
```

Anschließend im Browser aufrufen: `http://localhost:8000`

---

## Veröffentlichung über GitHub Pages

1. Repository auf GitHub erstellen und alle Dateien hochladen (Push)
2. Unter **Settings → Pages** die Option **"Deploy from a branch"** wählen
3. Branch `main` und Ordner `/ (root)` auswählen, dann **Save**
4. Nach wenigen Minuten ist die Seite unter
   `https://<benutzername>.github.io/<repository-name>/` erreichbar

---

## Kontakt

**Elzain Ali**
📍 Ahnsbeck, Deutschland
📧 zainetsoftg@gmail.com
📞 (0177) 183 26 62

---

© 2026 Elzain Ali
