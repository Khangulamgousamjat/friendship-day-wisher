/**
 * Friendship Day Experience - Redesigned Tall Tower & Camera Climb Controller
 * Uses tall 3500px tower illustration, separate hair braid overlay, girl on balcony,
 * multi-layer parallax background, and 5 alternating glass message cards.
 */

class TowerController {
  constructor(containerId = "tower-container", messagesId = "tower-messages") {
    this.container = document.getElementById(containerId);
    this.messagesContainer = document.getElementById(messagesId);
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderTowerScene();
    this.renderTowerMessages();
    this.setupHairSway();
  }

  renderTowerScene() {
    const towerImg = CONFIG.towerImage || "assets/images/tower.svg";
    const girlImg = CONFIG.girlImage || "assets/images/girl.svg";
    const hairImg = CONFIG.hairImage || "assets/images/hair.svg";
    const bgImg = CONFIG.backgroundImage || "assets/images/mountains.svg";

    this.container.innerHTML = `
      <!-- Multi-Layer Background Parallax -->
      <div id="tower-bg-parallax" class="tower-bg-parallax-layer">
        <div class="parallax-mountains" style="background-image: url('${bgImg}');"></div>
        <div class="parallax-cloud-1">☁️</div>
        <div class="parallax-cloud-2">☁️</div>
      </div>

      <!-- Camera World Container (Translates vertically as user scrolls down 450vh) -->
      <div id="tower-camera-world" class="tall-tower-world">

        <!-- 3500px Tall Tower Illustration -->
        <div class="tall-tower-wrapper">
          <img src="${towerImg}" alt="Fairytale Tower" class="tall-tower-img" loading="lazy" />

          <!-- Overlaid Separate Hair Braid Layer -->
          <div id="overlaid-hair-layer" class="overlaid-hair-wrap">
            <img src="${hairImg}" alt="Magical Golden Hair" class="golden-hair-img" />
          </div>

          <!-- Overlaid Girl on Top Balcony (Initially Hidden) -->
          <div id="top-balcony-girl" class="top-balcony-girl-wrap">
            <div class="balcony-golden-light"></div>
            <img src="${girlImg}" alt="Fairytale Girl" class="balcony-girl-img" />
          </div>
        </div>

        <!-- Top Summit Action Box (Initially Hidden) -->
        <div id="tower-summit-box" class="tower-summit-box">
          <button id="tower-summit-continue-btn" class="glow-button summit-btn">
            ${sanitizeText(CONFIG.continueButtonText || "Continue to Final Letter 💌")}
          </button>
        </div>

      </div> <!-- End Camera World -->
    `;

    // Bind summit continue button
    const summitBtn = document.getElementById("tower-summit-continue-btn");
    if (summitBtn) {
      summitBtn.addEventListener("click", () => {
        if (typeof soundManager !== "undefined") soundManager.playSparkleSFX();
        if (typeof scrollController !== "undefined") {
          scrollController.scrollTo("#section-final-letter", { duration: 1.6 });
        }
      });
    }
  }

  renderTowerMessages() {
    if (!this.messagesContainer) return;

    const messages = CONFIG.towerMessages || [
      "Some friendships begin quietly.",
      "Some become unforgettable.",
      "Thank you for every smile.",
      "Thank you for always being there.",
      "Life is brighter because of you."
    ];

    // Alternating Left / Right positions along climb (15%, 30%, 45%, 60%, 80%)
    const positions = [
      { top: "15%", left: "6%" },
      { top: "30%", right: "6%" },
      { top: "45%", left: "6%" },
      { top: "60%", right: "6%" },
      { top: "80%", left: "6%" }
    ];

    this.messagesContainer.innerHTML = messages.map((msg, idx) => {
      const pos = positions[idx] || { top: `${15 + idx * 16}%`, left: "6%" };
      const styleAttr = Object.entries(pos).map(([k, v]) => `${k}:${v}`).join(';');
      const alignClass = idx % 2 === 0 ? "card-left" : "card-right";

      return `
        <div class="tower-msg-card glass-card ${alignClass}" id="tower-card-${idx}" style="${styleAttr}" data-index="${idx}">
          <div class="card-sparkle">✨</div>
          <p class="card-text">${sanitizeText(msg)}</p>
          <svg class="card-underline" viewBox="0 0 140 8">
            <path d="M 5 4 Q 70 8 135 4" fill="none" stroke="#FFD86B" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <span class="card-badge">0${idx + 1} / 05</span>
        </div>
      `;
    }).join('');
  }

  // Gentle Hair Braid Sway Animation
  setupHairSway() {
    if (typeof gsap === "undefined") return;
    const hair = document.getElementById("overlaid-hair-layer");
    if (!hair) return;

    gsap.to(hair, {
      rotate: 2.5,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // Reveal Girl at Summit
  revealGirlAtSummit() {
    const girlWrap = document.getElementById("top-balcony-girl");
    const summitBox = document.getElementById("tower-summit-box");

    if (girlWrap && !girlWrap.classList.contains("revealed")) {
      girlWrap.classList.add("revealed");
      if (typeof soundManager !== "undefined") soundManager.playSparkleSFX();
    }

    if (summitBox && !summitBox.classList.contains("visible")) {
      summitBox.classList.add("visible");
    }
  }
}
