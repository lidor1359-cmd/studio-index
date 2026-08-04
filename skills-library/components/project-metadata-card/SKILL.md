---
name: project-metadata-card
description: Create a reusable portfolio project card that combines a cover image, project title, category, year, location, status, short summary, and a direct project link.
---

# Project Metadata Card

## Use when

Displaying a single project inside an agency index, work archive, studio portfolio or case-study list.

## Required fields

- Cover image and useful alt text.
- Project name.
- Category and year.
- One supporting detail: location, status or client type.
- Destination URL.

## Build pattern

1. Use one link that wraps the image and content.
2. Keep title prominent; metadata should be compact and scannable.
3. Use a short summary for mobile and for projects that need additional context.
4. Make hover a progressive enhancement, never the only way to reveal essential information.

## Variants

- `wide`: featured first project.
- `portrait`: editorial secondary project.
- `coming-soon`: no external destination; use clear status and disabled behavior only when necessary.

## Validation

- Text remains legible over every cover image.
- Card works at 320px and on a large desktop screen.
- Hover/tilt effects do not apply on touch-only devices.
