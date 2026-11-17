# Suman Saurav — Portfolio

A fast, single-page portfolio in plain HTML/CSS/JS. There's no build step and no framework.
For why it's structured this way, see [PORTFOLIO-RESEARCH.md](PORTFOLIO-RESEARCH.md).

## Files
| File | What it is |
|---|---|
| `index.html` | All the content. Edit the text here (look for `✏️ EDIT` comments) |
| `styles.css` | The look. Colours and fonts are set in the variables at the top |
| `script.js` | Sensor-dot hero, kinetic name, theme toggle, case-study panels, live clock (change the time zone in the "Live clock" section) |
| `assets/` | Put `resume.pdf`, `photo.webp`, `project-1.webp`… and `og-image.png` (1200×630) here |

## Still to do
1. **Photo:** done (`assets/profile.webp`, cropped from `Downloads/profile.png`). To change it, replace that file with a square image.
2. **Add a link-preview image:** `assets/og-image.png` (1200×630). A screenshot of the hero works well.
3. **Optional:** swap a tile's drawing for a real screenshot by replacing the contents of its `.tile-visual` with `<img src="assets/…" alt="">`.
4. When the resume changes, replace `assets/Suman_Saurav_Resume.pdf` (keep the same name).

## Editing content
- Each project has a **tile** in the bento grid and a matching `<dialog class="case">` panel with the full case study.
- The hero's skill words live in `CLUSTERS` in `script.js`. Each group is one topic area.
- Numbers with a small blue box are citations. Keep linking each number to its source.

## Preview locally
```bash
python -m http.server 8080
```
Then open http://localhost:8080

## Publish for free
- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop. It's live in about 30 seconds.
- **GitHub Pages:** push to a repo called `<username>.github.io`. It will be live at that address.
- **Cloudflare Pages / Vercel:** connect the repo. No build command is needed.

Then buy a domain (`yourname.dev`, about €12/yr) and point it at the host.
