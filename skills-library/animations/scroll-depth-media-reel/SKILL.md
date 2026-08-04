---
name: scroll-depth-media-reel
description: Create a cinematic scroll-driven media reel where a video and supporting images move through layered 3D space. Use for original landing-page moments that need a sense of depth without heavy 3D libraries.
---

# Scroll Depth Media Reel

Use a tall section with one sticky viewport stage. Map its scroll progress from 0 to 1 and use it to move a hero video plus two to four supporting cards through `translate3d`, rotation, and scale.

## Build

1. Give the wrapper 250–320svh and the stage `position: sticky; top: 0; height: 100svh`.
2. Set `perspective` on the stage. Keep media as semantic `video` or `img` elements with poster/alt fallbacks.
3. On `scroll`, calculate `clamp(-rect.top / (sectionHeight - viewportHeight), 0, 1)` inside `requestAnimationFrame`.
4. Interpolate each card from a distant Z position into a legible foreground position. Use inline transform strings or precomputed unit values; do not depend on unsupported CSS multiplication in `calc()`.
5. Use a static transform as the no-JavaScript starting state.

## Guardrails

- Limit to four moving surfaces and use `will-change: transform, opacity` only while needed.
- Autoplay video must be muted, looped, `playsinline`, and have a poster image.
- On mobile reduce Z distances, card count/size, and stage height; preserve the same reading order.
- Respect `prefers-reduced-motion` by keeping media visible and disabling nonessential movement.
- Test at 320px, keyboard zoom, and on a touch device.
