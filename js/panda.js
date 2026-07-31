/**
 * Friendship Day Experience - Animated SVG Panda Controller (Phase 3)
 * Manages idle loops, walk cycle, hidden reactions per environment, and sit-down stance.
 */

class PandaController {
  constructor() {
    this.wrapper = document.getElementById("panda-svg-wrapper");
    this.head = document.getElementById("head");
    this.leftPupil = document.getElementById("leftPupil");
    this.rightPupil = document.getElementById("rightPupil");
    this.leftEyelid = document.getElementById("leftEyelid");
    this.rightEyelid = document.getElementById("rightEyelid");
    this.leftEar = document.getElementById("leftEar");
    this.rightEar = document.getElementById("rightEar");
    this.leftArm = document.getElementById("leftArm");
    this.rightArm = document.getElementById("rightArm");
    this.leftLeg = document.getElementById("leftLeg");
    this.rightLeg = document.getElementById("rightLeg");
    this.tail = document.getElementById("tail");
    this.body = document.getElementById("body");
    this.shadow = document.getElementById("shadow");
    this.smile = document.getElementById("smile");
    this.heartsContainer = document.getElementById("heart-pops-container");

    this.isWaving = false;
    this.isWalking = false;
    this.currentReaction = null;

    this.init();
  }

  init() {
    if (!this.wrapper) return;

    this.setupBreathing();
    this.setupTailWag();
    this.setupBlinking();
    this.setupEarWiggle();
    this.setupHeadTilt();
    this.setupEyeTracking();
    this.setupHoverInteractivity();
  }

  // Entrance Bounce Animation
  animateEntrance() {
    if (typeof gsap === "undefined" || !this.wrapper) return;

    gsap.from(this.wrapper, {
      y: 80,
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: "back.out(1.7)"
    });
  }

  // Breathing Loop
  setupBreathing() {
    if (typeof gsap === "undefined") return;

    if (this.body) {
      gsap.to(this.body, {
        scaleY: 1.02,
        scaleX: 1.01,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center bottom"
      });
    }

    if (this.shadow) {
      gsap.to(this.shadow, {
        scaleX: 1.08,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center"
      });
    }
  }

  // Tail Wag Loop
  setupTailWag() {
    if (typeof gsap === "undefined" || !this.tail) return;

    gsap.to(this.tail, {
      rotate: 14,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "90% 80%"
    });
  }

  // Eyelid Blinking Loop (Randomized 4-8s)
  setupBlinking() {
    const triggerBlink = () => {
      if (typeof gsap !== "undefined" && this.leftEyelid && this.rightEyelid) {
        gsap.to([this.leftEyelid, this.rightEyelid], {
          height: 34,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut"
        });
      }
      const nextDelay = Utils.randomRange(4000, 8000);
      setTimeout(triggerBlink, nextDelay);
    };

    setTimeout(triggerBlink, 3000);
  }

  // Ear Wiggle Loop
  setupEarWiggle() {
    const triggerWiggle = () => {
      if (typeof gsap !== "undefined" && this.leftEar && this.rightEar) {
        gsap.to(this.leftEar, { rotate: -8, duration: 0.15, yoyo: true, repeat: 3 });
        gsap.to(this.rightEar, { rotate: 8, duration: 0.15, yoyo: true, repeat: 3 });
      }
      const nextDelay = Utils.randomRange(6000, 10000);
      setTimeout(triggerWiggle, nextDelay);
    };

    setTimeout(triggerWiggle, 5000);
  }

  // Head Tilt Loop
  setupHeadTilt() {
    if (typeof gsap === "undefined" || !this.head) return;

    gsap.to(this.head, {
      rotate: 4,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "center bottom"
    });
  }

  // Eye Tracking
  setupEyeTracking() {
    if (typeof gsap === "undefined" || !this.leftPupil) return;

    const quickPupilX = gsap.quickTo([this.leftPupil, this.rightPupil], "x", { duration: 0.2, ease: "power1.out" });
    const quickPupilY = gsap.quickTo([this.leftPupil, this.rightPupil], "y", { duration: 0.2, ease: "power1.out" });

    window.addEventListener("mousemove", (e) => {
      if (this.currentReaction === "lookUp") return;

      const rect = this.wrapper.getBoundingClientRect();
      const pandaCenterX = rect.left + rect.width / 2;
      const pandaCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - pandaCenterX;
      const dy = e.clientY - pandaCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxOffset = 7;
      const angle = Math.atan2(dy, dx);
      const clampDist = Math.min(dist * 0.03, maxOffset);

      quickPupilX(Math.cos(angle) * clampDist);
      quickPupilY(Math.sin(angle) * clampDist);
    });
  }

  // Hover Interactivity
  setupHoverInteractivity() {
    if (!this.wrapper) return;

    this.wrapper.addEventListener("mouseenter", () => {
      this.wavePaw();
      this.widenSmile(true);
      this.popHeart();
    });

    this.wrapper.addEventListener("mouseleave", () => {
      this.widenSmile(false);
    });

    this.wrapper.addEventListener("click", () => {
      this.wavePaw();
      for (let i = 0; i < 3; i++) {
        setTimeout(() => this.popHeart(), i * 180);
      }
    });
  }

  wavePaw() {
    if (this.isWaving || typeof gsap === "undefined" || !this.rightArm) return;
    this.isWaving = true;

    gsap.to(this.rightArm, {
      rotate: -38,
      duration: 0.22,
      yoyo: true,
      repeat: 5,
      ease: "sine.inOut",
      onComplete: () => {
        gsap.to(this.rightArm, { rotate: 0, duration: 0.3 });
        this.isWaving = false;
      }
    });
  }

  widenSmile(isHovered) {
    if (typeof gsap === "undefined" || !this.smile) return;

    const pathData = isHovered ? "M 134 168 Q 150 188 166 168" : "M 138 168 Q 150 182 162 168";
    gsap.to(this.smile, {
      attr: { d: pathData },
      duration: 0.3,
      ease: "power1.out"
    });
  }

  popHeart() {
    if (!this.heartsContainer || !this.wrapper) return;

    const rect = this.wrapper.getBoundingClientRect();
    const heart = document.createElement("div");
    heart.className = "heart-pop";
    const icons = ["❤️", "💖", "🌸", "✨", "💛"];
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];

    const randomX = rect.left + rect.width / 2 + Utils.randomRange(-30, 30);
    const topY = rect.top + 20;

    heart.style.left = `${randomX}px`;
    heart.style.top = `${topY}px`;

    this.heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 1800);
  }

  // Phase 3: Walk Cycle (Legs & Arms Alternating + Head Bounce)
  startWalkCycle() {
    if (this.isWalking || typeof gsap === "undefined") return;
    this.isWalking = true;

    // Legs alternating
    gsap.to(this.leftLeg, { rotate: 18, duration: 0.35, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(this.rightLeg, { rotate: -18, duration: 0.35, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Arms alternating
    if (this.leftArm) gsap.to(this.leftArm, { rotate: -14, duration: 0.35, repeat: -1, yoyo: true, ease: "sine.inOut" });
    if (this.rightArm && !this.isWaving) gsap.to(this.rightArm, { rotate: 14, duration: 0.35, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Head Bobbing
    if (this.head) gsap.to(this.head, { y: -6, duration: 0.35, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }

  stopWalkCycle() {
    if (!this.isWalking || typeof gsap === "undefined") return;
    this.isWalking = false;

    gsap.to([this.leftLeg, this.rightLeg, this.leftArm, this.rightArm, this.head], {
      rotate: 0,
      y: 0,
      duration: 0.4
    });
  }

  // Phase 3: Hidden Panda Reactions per Environment Scene
  setReaction(env) {
    if (this.currentReaction === env || typeof gsap === "undefined") return;
    this.currentReaction = env;

    // Reset arms & head transforms
    gsap.to([this.leftArm, this.rightArm, this.head], { rotate: 0, y: 0, duration: 0.4 });

    if (env === "forest") {
      // Look Around
      gsap.to([this.leftPupil, this.rightPupil], { x: -5, duration: 0.5, yoyo: true, repeat: 3, ease: "power1.inOut" });
    } else if (env === "garden") {
      // Smile & Blush
      this.widenSmile(true);
      gsap.to("#cheeks opacity", { opacity: 0.9, duration: 0.5 });
    } else if (env === "bridge") {
      // Balance Arms
      if (this.leftArm) gsap.to(this.leftArm, { rotate: -25, duration: 0.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
      if (this.rightArm) gsap.to(this.rightArm, { rotate: 25, duration: 0.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
    } else if (env === "meadow") {
      // Surprised & Delighted
      gsap.to([this.leftPupil, this.rightPupil], { scale: 1.2, duration: 0.4, transformOrigin: "center" });
      this.popHeart();
    } else if (env === "cloud") {
      // Look Up at Tower
      gsap.to([this.leftPupil, this.rightPupil], { y: -7, x: 0, duration: 0.6 });
      gsap.to(this.head, { rotate: -8, y: -4, duration: 0.6 });
    }
  }

  // Sit Down at Tower Reveal
  sitDown() {
    if (typeof gsap === "undefined" || !this.wrapper) return;
    this.stopWalkCycle();

    gsap.to(this.wrapper, {
      y: 20,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.out"
    });

    if (this.head) {
      gsap.to(this.head, { y: -8, rotate: -10, duration: 0.8 });
    }
  }

  // Trigger Paw Wave & Transition
  startAdventureTransition(callback) {
    this.wavePaw();
    if (typeof gsap !== "undefined") {
      gsap.to(".speech", {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          if (callback) callback();
        }
      });
    } else {
      if (callback) callback();
    }
  }
}
