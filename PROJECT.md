# PROJECT.md — Single Source of Truth
## A Panda's Adventure to the Magical Tower 🐼✨

### Overview
A premium, deployable, single-page scrollytelling website for Friendship Day built with vanilla HTML5, CSS3, JavaScript (ES6 Modules), GSAP 3 + ScrollTrigger, Lenis smooth scrolling, Web Audio API sound design, and HTML5 Canvas particle & lantern engines.

---

### Project Phases & Execution Roadmap

#### Phase 1: Architecture & Base Configuration
- Clean vanilla folder structure: `css/`, `js/`, `assets/`, `index.html`, `editor.html`, `README.md`, `favicon.ico`.
- Central `CONFIG` system (`js/config.js`) driving all text copy without hardcoded HTML string constants.
- Design tokens & color palette system (`--bg`, `--cream`, `--pink`, `--lavender`, `--gold`, `--sky`, `--green`, `--text`).
- CDN integration for GSAP 3.12, ScrollTrigger, and Lenis.
- Base Preloader timeline and `#panda-world` layout.

#### Phase 2: Original Animated SVG Panda & Environment
- Original SVG vector panda with independent `<g>` groups (`#head`, `#leftEar`, `#rightEar`, `#pupils`, `#eyelids`, `#cheeks`, `#smile`, `#body`, `#rightArm`, `#leftLeg`, `#rightLeg`, `#tail`, `#shadow`).
- Animations: Breathing, randomized eyelid blinking, mouse pupil tracking, ear wiggles, tail wag, head tilt, paw wave, smile widening, and floating heart pops.
- Typewriter text effect (~35ms/char) for `pandaWelcome` and `pandaStory`.
- Multi-layer mouse parallax depth stack & canvas ambient particles (leaves, fireflies, sparkles).

#### Phase 3: Scrollytelling Adventure Journey (5 Scenes)
- 5 Story scenes (~100vh each):
  1. *Bamboo Forest 🌲*: Swaying bamboo, falling leaves, mini-message.
  2. *Flower Garden 🌸*: Rotating flowers, floating petals, mini-message.
  3. *Wooden Bridge 🌉*: Golden hour stream, flowing water, jumping fish, planks, mini-message.
  4. *Magical Meadow 🌼*: Sunset glow, golden grass layer, fireflies, sparkles, mini-message.
  5. *Cloud Valley ☁️*: Purple dusk clouds, mountain silhouettes, mini-message.
- Cinematic Tower Reveal: Clouds separate, golden light rays pulse, tower silhouette appears, panda sits down.
- Scroll-linked background sky gradient sweep & vertical bamboo progress stalk navigation (`#bamboo-progress-nav`).
- Panda walk cycle (`startWalkCycle()`) and scene-specific hidden reactions (`setReaction(env)`).

#### Phase 4: The Magical Tower & Final Letter
- Original Fairytale Tower (~480vh Pinned Stage): Stone texture pattern, glowing windows, wooden windows, hanging ivy, roof star, flower pots.
- SVG Golden Hair Braid Cascade with flower clusters, glow filter, and chained SVG sway physics (`delay: i * 0.025s`).
- 5 Alternating Glassmorphism Message Cards (`01 / 05` to `05 / 05`) with blur, fade, scale, glow, float, and handwritten SVG underline draw effects (strictly one active message card visible at a time).
- Top Balcony Window Reveal: Window opens with golden light burst as summit is reached (`.window-open`).
- Final Letter Glass Card (`#section-final-letter`): Centered card displaying `CONFIG.finalTitle` and `CONFIG.finalMessage`.

#### Phase 5: Lantern Festival Finale
- Canvas Particle & Sky Lantern Engine (`js/lanterns.js`): Floating lanterns with wind drift, random speed, depth/scaling, candle flicker, rotation wobble, twinkling stars (`★ ✦ ★ ✧`), and fireflies.
- Panda Finale Return: Panda walks into scene, looks up at lanterns, waves, displays `"Mission Complete ❤️"`.
- Sequential Memory Timeline Cards & glowing `🌿 Replay Adventure` button.
- Audio Controller with persistent `localStorage` mute memory (`friendshipMusicMuted`).
- Mobile auto-scaling (120 → 60 lanterns) & `prefers-reduced-motion` compliance.

#### Phase 6: Customization Editor (`editor.html` & `js/editor.js`)
- Full form interface to customize Friend Name, Panda Welcome/Story, CTA button, 3 Adventure Messages, 5 Tower Messages, Final Title, Final Message Letter, Theme palette, Lantern Count, and Music toggle.
- 5 Action Buttons: Preview (live modal iframe), Save (`localStorage`), Reset (defaults), Export JSON, Import JSON.
- Automatic configuration loading on `index.html`.

---

### Verification & Quality Criteria
- 100% functional correctness across all 6 phases.
- Zero console errors or unhandled promise rejections.
- 60 FPS performance with canvas object pooling & background tab CPU pause.
- Full mobile responsiveness & touch target optimization (≥44px).
- Clean Vercel static deployment compatibility (`vercel.json`).
