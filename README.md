# A Panda's Adventure to the Magical Tower 🐼✨
## Interactive Friendship Day Storytelling Experience

A premium, interactive scrollytelling web application built with vanilla HTML, CSS, and JS, GSAP, ScrollTrigger, and Lenis smooth scrolling.

### Folder Structure

```
friendship-day/
│
├── index.html          # Main scrollytelling experience entry point
├── editor.html         # Customization editor interface
├── README.md           # Documentation
├── favicon.ico         # App icon
│
├── css/
│   ├── style.css       # Global design tokens, color palette, & base rules
│   ├── animations.css  # Keyframes & micro-animation utility classes
│   ├── panda.css       # Panda landing page & scene layout styling
│   ├── tower.css       # Tower climb stage & messaging styles
│   └── responsive.css # Mobile breakpoints & accessibility media queries
│
├── js/
│   ├── config.js       # Central CONFIG object containing all copy & settings
│   ├── main.js         # Main orchestrator & preloader timeline
│   ├── panda.js        # Panda controller & interaction logic
│   ├── tower.js        # Tower climb & scroll-scrubbed message cards
│   ├── scroll.js       # Lenis smooth scroll + GSAP ScrollTrigger sync
│   ├── editor.js       # Customizer form handlers
│   ├── lanterns.js     # Sky lanterns canvas engine
│   ├── music.js        # Sound & Audio controller
│   └── utils.js        # Helper math & DOM utilities
│
└── assets/
    ├── svg/            # SVG vector assets
    ├── images/         # Image assets
    ├── music/          # Audio tracks & sound effects
    └── fonts/          # Custom web fonts
```

### Color Palette
- `--bg`: `#FFF8F0`
- `--cream`: `#FFF6E8`
- `--pink`: `#FFD9E8`
- `--lavender`: `#DCCBFF`
- `--gold`: `#FFD86B`
- `--sky`: `#BEE9FF`
- `--green`: `#C8F0C4`
- `--text`: `#473A3A`
