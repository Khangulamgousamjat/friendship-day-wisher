/**
 * Friendship Day Experience - Utilities
 * Math, DOM, and timing helpers.
 */

const Utils = {
  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  },

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  },

  randomRange(min, max) {
    return Math.random() * (max - min) + min;
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
};
