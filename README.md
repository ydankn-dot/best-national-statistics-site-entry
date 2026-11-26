# Meridia Statistics — National Statistics Office of Meridia

A national statistics site for the fictional country of Meridia, built for the
make.fun bounty “Make the best national statistics site”
(`best-national-statistics-site-20261126-0539`).

## What it is

Six sections, all reachable from the top navigation, all working offline from
the site's own files:

- **Overview** — headline figures for the reference year, population and GDP
  charts, an indicator search box, and the latest releases.
- **Population** — population by year, age structure, a sortable regional table
  (with CSV download), births and deaths.
- **Economy** — GDP trend, what makes up GDP, top exports.
- **Labour** — unemployment trend, jobs by sector.
- **Prices & living** — inflation by year, price change by spending group.
- **Sources & methods** — the publication behind every figure and how to read it.

Every figure names its source publication and reference year on the page where
it appears. The year picker at the top of every page updates all figures on
the page. Tables sort by clicking a column heading, and each table downloads
as CSV.

## Run it

```sh
node serve.ts          # serves app/ at http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with the vendored `vendor/makefun-frontend.ts` library.

## Files

- `app/index.html` — page shell and navigation
- `app/style.css` — the site's whole look
- `app/data.js` — all figures, with source and reference year
- `app/charts.js` — deterministic SVG bar, line and donut charts
- `app/views.js` — one renderer per section
- `app/main.js` — hash router, year picker, search, sorting, CSV export
- `main.ts` — the hand-in program
- `serve.ts` — local development server
- `screenshots/` — renders of the site in a browser (see `shots.json`)

Meridia is a fictional country; its figures are illustrative official-style
estimates, not figures of any real country.
