/**
 * Friendship Day Experience - Canvas Lantern & Starfield Engine (Phase 5 Ending Focus)
 * Pooled HTML5 Canvas particle engine for sky lanterns with wind, random speed, depth, glow, rotation,
 * twinkling stars, glowing moon, fireflies, and sparkles.
 */

class LanternEngine {
  constructor(canvasId = "lantern-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.lanterns = [];
    this.stars = [];
    this.fireflies = [];
    this.isActive = false;
    this.isMobile = Utils.isTouchDevice() || window.innerWidth < 768;
    this.maxLanterns = this.isMobile ? 60 : (CONFIG.lanternCount || 120);

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.createStarfield(this.isMobile ? 50 : 100);
    this.createFireflies(20);
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * (window.devicePixelRatio || 1);
    this.canvas.height = this.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  createStarfield(count) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Utils.randomRange(0.8, 2.6),
        alpha: Utils.randomRange(0.2, 0.95),
        twinkleSpeed: Utils.randomRange(0.008, 0.025)
      });
    }
  }

  createFireflies(count) {
    this.fireflies = [];
    for (let i = 0; i < count; i++) {
      this.fireflies.push({
        x: Math.random() * this.width,
        y: this.height * 0.5 + Math.random() * (this.height * 0.5),
        radius: Utils.randomRange(1.5, 3.5),
        vx: Utils.randomRange(-0.4, 0.4),
        vy: Utils.randomRange(-0.4, 0.4),
        alpha: Utils.randomRange(0.2, 0.7),
        pulseSpeed: Utils.randomRange(0.01, 0.03)
      });
    }
  }

  startFestival() {
    if (this.isActive) return;
    this.isActive = true;
    this.lanterns = [];

    // Gradual lantern release (1 -> 2 -> 20 -> 50 -> max)
    let count = 0;
    const releaseInterval = setInterval(() => {
      if (count < this.maxLanterns) {
        const batch = count < 5 ? 1 : (count < 20 ? 3 : 8);
        for (let i = 0; i < batch && count < this.maxLanterns; i++) {
          this.lanterns.push(this.createLantern());
          count++;
        }
      } else {
        clearInterval(releaseInterval);
      }
    }, 350);
  }

  createLantern() {
    const scale = Utils.randomRange(0.35, 1.25); // Depth / scaling
    return {
      x: Math.random() * this.width,
      y: this.height + Utils.randomRange(20, 250),
      width: 26 * scale,
      height: 38 * scale,
      scale: scale, // Depth
      vy: Utils.randomRange(-0.5, -1.5) * scale, // Random speed
      wind: Utils.randomRange(-0.35, 0.35), // Wind drift
      wobbleSpeed: Utils.randomRange(0.015, 0.035),
      wobbleAngle: Math.random() * Math.PI * 2, // Rotation wobble
      flicker: Math.random() * Math.PI,
      alpha: Utils.randomRange(0.7, 0.98)
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Twinkling Stars
    this.stars.forEach(s => {
      s.alpha += s.twinkleSpeed;
      if (s.alpha > 0.95 || s.alpha < 0.15) s.twinkleSpeed = -s.twinkleSpeed;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 246, 200, ${s.alpha})`;
      this.ctx.fill();
      this.ctx.restore();
    });

    // 2. Fireflies
    this.fireflies.forEach(f => {
      f.x += f.vx;
      f.y += f.vy;
      f.alpha += f.pulseSpeed;

      if (f.x < 0) f.x = this.width;
      if (f.x > this.width) f.x = 0;
      if (f.y < this.height * 0.4) f.y = this.height;

      if (f.alpha > 0.8 || f.alpha < 0.15) f.pulseSpeed = -f.pulseSpeed;

      this.ctx.save();
      const glow = this.ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 2.5);
      glow.addColorStop(0, `rgba(255, 216, 107, ${f.alpha})`);
      glow.addColorStop(1, "rgba(255, 216, 107, 0)");
      this.ctx.fillStyle = glow;
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.radius * 2.5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // 3. Sky Lanterns (Wind, Speed, Depth, Glow, Rotation)
    if (this.isActive) {
      // Sort by depth (scale) so smaller lanterns render behind larger ones
      this.lanterns.sort((a, b) => a.scale - b.scale);

      this.lanterns.forEach((l, idx) => {
        l.y += l.vy;
        l.wobbleAngle += l.wobbleSpeed;
        l.x += Math.sin(l.wobbleAngle) * 0.35 + l.wind;
        l.flicker += 0.06;

        if (l.y < -90) {
          this.lanterns[idx] = this.createLantern();
          this.lanterns[idx].y = this.height + 20;
        }

        this.ctx.save();
        this.ctx.translate(l.x, l.y);
        this.ctx.rotate(Math.sin(l.wobbleAngle) * 0.08); // Rotation wobble

        // Soft Radial Glow Aura
        const auraRadius = l.width * 2.4;
        const aura = this.ctx.createRadialGradient(
          l.width / 2, l.height / 2, 0,
          l.width / 2, l.height / 2, auraRadius
        );
        const flickerAlpha = (0.45 + Math.sin(l.flicker) * 0.12);
        aura.addColorStop(0, `rgba(255, 213, 79, ${flickerAlpha})`);
        aura.addColorStop(0.5, `rgba(255, 183, 3, ${flickerAlpha * 0.45})`);
        aura.addColorStop(1, "rgba(255, 183, 3, 0)");

        this.ctx.fillStyle = aura;
        this.ctx.beginPath();
        this.ctx.arc(l.width / 2, l.height / 2, auraRadius, 0, Math.PI * 2);
        this.ctx.fill();

        // Lantern Body Gradient
        const grad = this.ctx.createLinearGradient(0, 0, 0, l.height);
        grad.addColorStop(0, "#FFD54F");
        grad.addColorStop(0.5, "#FFB703");
        grad.addColorStop(1, "#FB8500");

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        if (this.ctx.roundRect) {
          this.ctx.roundRect(0, 0, l.width, l.height, [6, 6, 4, 4]);
        } else {
          this.ctx.rect(0, 0, l.width, l.height);
        }
        this.ctx.fill();

        // Inner Candle Flame
        const flameX = l.width / 2;
        const flameY = l.height * 0.65;
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        this.ctx.beginPath();
        this.ctx.arc(flameX, flameY, l.width * 0.26, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
      });
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.lanternEngine = new LanternEngine();
});
