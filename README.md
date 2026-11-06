# Akademi Linux website

Terminal-themed site for Akademi Linux, built with TypeScript, Vite, Tailwind CSS and a
Rust command shell compiled to WebAssembly. It deploys as static files to GitHub Pages.

## Setup

Requires Node 18+ and Rust, plus:

```bash
rustup target add wasm32-unknown-unknown
cargo install wasm-pack --locked
npm install
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Builds the WASM shell and starts the dev server |
| `npm run build` | Builds, type-checks and prerenders every route into `dist/` |
| `npm run preview` | Serves `dist/` with GitHub Pages behaviour, including real 404s |
| `npm test` | Runs the Rust shell tests |
| `npm run lint` | Runs ESLint |
| `npm run deploy` | Builds and publishes `dist/` to the `gh-pages` branch |

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which lints, tests, builds and
publishes `dist/` to the `gh-pages` branch. A failed check stops the deploy. You can also
start it by hand from the Actions tab, or publish from your machine with `npm run deploy`.

The site is served from `akademilinux.com`, set in `public/CNAME`. Keep that file, or a
deploy may clear the domain configured for GitHub Pages.

## Layout

- `crates/shell/`: commands, parser, autocomplete, route validation and prompt state
- `src/pages/`, `src/components/`: page HTML, also used by the build-time prerender
- `src/shell/`: command prompt, transitions and the `/discord` log
- `src/background/`: starfield
- `scripts/`: prerender and preview

Unfinished copy is written as `[BRACKETED]` placeholders. Search `src/` for `[` before launch.
