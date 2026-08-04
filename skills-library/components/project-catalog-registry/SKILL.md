---
name: project-catalog-registry
description: Maintain a single project registry that automatically renders a portfolio archive and project menu. Use when adding a new website or landing page to WebForge.
---

# Project Catalog Registry

## Use when

Adding, removing or updating any project shown in WebForge.

## Workflow

1. Add one object to `project-registry.js`.
2. Provide `id`, `number`, `name`, `category`, `year`, `location`, `summary`, `image`, `alt`, `url` and `status`.
3. Verify the archive card, active readout and All Projects menu render the new item.
4. Use a compressed cover image and a public production URL.

## Guardrails

- Keep the registry as the one source of truth; do not duplicate project details in HTML.
- Use a stable unique `id` and sequential display `number`.
- Mark non-public projects as `coming-soon`; do not link to private deployments.
- Check mobile and desktop after every addition.
