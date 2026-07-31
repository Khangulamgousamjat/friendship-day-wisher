/**
 * Main Orchestrator — Panda World Focus
 */

document.addEventListener("DOMContentLoaded", () => {
  window.pandaInstance = new PandaController();

  initMouseParallax();
  initAudioControls();
  initPreloaderSequence(window.pandaInstance);
});

function runTypewriter(elementId, text, speed = 35, callback) {
  const container = document.getElementById(elementId);
  if (!container) return;

  const targetSpan = container.querySelector(".typewriter-text");
  const caretSpan = container.querySelector(".cursor-caret");
  if (!targetSpan) return;

  let index = 0;
  targetSpan.textContent = "";

  const timer = setInterval(() => {
    targetSpan.textContent += text.charAt(index);
    index++;

    if (index >= text.length) {
      clearInterval(timer);
      if (caretSpan) caretSpan.style.display = "none";
      if (callback) callback();
    }
  }, speed);
}

function initMouseParallax() {
  const layers = document.querySelectorAll(".parallax-layer");
  if (layers.length === 0) return;

  window.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    layers.forEach((layer) => {
      const speed = parseFloat(layer.getAttribute("data-speed")) || 0.1;
      const x = dx * speed * 40;
      const y = dy * speed * 30;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  });
}

function initAudioControls() {
  const btn = document.getElementById("music-toggle-btn");
  if (!btn) return;

  if (typeof soundManager !== "undefined") {
    btn.textContent = soundManager.isMuted ? "🔇" : "🎵";
  }

  btn.addEventListener("click", () => {
    if (typeof soundManager !== "undefined") {
      const isPlaying = soundManager.toggleMusic();
      btn.textContent = isPlaying ? "🎵" : "🔇";
    }
  });
}

function initPreloaderSequence(panda) {
  const loader = document.getElementById("loading");
  const pandaWorld = document.getElementById("panda-world");
  const ctaBtn = document.getElementById("startAdventure");

  if (ctaBtn) {
    ctaBtn.textContent = CONFIG.pandaButton || "Let's Go Together";
  }

  setTimeout(() => {
    if (typeof gsap !== "undefined" && loader) {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          loader.style.display = "none";
          if (pandaWorld) pandaWorld.classList.remove("hidden");

          panda.animateEntrance();

          runTypewriter("welcomeText", CONFIG.pandaWelcome || "Happy Friendship Day!", 40, () => {
            runTypewriter("storyText", CONFIG.pandaStory || "I found a magical adventure just for you.", 30);
          });
        }
      });
    }
  }, 2500);

  if (ctaBtn) {
    ctaBtn.addEventListener("click", () => {
      if (typeof soundManager !== "undefined") {
        soundManager.startMusic();
        soundManager.playSparkleSFX();
      }
    });
  }
}
