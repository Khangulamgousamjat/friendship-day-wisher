/**
 * Friendship Day Experience - Camera Climb & Message Reveal Integration
 * Manages scroll climb starting at the BOTTOM of the 3500px tower, translating upward as user scrolls down.
 */

class ScrollController {
  constructor() {
    this.lenis = null;
    this.init();
  }

  init() {
    if (typeof Lenis !== "undefined") {
      this.lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5
      });

      if (typeof ScrollTrigger !== "undefined") {
        this.lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => this.lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => {
          this.lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    }

    this.setupScrollTriggers();
  }

  scrollTo(target, options = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, { duration: 1.8, offset: 0, ...options });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  setupScrollTriggers() {
    if (typeof ScrollTrigger === "undefined") return;

    const skyBg = document.getElementById("sky-sweep-bg");
    const fillBar = document.getElementById("bamboo-nav-fill");

    // 1. Overall Progress & Background Sky Sweep
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        if (fillBar) fillBar.style.height = `${p * 100}%`;

        if (skyBg) {
          if (p < 0.15) {
            skyBg.style.background = "linear-gradient(180deg, #BEE9FF 0%, #FFF8F0 100%)";
          } else if (p < 0.35) {
            skyBg.style.background = "linear-gradient(180deg, #C8F0C4 0%, #FFF9EF 100%)";
          } else if (p < 0.55) {
            skyBg.style.background = "linear-gradient(180deg, #FFD86B 0%, #FFF8F0 100%)";
          } else if (p < 0.75) {
            skyBg.style.background = "linear-gradient(180deg, #FF9E5E 0%, #FF758F 100%)";
          } else {
            skyBg.style.background = "linear-gradient(180deg, #0F0A1E 0%, #1E1B4B 100%)";
          }
        }
      }
    });

    // 2. Camera Climb: Starts at BOTTOM of tower, translates UP as user scrolls DOWN
    const cameraWorld = document.getElementById("tower-camera-world");
    ScrollTrigger.create({
      trigger: "#section-tower",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        if (cameraWorld) {
          const maxTranslate = 2700; // Translates 2700px upward along 3500px tower
          gsap.set(cameraWorld, { y: p * maxTranslate });
        }

        // At 100% summit, reveal Girl on balcony
        if (p > 0.90 && window.towerInstance) {
          window.towerInstance.revealGirlAtSummit();
        }
      }
    });

    // 3. 5 Message Cards Reveal Ranges (ONLY ONE VISIBLE AT A TIME)
    const msgRanges = [
      { start: 0.12, end: 0.26 }, // Message 1 (15%)
      { start: 0.27, end: 0.42 }, // Message 2 (30%)
      { start: 0.43, end: 0.57 }, // Message 3 (45%)
      { start: 0.58, end: 0.73 }, // Message 4 (60%)
      { start: 0.74, end: 0.89 }  // Message 5 (80%)
    ];

    ScrollTrigger.create({
      trigger: "#section-tower",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;

        let activeIdx = -1;
        msgRanges.forEach((range, i) => {
          if (p >= range.start && p < range.end) {
            activeIdx = i;
          }
        });

        for (let i = 0; i < 5; i++) {
          const card = document.getElementById(`tower-card-${i}`);
          if (!card) continue;

          if (i === activeIdx) {
            if (!card.classList.contains("visible")) {
              card.classList.add("visible");
              if (typeof soundManager !== "undefined") soundManager.playSparkleSFX();
            }
          } else {
            card.classList.remove("visible");
          }
        }
      }
    });

    // Environmental Checkpoints
    const checkEnvironment = (env, selector, nodeIndex) => {
      ScrollTrigger.create({
        trigger: selector,
        start: "top center",
        end: "bottom center",
        onEnter: () => this.applyEnvironment(env, nodeIndex),
        onEnterBack: () => this.applyEnvironment(env, nodeIndex)
      });
    };

    checkEnvironment("forest", "#scene-forest", 0);
    checkEnvironment("garden", "#scene-garden", 1);
    checkEnvironment("bridge", "#scene-bridge", 2);
    checkEnvironment("meadow", "#scene-meadow", 3);
    checkEnvironment("cloud", "#scene-cloud", 4);
    checkEnvironment("tower", "#section-tower", 5);
  }

  applyEnvironment(env, nodeIndex) {
    const nodes = document.querySelectorAll(".bamboo-nav-node");
    nodes.forEach((n, idx) => {
      if (idx === nodeIndex) n.classList.add("active");
      else n.classList.remove("active");
    });

    if (window.particleEngine) window.particleEngine.setEnvironment(env);
    if (typeof soundManager !== "undefined") soundManager.setEnvironment(env);

    if (window.pandaInstance) {
      if (env === "tower") {
        window.pandaInstance.sitDown();
      } else {
        window.pandaInstance.startWalkCycle();
        window.pandaInstance.setReaction(env);
      }
    }
  }
}

const scrollController = new ScrollController();
