# Quantum Pulse

Learning quantum from zero, in public. One core concept and the one piece of maths it needs, shown moving, every Tuesday.

Plain GitHub Pages on its own account, separate from Healthcare Pulse. No domain, no DNS, no build step on your machine. An edition is one Markdown file.

## Deploy in 5 minutes

1. **Create the repo on the new account.** Name it exactly `YOUR-USERNAME.github.io` (the new account's GitHub username, then `.github.io`). Public. Upload every file and folder in this package to the repo root, keeping the folder structure, including the folders that start with an underscore.
2. **Edit one line.** In `_config.yml`, replace `YOUR-USERNAME` in `url:` with the new account's username. Leave `baseurl: ""` as it is.
3. **Turn on Pages.** Repo > Settings > Pages > Source: *Deploy from a branch* > Branch `main`, folder `/ (root)` > Save.
4. **Open the site.** In two or three minutes it is live at `https://YOUR-USERNAME.github.io/`.

If you would rather name the repo `quantum-pulse`, that also works: the site then lives at `https://YOUR-USERNAME.github.io/quantum-pulse/` and you set `baseurl: "/quantum-pulse"` in `_config.yml`. Every link is built from that value, so nothing else changes.

## Before the first post goes out

- Create the second LinkedIn newsletter and paste its URL into `linkedin_newsletter` in `_config.yml`. Until then the Subscribe buttons point to your LinkedIn profile.
- Check `publish_day` in `_config.yml`.

## Folder structure

    .
    ├── _config.yml                 site settings: name, links, baseurl, publish day
    ├── _data/
    │   ├── tracks.yml              the 8 maths topics and 12 concepts with status; drives the tracker and both track pages
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
    │   ├── about.md, archive.html, maths.html, concepts.html, glossary.html, 404.html
    ├── _posts/
    │   └── 2026-11-10-a-bit-a-coin-and-a-qubit.md    Edition 1. Each edition is one file here.
    ├── assets/
    │   ├── css/style.css           design system and site pages
    │   ├── css/edition.css         edition typography and figure styles
    │   ├── js/site.js              theme toggle, menu, progress bar
    │   └── js/figures.js           the engine behind every figure; editions need no script of their own
    ├── index.html                  homepage
    ├── logo.png, logo.svg
    ├── llms.txt, robots.txt, sitemap.xml
    ├── Gemfile, .gitignore
    ├── README.md                   this file
    └── HOW-TO-ADD-AN-EDITION.md    the weekly routine

Editions publish at `/editions/<slug>/`. Pages publish at the permalink in their front matter.

## Weekly routine

See `HOW-TO-ADD-AN-EDITION.md`. Short version: write Markdown in `_drafts/`, move it to `_posts/` with a date, update two YAML files. Everything else rebuilds itself.

## Local preview (optional)

    gem install bundler
    bundle install
    bundle exec jekyll serve --drafts

Then open http://localhost:4000. Not required; GitHub Pages builds on every push.
