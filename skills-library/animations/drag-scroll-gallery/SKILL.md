---
name: drag-scroll-gallery
description: Add an accessible drag-to-explore interaction to a horizontal visual gallery while preserving links, wheel scrolling, touch scrolling, keyboard navigation, and reduced-motion behavior.
---

# Drag Scroll Gallery

## Use when

A desktop gallery benefits from tactile, editorial exploration beyond standard vertical scrolling.

## Build pattern

1. Enable only for `pointer: fine` screens.
2. Track pointer down, move and release; map horizontal pointer distance to `scrollLeft`.
3. Set a small movement threshold before treating a pointer action as a drag so card links still work.
4. Add a concise visible instruction such as “Drag to explore”.
5. Keep native touch scroll on mobile.

## Guardrails

- Do not trap vertical page scrolling.
- Do not trigger drag when `prefers-reduced-motion: reduce` is enabled.
- Never hide normal links behind the interaction.
- Use `requestAnimationFrame` for visual updates if needed.

## Validation

- Mouse drag moves the track without accidental navigation.
- Click still opens a card.
- Keyboard focus and wheel scrolling work.
- Mobile uses ordinary swipe/vertical behavior.
