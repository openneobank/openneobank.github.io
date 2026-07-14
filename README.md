# Open Neobank — [openneobank.io](https://openneobank.io)

The marketing site for **Open Neobank**, a free, open-source core banking
platform (ledger, payments, and compliance building blocks) that anyone will
be able to self-host and launch a bank on top of.

This repository is the **website** — a "coming soon" page while the core
banking software itself is being built in the open. The software will live in
its own repository under the [Open Neobank organization](https://github.com/openneobank).

## Stack

- [Jekyll](https://jekyllrb.com/) 4.x, static site, no build tooling beyond Ruby/Bundler
- Plain HTML/Liquid + Sass (`_sass/`), no CSS framework
- Self-hosted, latin-subset variable fonts (Inter, IBM Plex Mono) — no external font requests
- Deployed to [GitHub Pages](https://pages.github.com/) via GitHub Actions

## Local development

Requires Ruby (see `Gemfile.lock` for the version this was built against) and Bundler.

```sh
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`. Jekyll watches for
changes and rebuilds automatically.

To do a one-off production build:

```sh
bundle exec jekyll build
```

Output goes to `_site/`.

## Project structure

```
_config.yml        Site configuration (title, URLs, plugins)
_layouts/           Page templates
_includes/          Shared partials (nav, footer, head, logo mark)
_sass/              Design tokens and component styles, imported by assets/css/main.scss
assets/             Compiled CSS entry point, JS, fonts, images
index.html          Homepage ("coming soon")
privacy.html        Privacy Policy
terms.html          Terms & Conditions
404.html            Custom 404 page
_archive/           The fuller landing page (features, pricing, FAQ, etc.) from
                    before the project reverted to a "coming soon" page — kept
                    here, ignored by Jekyll's build, for whenever it's needed again
```

## Deployment

`.github/workflows/pages.yml` builds and deploys the site to GitHub Pages
whenever a version tag (`v*`) is pushed:

```sh
git tag v0.1.0
git push origin v0.1.0
```

It can also be run manually from the Actions tab (`workflow_dispatch`). The
custom domain is configured via the `CNAME` file at the repo root.

## License

MIT — see [LICENSE](LICENSE).
