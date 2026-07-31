/**
 * Friendship Day Experience - Redesigned Tall Tower & Camera Climb Controller
 * Guarantees 100% reliable rendering of 3500px fairytale tower, golden hair braid,
 * balcony girl reveal, and 5 alternating glass message cards.
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
    this.container.innerHTML = `
      <!-- Multi-Layer Background Parallax -->
      <div id="tower-bg-parallax" class="tower-bg-parallax-layer">
        <div class="parallax-mountains"></div>
        <div class="parallax-cloud-1">☁️</div>
        <div class="parallax-cloud-2">☁️</div>
      </div>

      <!-- Camera World Container (Translates vertically as user scrolls down 450vh) -->
      <div id="tower-camera-world" class="tall-tower-world">

        <!-- 3500px Tall Fairytale Tower SVG Vector -->
        <div class="tall-tower-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 3500" class="tall-tower-img" preserveAspectRatio="xMidYMin meet">
            <defs>
              <linearGradient id="towerWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#DCD2C0"/>
                <stop offset="40%" stop-color="#E8E0D0"/>
                <stop offset="80%" stop-color="#CFC4B0"/>
                <stop offset="100%" stop-color="#B8AC98"/>
              </linearGradient>
              <linearGradient id="towerRoofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#A2674B"/>
                <stop offset="100%" stop-color="#6E3D27"/>
              </linearGradient>
              <linearGradient id="towerWindowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFF3A7"/>
                <stop offset="100%" stop-color="#FFB703"/>
              </linearGradient>
              <filter id="windowSoftGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="14" flood-color="#FFD54F" flood-opacity="0.85"/>
              </filter>
            </defs>

            <!-- Ground Base (3000px to 3500px) -->
            <ellipse cx="300" cy="3470" rx="280" ry="25" fill="#8FA982" opacity="0.85"/>
            <path d="M 120 3500 L 140 3100 L 460 3100 L 480 3500 Z" fill="url(#towerWallGrad)"/>
            <path d="M 230 3500 L 230 3320 Q 300 3270 370 3320 L 370 3500 Z" fill="#543A29" stroke="#3D291C" stroke-width="6"/>
            <circle cx="348" cy="3410" r="7" fill="#FFD54F"/>
            <text x="140" y="3480" font-size="32">🌸🌺🌼🌸🌺🌼</text>
            <text x="360" y="3480" font-size="32">🌺🌼🌸🌺🌼🌸</text>

            <!-- Lower Tower Body (2000px to 3100px) -->
            <rect x="140" y="2000" width="320" height="1100" fill="url(#towerWallGrad)"/>
            <path d="M 140 2200 L 460 2200 M 140 2400 L 460 2400 M 140 2600 L 460 2600 M 140 2800 L 460 2800 M 140 3000 L 460 3000" stroke="rgba(0,0,0,0.08)" stroke-width="3" stroke-dasharray="15,10"/>
            <rect x="235" y="2850" width="130" height="180" rx="65" fill="url(#towerWindowGlow)" stroke="#543A29" stroke-width="6" filter="url(#windowSoftGlow)"/>
            <rect x="235" y="2450" width="130" height="180" rx="65" fill="url(#towerWindowGlow)" stroke="#543A29" stroke-width="6" filter="url(#windowSoftGlow)"/>
            <rect x="235" y="2050" width="130" height="180" rx="65" fill="url(#towerWindowGlow)" stroke="#543A29" stroke-width="6" filter="url(#windowSoftGlow)"/>
            <path d="M 135 2000 Q 110 2400 135 2800 Q 150 3100 135 3400" stroke="#5D8A4E" stroke-width="12" fill="none" stroke-linecap="round"/>
            <text x="110" y="2200" font-size="28">🌿🌿🌿</text>
            <text x="110" y="2600" font-size="28">🌿🌿🌿</text>
            <text x="110" y="3000" font-size="28">🌿🌿🌿</text>

            <!-- Mid Tower Body (800px to 2000px) -->
            <rect x="150" y="800" width="300" height="1200" fill="url(#towerWallGrad)"/>
            <rect x="235" y="1650" width="130" height="180" rx="65" fill="url(#towerWindowGlow)" stroke="#543A29" stroke-width="6" filter="url(#windowSoftGlow)"/>
            <rect x="235" y="1250" width="130" height="180" rx="65" fill="url(#towerWindowGlow)" stroke="#543A29" stroke-width="6" filter="url(#windowSoftGlow)"/>
            <rect x="235" y="850" width="130" height="180" rx="65" fill="url(#towerWindowGlow)" stroke="#543A29" stroke-width="6" filter="url(#windowSoftGlow)"/>
            <path d="M 465 800 Q 485 1400 465 2000 Q 450 2600 465 3200" stroke="#5D8A4E" stroke-width="12" fill="none" stroke-linecap="round"/>
            <text x="450" y="1000" font-size="28">🌿🌿🌿</text>
            <text x="450" y="1500" font-size="28">🌿🌿🌿</text>
            <text x="450" y="2000" font-size="28">🌿🌿🌿</text>

            <!-- Top Tower & Balcony Window (150px to 800px) -->
            <rect x="120" y="420" width="360" height="35" rx="8" fill="#A09380" stroke="#543A29" stroke-width="4"/>
            <path d="M 120 420 L 120 380 L 480 380 L 480 420 Z" fill="#B0A390"/>
            <path d="M 130 380 L 470 380 M 150 420 L 150 380 M 200 420 L 200 380 M 250 420 L 250 380 M 300 420 L 300 380 M 350 420 L 350 380 M 400 420 L 400 380 M 450 420 L 450 380" stroke="#543A29" stroke-width="5"/>
            <rect x="210" y="180" width="180" height="230" rx="90" fill="url(#towerWindowGlow)" stroke="#543A29" stroke-width="8" filter="url(#windowSoftGlow)"/>
            <text x="140" y="415" font-size="26">🌸🌺🌼🌸🌺🌼🌸</text>
            <path d="M 140 180 L 300 20 L 460 180 Z" fill="url(#towerRoofGrad)"/>
            <circle cx="300" cy="18" r="12" fill="#FFD54F" filter="url(#windowSoftGlow)"/>
            <text x="286" y="-5" font-size="30">⭐</text>
          </svg>

          <!-- Overlaid Separate Hair Braid Layer -->
          <div id="overlaid-hair-layer" class="overlaid-hair-wrap">
            <svg viewBox="0 0 240 2800" class="golden-hair-img" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hairGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FFF8D6"/>
                  <stop offset="50%" stop-color="#FFD54F"/>
                  <stop offset="100%" stop-color="#FF9E00"/>
                </linearGradient>
                <filter id="hairGlowEffect">
                  <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#FFD86B" flood-opacity="0.85"/>
                </filter>
              </defs>
              <g filter="url(#hairGlowEffect)">
                ${Array.from({ length: 32 }).map((_, i) => `
                  <g transform-origin="120 ${80 + i * 85}">
                    <path d="M 120 ${80 + i * 85} Q ${132 + (i % 2 === 0 ? 22 : -22)} ${122 + i * 85} 120 ${165 + i * 85}" stroke="url(#hairGradGold)" stroke-width="16" stroke-linecap="round" fill="none"/>
                    <circle cx="${120 + (i % 2 === 0 ? 16 : -16)}" cy="${122 + i * 85}" r="8" fill="${i % 3 === 0 ? '#FFB7C5' : (i % 3 === 1 ? '#DCCBFF' : '#FFD54F')}"/>
                    <circle cx="${120 + (i % 2 === 0 ? 16 : -16)}" cy="${122 + i * 85}" r="3" fill="#FFFFFF"/>
                  </g>
                `).join('')}
              </g>
            </svg>
          </div>

          <!-- Overlaid Girl on Top Balcony (Initially Hidden) -->
          <div id="top-balcony-girl" class="top-balcony-girl-wrap">
            <div class="balcony-golden-light"></div>
            <svg viewBox="0 0 160 220" class="balcony-girl-img">
              <g filter="url(#windowSoftGlow)">
                <path d="M 50 120 Q 80 110 110 120 L 125 210 Q 80 220 35 210 Z" fill="#FFB7C5"/>
                <path d="M 60 75 Q 80 70 100 75 L 105 120 Q 80 125 55 120 Z" fill="#FFF5F7"/>
                <circle cx="80" cy="45" r="24" fill="#FFDFC4"/>
                <ellipse cx="72" cy="42" rx="3" ry="4" fill="#3D291C"/>
                <ellipse cx="88" cy="42" rx="3" ry="4" fill="#3D291C"/>
                <circle cx="70" cy="40" r="1.2" fill="#FFFFFF"/>
                <circle cx="86" cy="40" r="1.2" fill="#FFFFFF"/>
                <ellipse cx="66" cy="50" rx="4" ry="2.5" fill="#FF9BBB" opacity="0.7"/>
                <ellipse cx="94" cy="50" rx="4" ry="2.5" fill="#FF9BBB" opacity="0.7"/>
                <path d="M 74 54 Q 80 60 86 54" fill="none" stroke="#3D291C" stroke-width="2" stroke-linecap="round"/>
                <text x="62" y="28" font-size="16">🌸✨🌸</text>
                <path d="M 58 80 Q 40 95 48 115" stroke="#FFDFC4" stroke-width="7" stroke-linecap="round" fill="none"/>
                <path d="M 102 80 Q 120 95 112 115" stroke="#FFDFC4" stroke-width="7" stroke-linecap="round" fill="none"/>
              </g>
            </svg>
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
