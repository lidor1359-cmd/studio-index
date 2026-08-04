---
name: cinematic-project-gallery
description: Build a cinematic project portfolio gallery with large visual project entries, concise metadata, and direct links to live work. Use for agency, studio, film, architecture, or portfolio index pages.
---

# Cinematic Project Gallery

## Use when

The main goal is to let visitors explore several visual projects, then enter a project or case study.

## Required data

`number`, `name`, `category`, `year`, `location`, `summary`, `coverImage`, `url`, `status`.

## Build pattern

1. Render projects from one data collection; do not hardcode cards in several places.
2. Make each entire card a semantic link.
3. Use a large cover image, then show only essential metadata over it.
4. Keep the initial view focused on projects; move secondary studio information below the gallery.
5. Choose one intentional movement axis. For a cinematic archive, vertical entry (top → centre → bottom) often feels more natural than a side-to-side carousel.

## Responsive and accessible behavior

- Desktop: wide track or editorial grid.
- Mobile: vertical cards, visible summary, tap target at least 44px.
- Provide `alt` text, focus styles and `prefers-reduced-motion` support.
- Lazy-load covers outside the initial viewport.

## Validation

- Adding a project requires one data object.
- Every card opens the correct destination.
- Gallery works with keyboard, touch, mouse wheel and reduced motion.
