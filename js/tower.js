/**
 * Friendship Day Experience - Message Reveal System (Phase 4 Focus)
 * Reads all 5 messages from config.js, renders 5 alternating glass cards with blur, fade, scale, glow, float,
 * and ensures only one message is visible at a time.
 */

class TowerController {
  constructor(containerId = "tower-container", messagesId = "tower-messages") {
    this.container = document.getElementById(containerId);
    this.messagesContainer = document.getElementById(messagesId);
    this.sparklesInterval = null;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderTowerScene();
    this.renderTowerMessages();
    this.setupHairPhysics();
    this.startSparkleGenerator();
  }

  renderTowerScene() {
    this.container.innerHTML = `
      <!-- Camera World Layer -->
      <div id="tower-camera-world" class="tower-world">

        <!-- Original Fairytale Tower -->
        <div class="fantasy-tower stone-texture">
          <div class="tower-roof">
            <span class="roof-star">⭐</span>
          </div>

          <div id="tower-top-window" class="tower-top-window glowing-window">
            <div class="window-light-burst"></div>
            <div class="window-arch">🪟</div>
          </div>

          <div class="tower-body-wall">
            <div class="ivy-vines left-ivy">🌿 🌿 🌿 🌿</div>
            <div class="ivy-vines right-ivy">🌿 🌿 🌿 🌿</div>

            <div class="wooden-window glowing-window w1">🪟</div>
            <div class="wooden-window glowing-window w2">🪟</div>
            <div class="wooden-window glowing-window w3">🪟</div>
          </div>

          <div class="tower-base-wall">
            <div class="flower-pots">🌸 🌺 🌼 🌸 🌺</div>
          </div>
        </div>

        <!-- SVG Golden Braid Cascade -->
        <svg id="golden-hair-svg" class="hair-braid-svg" viewBox="0 0 300 1300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hairGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF5B8"/>
              <stop offset="50%" stop-color="#FFD54F"/>
              <stop offset="100%" stop-color="#FF9E00"/>
            </linearGradient>
            <filter id="hairGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="7" flood-color="#FFD86B" flood-opacity="0.85"/>
            </filter>
          </defs>

          <g id="hair-braid-group" filter="url(#hairGlow)">
            ${Array.from({ length: 15 }).map((_, i) => `
              <g id="hair-segment-${i}" class="hair-seg" transform-origin="150 ${110 + i * 78}">
                <path d="M 150 ${110 + i * 78} Q ${162 + (i % 2 === 0 ? 20 : -20)} ${148 + i * 78} 150 ${188 + i * 78}" stroke="url(#hairGoldGrad)" stroke-width="15" stroke-linecap="round" fill="none"/>
                <circle cx="${150 + (i % 2 === 0 ? 15 : -15)}" cy="${148 + i * 78}" r="8" fill="${i % 3 === 0 ? '#FFB7C5' : (i % 3 === 1 ? '#DCCBFF' : '#FFD54F')}"/>
                <circle cx="${150 + (i % 2 === 0 ? 15 : -15)}" cy="${148 + i * 78}" r="3" fill="#FFFFFF"/>
              </g>
            `).join('')}
          </g>
        </svg>

        <div id="tower-sparkles-container"></div>
      </div>
    `;
  }

  // Render 5 Glass Cards read from CONFIG.towerMessages
  renderTowerMessages() {
    if (!this.messagesContainer) return;

    // Read all messages from config.js
    const messages = CONFIG.towerMessages || [
      "Some friendships begin quietly.",
      "Some become unforgettable.",
      "Thank you for every smile.",
      "Thank you for always being there.",
      "Life is brighter because of you."
    ];

    // Alternating left/right positioning
    const positions = [
      { top: "18%", left: "5%" },
      { top: "35%", right: "5%" },
      { top: "52%", left: "5%" },
      { top: "68%", right: "5%" },
      { top: "84%", left: "5%" }
    ];

    this.messagesContainer.innerHTML = messages.map((msg, idx) => {
      const pos = positions[idx] || { top: `${18 + idx * 16}%`, left: "5%" };
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

  setupHairPhysics() {
    if (typeof gsap === "undefined") return;

    for (let i = 0; i < 15; i++) {
      const seg = document.getElementById(`hair-segment-${i}`);
      if (!seg) continue;

      gsap.to(seg, {
        rotate: i % 2 === 0 ? 4.0 : -4.0,
        duration: 3.2,
        delay: i * 0.025,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }

  startSparkleGenerator() {
    const container = document.getElementById("tower-sparkles-container");
    if (!container) return;

    this.sparklesInterval = setInterval(() => {
      const sp = document.createElement("div");
      sp.className = "tower-sparkle-particle";
      sp.textContent = Math.random() < 0.5 ? "✨" : "⭐";
      sp.style.left = `${Utils.randomRange(35, 65)}%`;
      sp.style.top = `${Utils.randomRange(10, 90)}%`;

      container.appendChild(sp);
      setTimeout(() => sp.remove(), 2000);
    }, 450);
  }
}
