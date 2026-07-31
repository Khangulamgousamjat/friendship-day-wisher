/**
 * Friendship Day Experience - Configuration System
 * Automatically loads saved configuration from localStorage, Base64 URL params, or DEFAULT_CONFIG.
 */

const DEFAULT_CONFIG = {
  friendName: "Bestie ❤️",
  pandaWelcome: "Happy Friendship Day!",
  pandaStory: "I found a magical adventure just for you.",
  pandaButton: "Let's Go Together",

  adventureMessages: [
    "Come with me... I have something special.",
    "Some friendships... make every day brighter.",
    "We've crossed many moments together."
  ],

  towerMessages: [
    "Some friendships begin quietly.",
    "Some become unforgettable.",
    "Thank you for every smile.",
    "Thank you for always being there.",
    "Life is brighter because of you."
  ],

  finalTitle: "Happy Friendship Day ❤️",
  finalMessage: "Thank you for being one of my favorite people.",

  theme: "golden",
  music: true,
  lanternCount: 120
};

// Safe HTML sanitizer helper
function sanitizeText(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Deep load configuration from URL, localStorage, or Defaults
function loadConfig() {
  let merged = { ...DEFAULT_CONFIG };

  // 1. Load from localStorage ("friendshipDayConfig")
  try {
    const localData = localStorage.getItem("friendshipDayConfig");
    if (localData) {
      const parsedLocal = JSON.parse(localData);
      merged = { ...merged, ...parsedLocal };
    }
  } catch (e) {
    console.warn("Could not read localStorage config:", e);
  }

  // 2. Load from Base64 URL parameter ?data=
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get("data");
    if (dataParam) {
      const decodedJson = atob(decodeURIComponent(dataParam));
      const parsedUrlData = JSON.parse(decodedJson);
      merged = { ...merged, ...parsedUrlData };
    }
  } catch (e) {
    console.warn("Could not parse URL data parameter:", e);
  }

  return merged;
}

// Current runtime CONFIG object loaded automatically
const CONFIG = loadConfig();

// Save new configuration to localStorage
function saveConfig(newConfig) {
  try {
    Object.assign(CONFIG, newConfig);
    localStorage.setItem("friendshipDayConfig", JSON.stringify(CONFIG));
    return true;
  } catch (e) {
    console.error("Failed to save config:", e);
    return false;
  }
}

// Reset configuration back to defaults
function resetConfig() {
  try {
    localStorage.removeItem("friendshipDayConfig");
    Object.assign(CONFIG, DEFAULT_CONFIG);
    return true;
  } catch (e) {
    console.error("Failed to reset config:", e);
    return false;
  }
}
