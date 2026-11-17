# Portfolio Website — Market Research & Content Guide (Nov 2026)

## The one fact that shapes everything

**People don't read portfolios — they skim them.**

- In a Presentum study, 16 design hiring managers reviewed 243 applications. They took **~55 seconds** on average to decide on interview vs. no (portfolio + cover letter together). Only ~3% got a unanimous "yes".
- Resume studies show a first scan of **~7–11 seconds**. If something catches their eye, they spend **1–3 minutes**. In tech, 51% of hiring managers say they spend 1–3 minutes on a resume.
- One 2026 report (Muzli) says **~78% of recruiters use AI screening tools** before a human looks. This figure comes from a vendor blog, so treat it as a rough number. Even so, the takeaway holds: use clear text, structure and keywords, not text locked inside images.

So the site has two jobs:
1. **In 10 seconds**, show who you are, what you do, and the role you want.
2. **In 2 minutes**, prove it with 3–4 strong projects that show *impact*.

---

## What the best portfolios do (patterns seen across 2026 roundups)

| Pattern | Why it works | Examples |
|---|---|---|
| A specific headline, not "Creative Professional" | Recruiters search for titles and skills | "Software Engineer — building data tools for manufacturing" |
| **3–5 projects only** | They read 1–2 projects; more than 5 dilutes your best ones | Brittany Chiang shows only 4 featured projects |
| **Case studies, not galleries** | Hiring managers want to see your thinking, and what changed because of your work | Josh W. Comeau: what he built, the hard part, what he'd change |
| **Numbers in results** | "Cut boot time 32%" is believable and easy to remember | Microsoft engineer's "Spoor" project page |
| Live demo + code links | Employers want to see things that actually work, not just repos | Most developer portfolios |
| Short, grouped skills (not 40 logos) | A long list of buzzwords makes none of them believable | — |
| Resume PDF + contact visible everywhere | It's the main action you want them to take | — |
| Fast (<2s), works on a phone | Recruiters often review on their phones | — |
| Being honest about AI use | In 2026, hiding AI use reads worse than stating it | — |

**Things that hurt you:** putting a skills list ahead of your projects, tutorial clone projects (todo apps, weather apps), vague titles, old work, broken links, a missing resume, and slow animated intros.

**How to stand out visually:** see the design section below.

---

## What to put on your site (in this order)

### 1. Hero (first screen) — must answer "who, what, for whom" ✅
- Name + **specific role title**
- One sentence: what you build/do and for whom (include 1 number if you can)
- Availability line: "Open to: Senior Backend roles · Munich / Remote"
- 2 buttons: **View my work** and **Download resume**
- Links: LinkedIn, GitHub, email

### 2. Selected work — 3 to 4 case studies ✅ (most important section)
For each project:
- **Title + one-line summary**
- **The problem** — what was wrong, and for whom
- **My role** — what *you* did (solo? lead? team of 5?)
- **Approach** — 2–3 key decisions and why you made them
- **Result** — numbers: % faster, € saved, users, hours saved, uptime
- **Stack** — specific tools (e.g. "React, TypeScript, PostgreSQL", not "web")
- **What I'd do differently** — shows maturity
- Links: live demo / code / write-up
- Aim for 500–600 words if it's a full case study page

> Work projects under NDA: describe the problem and result in general terms, and blur or recreate screenshots. Don't share confidential data.

### 3. Experience — short timeline ✅
Role, company, dates, and **1–3 impact bullets each** (not a list of duties).

### 4. Skills — grouped and honest ✅
Group them, e.g. Languages / Frameworks / Cloud & Tools / Domain. Only list what you'd be comfortable being interviewed on.

### 5. About — short and human ✅
3–5 sentences: your path, what you care about, 1 personal detail. Add a real photo — it builds trust.

### 6. Optional extras (add only if strong)
- Testimonials/quotes from managers or clients
- Writing / talks / open-source contributions
- Certifications (only relevant ones)
- "Now" line (what you're learning or building right now)

### 7. Contact ✅
Email (clickable), LinkedIn, GitHub, and a one-line invitation. No long forms.

---

## Technical checklist
- [ ] `<title>` = "Your Name — Your Role" (not "Home")
- [ ] Meta description + Open Graph image (for link previews on LinkedIn/Slack)
- [ ] Structured data (JSON-LD `Person`) so search engines and AI tools understand you
- [ ] All text is real HTML text (not inside images)
- [ ] Loads in under 2s; images compressed (WebP, under 200 KB each)
- [ ] Works on a phone; good contrast; keyboard accessible
- [ ] Custom domain (`yourname.com` / `.dev`, ~€10–15/yr)
- [ ] Free hosting: **GitHub Pages**, **Netlify**, **Vercel** or **Cloudflare Pages**
- [ ] Keep LinkedIn & GitHub updated too. Recruiters search LinkedIn more than Google, so the site supports those profiles rather than replacing them.

## Before you publish — check
- [ ] Every link works (demo, code, resume, LinkedIn)
- [ ] Resume PDF matches the site
- [ ] Ask one friend to look for 10 seconds and say what you do. If they can't, rewrite the hero.

---

## Design research — what award-winning portfolios do (2026)

**What Awwwards winners have in common** (Jesper Landberg, Lama Lama, Bruno Simon, Minh Pham, Lando Norris / OFF+BRAND):
- **One bold interaction beats ten effects.** One standout mechanic is more memorable than many generic ones. WebGL and 3D are used for atmosphere, not as the main show.
- **A strong art direction tied to the subject**, plus motion that has a reason to exist.
- **Performance is judged too:** winners hold ~60fps on a mid-range phone.

**2026 trends, and what we did with them**

| Trend | Status in 2026 | Used here? |
|---|---|---|
| Bento grid with interactive tiles | The most widely adopted layout | ✅ Work section: tiles respond to the pointer and open case studies |
| Kinetic typography with variable fonts | Popular, best used once, in the hero | ✅ The name "boots up" on load, and letters swell under the cursor |
| Interactive canvas or WebGL background | Award-winner staple | ✅ A sensor-dot grid reacts to the cursor |
| Scroll-driven animation (native CSS) | Rising | ✅ The experience timeline rail fills as you scroll |
| Dark mode as the default | Common | ✅ Dark is the default, with a light "blueprint" theme |
| Fade-in on every section, scroll-jacking, AI stock images | **Fading, reads as templated** | ❌ Avoided |
| Brutalism, raw expressive type | Emerging for portfolios | Partly: oversized type |

**The design concept: "grounded"**
Your projects share one idea: AI should show its evidence (citation-validated answers in Cartographer, observe-only guidance in ScoutAI, typed tools in AutoForms). The design is built on that idea:
- **Hero = an embedding space.** The cursor is a query vector, and its nearest skills light up with retrieval lines and highlighted labels, like top-k retrieval. This is the one bold interaction. On phones, the query wanders by itself, and you can drag to steer it.
- **Citations on numbers.** Benchmark numbers carry a small blue citation box that links to the source report.
- **Colours:** evidence-paper `#f4f5f2`, citation blue `#2443e0` (links, retrieval), highlighter yellow `#ffe45c` (retrieved evidence). There's also a dark theme.
- **Type:** one variable font, **Archivo**. The name "boots up" from narrow to wide on load.
- **Real data in the visuals:** the AutoForms tile charts the actual benchmark tokens. The others show ScoutAI's checklist, Cartographer's call graph and EmbedLab's vectors.
- **Restraint and accessibility:** no fade-in on every section. Reduced motion is respected, keyboard focus is visible, and the canvas pauses when off screen.

**Design sources**
- [Awwwards — Portfolio winners](https://www.awwwards.com/websites/winner_category_portfolio/)
- [10 Best Award-Winning Websites of 2026 (Judged by a Juror) — hontran.dev](https://www.hontran.dev/blog/best-award-winning-websites-2026)
- [Award-Winning Websites: 14 Examples (2026) — hireadrian.com](https://hireadrian.com/award-winning-websites/)
- [Bento grids and kinetic typography — B12](https://www.b12.io/resource-center/website-design/web-design-guide-bento-grids-and-kinetic-typography/)
- [Web Design Trends 2026: Reality Check — StudioMeyer](https://studiomeyer.io/en/blog/webdesign-trends-2026-reality-check)
- [Web Design Trends 2026 — Line25](https://line25.com/articles/web-design-trends-2026/)
- [Modern Website Design 2026 — spoko.space](https://spoko.space/blog/modern-website-design-trends/)

---

## Sources
- [UX Portfolio Playbook: What Recruiters Actually Look For in 2026 — uxfolio](https://blog.uxfol.io/ux-portfolio-playbook/)
- [How to Make Your Portfolio Stand Out to Recruiters — Seera](https://myseera.com/blog/portfolio-stand-out-to-recruiters)
- [GitHub vs Portfolio Website: What Tech Recruiters Check — Job200](https://www.job200.com/blog/github-vs-personal-portfolio-website-what-tech-recruiters-actually-check)
- [How to Build a UX Portfolio That Gets You Hired (2026) — Muzli](https://muz.li/blog/how-to-build-a-ux-portfolio-that-actually-gets-you-hired-2026/)
- [Developer Portfolio Guide 2026 — Hakia](https://hakia.com/skills/building-portfolio/)
- [Portfolio SEO Guide 2026 — TailorCV](https://thetailorcv.com/blog/portfolio-seo-guide)
- [21 Best Developer Portfolio Websites (2026) — Colorlib](https://colorlib.com/wp/developer-portfolios/)
- [10 Best Developer Portfolio Examples — Portfolio Studio](https://portfoliostudio.dev/blog/best-developer-portfolio-examples)
- [Best Developer Portfolio Examples (2026) — DEV Community](https://dev.to/_d7eb1c1703182e3ce1782/best-developer-portfolio-examples-2026-2d8m)
- [How hiring managers evaluate portfolio and resume — Presentum](https://presentum.io/design/hiring-explained/evaluating-portfolio-and-resume)
- [A hiring manager will spend 6 seconds on your portfolio — UX University](https://newsletter.uxuniversity.io/p/a-hiring-manager-will-spend-6-seconds)
- [Survey: How Much Time Do Recruiters Spend On A Resume? — ResumeGo](https://www.resumego.net/research/how-much-time-spend-resume/)
- [2024 Hiring Trends Report — Resume Genius](https://resumegenius.com/blog/job-hunting/hiring-trends-survey)

*Note: many of these sources are blogs from companies that sell portfolio or resume tools, so the statistics are directional, not rigorous.*
