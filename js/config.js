/**
 * Friendship Day Experience - Central Configuration System
 * Single source of truth for all copy, image paths, button text, and theme settings.
 */

const DEFAULT_CONFIG = {
  friendName: "Bestie ❤️",
  pandaWelcome: "Happy Friendship Day!",
  pandaStory: "I found a magical adventure just for you.",
  pandaButton: "Let's Go Together",
  continueButtonText: "Continue the Adventure 🏰",

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
  finalMessage: "Thank you for being one of my favorite people. Every moment spent together is a gift, and I am so grateful to have you in my life.",
  shayariText: "Dosti sirf ek rishta nahi,\nZindagi ki sabse khoobsurat yaad hoti hai.\nHar muskaan mein tera hissa rahe,\nHar dua mein tera naam rahe.",

  // Assets (Redesign paths)
  towerImage: "assets/images/tower.png",
  jungleImage: "assets/images/jungle-background.png",
  waterfallImage: "assets/images/waterfall.png",
  girlImage: "assets/images/girl.svg",
  hairImage: "assets/images/hair.svg",
  backgroundImage: "assets/images/mountains.svg",

  theme: "golden",
  music: true,
  lanternCount: 120
};

function sanitizeText(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function loadConfig() {
  let merged = { ...DEFAULT_CONFIG };

  try {
    const localData = localStorage.getItem("friendshipDayConfig");
    if (localData) {
      const parsedLocal = JSON.parse(localData);
      merged = { ...merged, ...parsedLocal };
    }
  } catch (e) {
    console.warn("Could not read localStorage config:", e);
  }

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

const CONFIG = loadConfig();

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
