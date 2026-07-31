/**
 * Friendship Day Experience - Multi-Environment Ambient Particles (Phase 3 & 5 Polish)
 * Optimized Canvas 2D engine with tab visibility pause and object pooling.
 */

class ParticleEngine {
  constructor(canvasId = "particles-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.environment = "forest";
    this.isPaused = false;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    document.addEventListener("visibilitychange", () => {
      this.isPaused = document.hidden;
    });

    // Pool particles
    for (let i = 0; i < 20; i++) this.particles.push(this.createParticle("leaf"));
    for (let i = 0; i < 20; i++) this.particles.push(this.createParticle("petal"));
    for (let i = 0; i < 25; i++) this.particles.push(this.createParticle("firefly"));
    for (let i = 0; i < 25; i++) this.particles.push(this.createParticle("goldDust"));

    this.animate();
  }

  setEnvironment(env) {
    this.environment = env;
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * (window.devicePixelRatio || 1);
    this.canvas.height = this.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  createParticle(type) {
    if (type === "leaf") {
      return {
        type: "leaf",
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Utils.randomRange(6, 12),
        vx: Utils.randomRange(-0.6, 0.6),
        vy: Utils.randomRange(0.4, 1.2),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: Utils.randomRange(-0.02, 0.02),
        color: Math.random() < 0.6 ? "#88D49E" : "#C8F0C4",
        alpha: Utils.randomRange(0.5, 0.85)
      };
    } else if (type === "petal") {
      const colors = ["#FFB7C5", "#FFD9E8", "#FF9BBB", "#FFC6D9"];
      return {
        type: "petal",
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Utils.randomRange(5, 10),
        vx: Utils.randomRange(-0.4, 0.6),
        vy: Utils.randomRange(0.5, 1.3),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: Utils.randomRange(-0.02, 0.03),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Utils.randomRange(0.6, 0.9)
      };
    } else if (type === "firefly") {
      return {
        type: "firefly",
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Utils.randomRange(1.5, 3.5),
        vx: Utils.randomRange(-0.4, 0.4),
        vy: Utils.randomRange(-0.4, 0.4),
        alpha: Utils.randomRange(0.15, 0.7),
        pulseSpeed: Utils.randomRange(0.01, 0.03)
      };
    } else {
      return {
        type: "goldDust",
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Utils.randomRange(1, 3),
        vx: Utils.randomRange(-0.2, 0.2),
        vy: Utils.randomRange(-0.5, -1.2),
        alpha: Utils.randomRange(0.2, 0.9),
        pulseSpeed: Utils.randomRange(0.015, 0.04)
      };
    }
  }

  animate() {
    if (!this.isPaused) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.particles.forEach((p, idx) => {
        if (p.type === "leaf" && (this.environment === "forest" || this.environment === "garden")) {
          p.x += p.vx + Math.sin(p.rotation) * 0.4;
          p.y += p.vy;
          p.rotation += p.rotSpeed;

          if (p.y > this.height + 20) {
            this.particles[idx] = this.createParticle("leaf");
            this.particles[idx].y = -20;
          }

          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.rotation);
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = p.alpha;
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();

        } else if (p.type === "petal" && (this.environment === "garden" || this.environment === "bridge")) {
          p.x += p.vx + Math.sin(p.rotation) * 0.5;
          p.y += p.vy;
          p.rotation += p.rotSpeed;

          if (p.y > this.height + 20) {
            this.particles[idx] = this.createParticle("petal");
            this.particles[idx].y = -20;
          }

          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.rotation);
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = p.alpha;
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();

        } else if (p.type === "firefly" && (this.environment === "meadow" || this.environment === "cloud")) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.pulseSpeed;

          if (p.x < 0) p.x = this.width;
          if (p.x > this.width) p.x = 0;
          if (p.y < 0) p.y = this.height;
          if (p.y > this.height) p.y = 0;

          if (p.alpha > 0.8 || p.alpha < 0.1) p.pulseSpeed = -p.pulseSpeed;

          this.ctx.save();
          const glow = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.8);
          glow.addColorStop(0, `rgba(255, 216, 107, ${p.alpha})`);
          glow.addColorStop(1, "rgba(255, 216, 107, 0)");

          this.ctx.fillStyle = glow;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();

        } else if (p.type === "goldDust" && (this.environment === "cloud" || this.environment === "tower" || this.environment === "meadow")) {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.pulseSpeed;

          if (p.y < -20) {
            this.particles[idx] = this.createParticle("goldDust");
            this.particles[idx].y = this.height + 20;
          }

          if (p.alpha > 0.95 || p.alpha < 0.15) p.pulseSpeed = -p.pulseSpeed;

          this.ctx.save();
          this.ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        }
      });
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.particleEngine = new ParticleEngine();
});
