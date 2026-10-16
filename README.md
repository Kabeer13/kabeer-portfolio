# Kabeer — Private Archive 001

A custom, responsive personal portfolio combining Italian luxury-editorial art direction, original gold chain / baroque corner ornaments, automotive concept imagery, and an interactive GitHub project archive.

## Features

- Cinematic intro sequence with a skip control
- Custom generated automotive hero image
- Original ornamental gold chain corner SVGs (no fashion-house logos)
- Kabeer's portrait in an editorial frame
- Scroll reveal, progress bar, hover spotlight, subtle desktop tilt and parallax
- Interactive ignition toggle
- Searchable and filterable project archive with accessible project dossier dialogs
- Direct public GitHub links
- Responsive mobile navigation and reduced-motion support
- Pure HTML, CSS and JavaScript: no build step required

## Run locally

Open `index.html` directly in a browser, or use a simple local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy on GitHub Pages

1. Upload the *contents* of this folder to the root of a public repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, branch `main`, folder `/(root)`, then save.
4. Wait for the Pages workflow to finish and open the URL shown in Settings → Pages.

The site is designed for the project path `https://Kabeer13.github.io/kabeer-portfolio/`. Relative asset paths are used so the same files can also be served from a different project path.

## Personalise

- Portrait: replace `assets/kabeer-portrait.jpg` with your own image, keeping the filename.
- Automotive hero: replace `assets/hero-car.webp` with another image of similar wide aspect ratio, keeping the filename.
- Project cards: update the project `<article>` elements in `index.html`. Keep each repository URL accurate and descriptions grounded in the actual code.
- Contact: add an email or professional profile in the Contact section if you want one displayed publicly. Do not publish a phone number or home address.

## Notes

- Repository details are curated fallback content, so the archive does not break if an external API is unavailable.
- Only public repository links are included. The Car Decision System is clearly labelled as in development, not a completed public repository.
- Animations respect `prefers-reduced-motion` and the layout is responsive for smaller screens.
