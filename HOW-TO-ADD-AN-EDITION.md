# How to add an edition

One Markdown file. No HTML pages, no stubs.

## 1. Write it in `_drafts/`

Copy `_drafts/edition-template.md` to `_drafts/your-slug.md` and write. Drafts are never published, so you can commit work in progress. The file is plain Markdown; figures are one-line includes from the library in `_includes/figures/` (see the README there for every figure and its options).

Front matter to fill in:

    title: "Clean title, no edition number"
    description: "One to two sentences. Card text, archive line, link preview."
    edition: N
    category: Core concepts            (or Required maths, Computing, Communication, Sensing)
    tags: [Computing]
    maths: [Topic]                     (the maths topics used, matching names in _data/tracks.yml)
    read_time: 10
    next_title: "Edition N+1: ..."     (shown as a teaser until that edition exists)
    summary: [three lines]             "In one breath" box at the top
    outcomes: [two or three lines]     "By the end you can" box
    terms: [Term, Term]                chips linking to the glossary
    remember: [three lines]            "Three things to remember" box at the end

## 2. Publish it: move it to `_posts/` with a date

Rename to `_posts/YYYY-MM-DD-your-slug.md`. The date is the day you publish it; the slug becomes the URL: `/editions/your-slug/`. Previous and next links, the homepage card, the archive, the tracker count and the sitemap all update on their own.

## 3. Mark the plan: `_data/plan.yml`

Find the edition’s row (inside its part), set `status: published`, add `url: /editions/your-slug/`, and set the following row to `status: next`. The plan page reads from this.

## 4. Add terms: `_data/glossary.yml`

One entry per new term, tagged `ED. N`. Change any `NOT YET COVERED` tag the edition resolves.

Commit and push. GitHub Pages rebuilds in about a minute.

## Writing rules

- No symbol before the picture it describes. The maths box sits at the bottom, after the figures that motivate it.
- Every figure moves or responds. If it cannot, it is a table, not a figure.
- Mistakes are corrected in place with a dated line at the bottom of the edition, never quietly patched.

## Adding a new kind of figure

Create `_includes/figures/<name>.html` with `data-fig="<name>"` on its outer div and `data-role` attributes on the parts the script needs. Add an initialiser under that name in `assets/js/figures.js`. From then on every edition can use it with one include line.
