/**
 * Lenis & Scroll Integration Reset — Awaiting new tower implementation
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
  }

  scrollTo(target, options = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, { duration: 1.8, offset: 0, ...options });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

const scrollController = new ScrollController();
