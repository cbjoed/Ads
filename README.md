# Focus Timer

A dependency-free Pomodoro timer, task list, and Google AdSense placement preview designed for GitHub Pages.

## Google AdSense previews

The visible ad placements are disabled design previews. They do not load Google scripts or
request ads. Before enabling AdSense, add your approved `ca-pub-...` publisher ID and ad-unit
IDs, then replace each preview with the corresponding AdSense unit. Do not use placeholder IDs
in production.

## Deployment

GitHub Pages is deployed by `.github/workflows/deploy.yml`. In repository settings, set
**Pages** to **GitHub Actions**. The static site is served from `site/`.
