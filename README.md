# Khushboo ♥ Lakhan — Wedding Invitation

A luxury Indian wedding invitation website for the wedding of **Khushboo & Lakhan**,
21–22 July 2026 at Jnanakshi Convention Hall, Hassan, Karnataka.

Pure static site — HTML, CSS, and vanilla JavaScript. No build step, no dependencies.

## Structure

```
index.html    — single-page invitation (hero, events, venue, family, card gallery, contact)
styles.css    — theme (ivory / gold / maroon / green palette)
script.js     — countdown, petals, scroll reveal, card lightbox
assets/       — original invitation card pages (JPEG)
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 5173
```

## Deploy on Vercel (via GitHub)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Other** — no build command, output directory is the repo root.
4. Click **Deploy**. Every push to `main` redeploys automatically.
