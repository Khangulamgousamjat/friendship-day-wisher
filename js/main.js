/**
 * Friendship Day Experience - Main Orchestrator (Phase 5)
 * Manages preloader timeline, typewriter text effect, sound controls, tower climb, final letter, and replay button.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Instantiate Controllers & expose globally
  window.pandaInstance = new PandaController();
  window.towerInstance = new TowerController();

  // 2. Apply CONFIG to Final Letter Card
  applyConfigToFinalLetter();

  // 3. Setup Mouse Parallax for Environment Depth
  initMouseParallax();

  // 4. Audio Controller Binding
  initAudioControls();

  // 5. Preloader Timeline & Entrance Orchestration
  initPreloaderSequence(window.pandaInstance);

  // 6. Replay Adventure Button Binding
  initReplayButton();
});

// Apply Final Title & Message from CONFIG
function applyConfigToFinalLetter() {
  const titleEl = document.getElementById("ui-final-title");
  const msgEl = document.getElementById("ui-final-message");

  if (titleEl) titleEl.textContent = CONFIG.finalTitle || "Happy Friendship Day ❤️";
  if (msgEl) msgEl.textContent = CONFIG.finalMessage || "Thank you for being one of my favorite people.";
}

// Typewriter Text Effect (~35ms / character)
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

// Mouse Movement Parallax System
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

// Audio Toggle Button
function initAudioControls() {
  const btn = document.getElementById("music-toggle-btn");
  if (!btn) return;

  // Restore icon state from stored preference
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

// Preloader & Panda Entrance Sequence
function initPreloaderSequence(panda) {
  const loader = document.getElementById("loading");
  const pandaWorld = document.getElementById("panda-world");
  const ctaBtn = document.getElementById("startAdventure");
  const continueBtn = document.getElementById("continue-tower-btn");

  if (ctaBtn) {
    ctaBtn.textContent = CONFIG.pandaButton || "Let's Go Together";
  }

  // Preloader fill timeline (~2.5s)
  setTimeout(() => {
    if (typeof gsap !== "undefined" && loader) {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          loader.style.display = "none";
          if (pandaWorld) pandaWorld.classList.remove("hidden");

          // Trigger Panda Bounce Entrance
          panda.animateEntrance();

          // Trigger Speech Typewriter Sequence
          runTypewriter("welcomeText", CONFIG.pandaWelcome || "Happy Friendship Day!", 40, () => {
            runTypewriter("storyText", CONFIG.pandaStory || "I found a magical adventure just for you.", 30);
          });
        }
      });
    }
  }, 2500);

  // CTA Button Click Transition to Adventure Path
  if (ctaBtn) {
    ctaBtn.addEventListener("click", () => {
      if (typeof soundManager !== "undefined") {
        soundManager.startMusic();
        soundManager.playSparkleSFX();
      }

      panda.startAdventureTransition(() => {
        if (typeof scrollController !== "undefined") {
          scrollController.scrollTo("#scene-forest", { duration: 1.8 });
        }
      });
    });
  }

  // Tower Reveal Continue Button -> Smooth Scroll to Tower Climb
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      if (typeof soundManager !== "undefined") soundManager.playSparkleSFX();
      if (typeof scrollController !== "undefined") {
        scrollController.scrollTo("#section-tower", { duration: 1.8 });
      }
    });
  }
}

// Replay Adventure Button
function initReplayButton() {
  const replayBtn = document.getElementById("replay-adventure-btn");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      if (typeof soundManager !== "undefined") soundManager.playSparkleSFX();
      if (typeof scrollController !== "undefined") {
        scrollController.scrollTo(0, { duration: 1.5 });
      }
    });
  }
}
