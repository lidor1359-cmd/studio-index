---
name: restaurant-menu-showcase
description: Build a visual, image-led restaurant menu section with dish cards, categories, prices, and a clear menu action. Use for restaurant landing pages, hospitality sites, and food-product demos that need appetizing browsing on desktop and mobile.
---

# Restaurant Menu Showcase

Use this component when a few signature dishes should sell the restaurant before a full menu is needed.

## Structure

1. A short section label, oversized heading, and one-line sharing cue.
2. Three to five dish cards. Each card has an original/licensed image, category, dish name, and price.
3. Make one card visually dominant; keep the rest secondary.
4. End with one action: full menu, reservation, or order.

## Design rules

- Let food photography carry the surface; use a bottom gradient only for readable text.
- Keep each card's information to two lines plus price.
- Use a minimum 44px interactive target for the final action.
- On small screens, stack cards in a predictable reading order; never rely on hover to reveal key details.
- Use `object-fit: cover`, descriptive alt text, and avoid embedding text into images.

## Inputs

- `sectionLabel`, `heading`, `supportingLine`
- `dishes[]`: `category`, `name`, `price`, `image`, `alt`, `featured`
- `actionLabel`, `actionHref`

## Checks

- Prices, address, and availability must be clearly marked as demo content until verified.
- Check text contrast over every image and at 320px-wide mobile view.
- Verify keyboard focus and the action link.
