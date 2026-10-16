# KABEER® — Private Archive 001

A responsive personal portfolio that blends automotive concept imagery, baroque gold chain corner ornaments, editorial typography and an interactive GitHub project archive.

## Features
- Responsive layout for desktop, tablet and phone
- Original baroque / chain-inspired gold cornerwork
- Cinematic automotive hero art and Kabeer's portrait
- Working mobile navigation, scroll progress and ignition toggle
- Live repository filters and project search (press `/` to focus search)
- Project dossier dialogs with links to public repositories
- Scroll-reveal motion that is an enhancement only; content stays visible if JavaScript is unavailable
- Reduced-motion support, keyboard focus states and no build step

## Deploy with GitHub Pages
1. Extract this ZIP.
2. Upload the **contents** of this folder to the root of your `kabeer-portfolio` repository, replacing `index.html`, `styles.css`, `script.js`, and `README.md`. Upload the complete `assets` folder too. Keep `index.html` at repository root.
3. Commit changes to the `main` branch.
4. In GitHub, open **Settings → Pages**. Confirm the source is **Deploy from a branch**, branch `main`, folder `/(root)`.
5. Wait for the latest deployment in **Actions** to finish, then hard-refresh the live page with `Ctrl + F5`.

Expected URL: https://kabeer13.github.io/kabeer-portfolio/

## Personalise
- Portrait: replace `assets/kabeer-portrait.jpg` but keep the same name.
- Hero image: replace `assets/hero-car.webp` but keep the same name and a wide aspect ratio.
- Projects: edit each `.project-card` in `index.html`. Keep links, descriptions and labels accurate. The Car Decision System is labelled as in development.
- Contact: public GitHub links are included. Add a public email address only if you want to share one.

This is plain HTML/CSS/JavaScript and does not need npm, a backend, API keys or a paid service.
