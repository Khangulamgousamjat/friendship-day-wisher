/**
 * Friendship Day Experience - Customization Editor Controller
 * Handles form field bindings, localStorage sync, live modal preview, and JSON import/export.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editor-form");
  if (!form) return;

  populateFormFields();

  document.getElementById("save-btn")?.addEventListener("click", handleSave);
  document.getElementById("preview-btn")?.addEventListener("click", openPreviewModal);
  document.getElementById("export-btn")?.addEventListener("click", handleExportJSON);
  document.getElementById("import-btn")?.addEventListener("click", () => {
    document.getElementById("import-file-input")?.click();
  });
  document.getElementById("import-file-input")?.addEventListener("change", handleImportJSON);
  document.getElementById("reset-btn")?.addEventListener("click", handleReset);
  document.getElementById("modal-close-btn")?.addEventListener("click", closePreviewModal);
});

function populateFormFields() {
  setVal("friendName", CONFIG.friendName);
  setVal("pandaWelcome", CONFIG.pandaWelcome);
  setVal("pandaStory", CONFIG.pandaStory);
  setVal("buttonText", CONFIG.pandaButton);
  setVal("continueButtonText", CONFIG.continueButtonText);

  setVal("towerImage", CONFIG.towerImage || "assets/images/tower.svg");
  setVal("girlImage", CONFIG.girlImage || "assets/images/girl.svg");
  setVal("hairImage", CONFIG.hairImage || "assets/images/hair.svg");
  setVal("backgroundImage", CONFIG.backgroundImage || "assets/images/mountains.svg");

  const towerMsgs = CONFIG.towerMessages || [
    "Some friendships begin quietly.",
    "Some become unforgettable.",
    "Thank you for every smile.",
    "Thank you for always being there.",
    "Life is brighter because of you."
  ];

  for (let i = 0; i < 5; i++) {
    setVal(`towerMessage${i + 1}`, towerMsgs[i] || "");
  }

  setVal("finalTitle", CONFIG.finalTitle);
  setVal("finalMessage", CONFIG.finalMessage);
  setVal("shayariText", CONFIG.shayariText);
  setVal("themeSelect", CONFIG.theme || "golden");

  const musicChk = document.getElementById("music");
  if (musicChk) musicChk.checked = CONFIG.music !== false;

  setVal("lanternCount", CONFIG.lanternCount || 120);
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || "";
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function handleSave(e) {
  if (e) e.preventDefault();

  const updatedConfig = {
    friendName: getVal("friendName"),
    pandaWelcome: getVal("pandaWelcome"),
    pandaStory: getVal("pandaStory"),
    pandaButton: getVal("buttonText"),
    continueButtonText: getVal("continueButtonText"),

    towerImage: getVal("towerImage"),
    girlImage: getVal("girlImage"),
    hairImage: getVal("hairImage"),
    backgroundImage: getVal("backgroundImage"),

    towerMessages: [
      getVal("towerMessage1"),
      getVal("towerMessage2"),
      getVal("towerMessage3"),
      getVal("towerMessage4"),
      getVal("towerMessage5")
    ],

    finalTitle: getVal("finalTitle"),
    finalMessage: getVal("finalMessage"),
    shayariText: getVal("shayariText"),
    theme: getVal("themeSelect"),
    music: document.getElementById("music") ? document.getElementById("music").checked : true,
    lanternCount: parseInt(getVal("lanternCount")) || 120
  };

  try {
    Object.assign(CONFIG, updatedConfig);
    localStorage.setItem("friendshipDayConfig", JSON.stringify(CONFIG));
    showToast("✨ Configuration saved! index.html will automatically load your settings.");
    return true;
  } catch (err) {
    console.error("Save error:", err);
    showToast("❌ Failed to save configuration.", true);
    return false;
  }
}

function handleExportJSON(e) {
  if (e) e.preventDefault();
  handleSave();

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(CONFIG, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "friendship-config.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("📥 Exported friendship-config.json!");
}

function handleImportJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      Object.assign(CONFIG, imported);
      localStorage.setItem("friendshipDayConfig", JSON.stringify(CONFIG));
      populateFormFields();
      showToast("📤 JSON configuration imported successfully!");
    } catch (err) {
      showToast("❌ Invalid JSON file.", true);
    }
  };
  reader.readAsText(file);
}

function handleReset(e) {
  if (e) e.preventDefault();
  if (confirm("Reset all text and settings back to original defaults?")) {
    try {
      localStorage.removeItem("friendshipDayConfig");
      location.reload();
    } catch (err) {}
  }
}

function openPreviewModal(e) {
  if (e) e.preventDefault();
  handleSave();

  const modal = document.getElementById("preview-modal");
  const iframe = document.getElementById("preview-iframe");
  if (modal && iframe) {
    iframe.src = "loading.html?t=" + Date.now();
    modal.classList.add("open");
  }
}

function closePreviewModal() {
  const modal = document.getElementById("preview-modal");
  const iframe = document.getElementById("preview-iframe");
  if (modal) modal.classList.remove("open");
  if (iframe) iframe.src = "about:blank";
}

function showToast(msg, isError = false) {
  let toast = document.getElementById("editor-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "editor-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.className = `editor-toast-msg ${isError ? 'error' : 'success'} visible`;
  setTimeout(() => toast.classList.remove("visible"), 3800);
}
