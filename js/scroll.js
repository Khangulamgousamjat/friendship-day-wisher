/**
 * Friendship Day Experience - Message Reveal System (Phase 4 Focus)
 * Manages scroll-linked threshold reveals ensuring ONLY ONE message card is visible at a time.
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

    // 1. Overall Progress Sweep
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

    // 2. Tower Camera Climb (~450vh)
    const cameraWorld = document.getElementById("tower-camera-world");
    ScrollTrigger.create({
      trigger: "#section-tower",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        if (cameraWorld) {
          const maxTranslate = 800;
          gsap.set(cameraWorld, { y: p * maxTranslate });
        }
      }
    });

    // 3. Message Reveal System: 5 Floating Glass Cards (ONLY ONE VISIBLE AT A TIME)
    const msgRanges = [
      { start: 0.16, end: 0.30 }, // Card 01
      { start: 0.33, end: 0.47 }, // Card 02
      { start: 0.50, end: 0.64 }, // Card 03
      { start: 0.67, end: 0.81 }, // Card 04
      { start: 0.84, end: 0.96 }  // Card 05
    ];

    ScrollTrigger.create({
      trigger: "#section-tower",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;

        // Find currently active card index (if any)
        let activeIdx = -1;
        msgRanges.forEach((range, i) => {
          if (p >= range.start && p < range.end) {
            activeIdx = i;
          }
        });

        // Strictly update visibility so ONLY ONE card is visible at a time
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
