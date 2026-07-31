/**
 * Friendship Day Experience - State & Replay Manager (§8.5)
 * Tracks active section, handles deep-linking (?section=tower), and manages reset/replay state.
 */

class StateManager {
  constructor() {
    this.currentSection = "panda-world";
    this.hasVisited = false;
    this.init();
  }

  init() {
    try {
      this.hasVisited = localStorage.getItem("hasVisited") === "true";
      localStorage.setItem("hasVisited", "true");
    } catch (e) {}

    // Check for deep-linking parameter ?section=tower
    const params = new URLSearchParams(window.location.search);
    const sectionParam = params.get("section");
    if (sectionParam) {
      this.targetSection = sectionParam;
    }
  }

  setCurrentSection(sectionId) {
    if (this.currentSection !== sectionId) {
      this.currentSection = sectionId;
    }
  }

  resetExperience() {
    this.setCurrentSection("panda-world");
  }
}

const stateManager = new StateManager();
