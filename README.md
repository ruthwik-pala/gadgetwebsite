# GADGET360 — Premium Electronics & Accessories

A modern, premium clone of [gadget360india.com](https://www.gadget360india.com/) with an improved design and UX.

## Design Highlights

- **Dark tech aesthetic** — Deep blacks, teal accent (#00d4aa), minimal borders
- **Typography** — Syne (display) + Outfit (body) for a distinct, non-generic look
- **Animations** — Subtle floating orbs, smooth transitions, scroll cues
- **Layout** — Clean grid, responsive cards, clear hierarchy
- **Cart** — Slide-out drawer, persistent localStorage
- **Content** — Scraped About page, store locations, brand story

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Deploy to GitHub Pages

1. **Create a repo** on GitHub named `gadgetwebsite` (or update `base` in `vite.config.js` to match your repo name)

2. **Push the code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gadgetwebsite.git
   git push -u origin main
   ```

3. **Enable Pages:**
   - Repo → **Settings** → **Pages**
   - Source: **GitHub Actions**
   - Save

4. The workflow will run on every push to `main`. After it finishes, the site will be live at:
   **https://YOUR_USERNAME.github.io/gadgetwebsite/**
