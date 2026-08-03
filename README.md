# WebForge

The central portfolio hub for the studio's web projects.

## Local preview

```bash
cd /Users/lidor/Projects/3d
python3 -m http.server 8600
```

Open `http://localhost:8600/studio-hub/`. Serving from the workspace root lets
the hub preview the existing project assets and open each project locally.

## Adding a project

1. Add its local and production destination to `projects.js`.
2. Add a card in `index.html`.
3. Use the shared project-switcher component in the new site once it is introduced.

The production links are intentionally easy to find in `projects.js`; update them after the final deployments exist.
