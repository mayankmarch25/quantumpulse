# Quantum Pulse

Learning quantum from zero, in public. One core concept and the one piece of maths it needs, shown moving. New editions as the chapters get done, roughly every two weeks.

Plain GitHub Pages on its own account, separate from Healthcare Pulse. No domain, no DNS, no build step on your machine. An edition is one Markdown file.

## Deploy in 5 minutes

1. **Create the repo on the new account.** Name it exactly `YOUR-USERNAME.github.io` (the new account's GitHub username, then `.github.io`). Public. Upload every file and folder in this package to the repo root, keeping the folder structure, including the folders that start with an underscore.
2. **Edit one line.** In `_config.yml`, replace `YOUR-USERNAME` in `url:` with the new account's username. Leave `baseurl: ""` as it is.
3. **Turn on Pages.** Repo > Settings > Pages > Source: *Deploy from a branch* > Branch `main`, folder `/ (root)` > Save.
4. **Open the site.** In two or three minutes it is live at `https://YOUR-USERNAME.github.io/`.

If you would rather name the repo `quantum-pulse`, that also works: the site then lives at `https://YOUR-USERNAME.github.io/quantum-pulse/` and you set `baseurl: "/quantum-pulse"` in `_config.yml`. Every link is built from that value, so nothing else changes.

## Before the first post goes out

- Create the second LinkedIn newsletter and paste its URL into `linkedin_newsletter` in `_config.yml`. Until then the Subscribe buttons point to your LinkedIn profile.

## Folder structure

    .
    ├── _config.yml                 site settings: name, links, baseurl, publish day
    ├── _data/
    │   ├── plan.yml                the 28-stop journey (status, chapter, one-line gist); drives the homepage map
    │   └── glossary.yml            glossary entries; drives /glossary/
    ├── _drafts/
    │   └── edition-template.md     copy this to start an edition; drafts are never published
    ├── _includes/
    │   ├── head.html, header.html, footer.html
    │   └── figures/                the figure library: switch, coin, bloch, compare, pulse, amplitude (+ README)
    ├── _layouts/
    │   ├── default.html            site pages
    │   └── edition.html            editions: meta, title, body, share bar, previous/next
    ├── _pages/
    │   ├── about.md, archive.html, glossary.html, 404.html  (plan, maths, concepts now redirect to the homepage map)
    ├── _posts/
    │   └── 2026-11-10-a-bit-a-coin-and-a-qubit.md    Edition 1. Each edition is one file here.
    ├── assets/
    │   ├── img/profile.jpg         photo used on the homepage and About
    │   ├── css/style.css           design system and site pages
    │   ├── css/edition.css         edition typography and figure styles
    │   ├── js/site.js              theme toggle, menu, progress bar
    │   ├── js/hero.js              homepage: interference field and the qubit lab
    │   ├── js/edition.js           editions: section rail and reading progress
    │   └── js/figures.js           the engine behind every figure; editions need no script of their own
    ├── index.html                  homepage
    ├── logo.png, logo.svg
    ├── llms.txt, robots.txt, sitemap.xml
    ├── Gemfile, .gitignore
    ├── README.md                   this file
    └── HOW-TO-ADD-AN-EDITION.md    the per-edition routine

Editions publish at `/editions/<slug>/`. Pages publish at the permalink in their front matter.

## Weekly routine

See `HOW-TO-ADD-AN-EDITION.md`. Short version: write Markdown in `_drafts/`, move it to `_posts/` with a date, flip its row in `_data/plan.yml`, add glossary terms. Everything else rebuilds itself.

## Local preview (optional)

    gem install bundler
    bundle install
    bundle exec jekyll serve --drafts

Then open http://localhost:4000. Not required; GitHub Pages builds on every push.
