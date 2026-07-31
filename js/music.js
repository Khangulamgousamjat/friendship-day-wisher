/**
 * Friendship Day Experience - Web Audio Music & Sound Manager (Phase 5)
 * Manages soft piano, strings, ambient wind, and audio preferences in localStorage.
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;

    // Read stored preference
    let savedMute = false;
    try {
      const stored = localStorage.getItem("friendshipMusicMuted");
      savedMute = stored !== null ? stored === "true" : !CONFIG.music;
    } catch (e) {
      savedMute = !CONFIG.music;
    }
    this.isMuted = savedMute;
    this.currentEnvironment = "forest";
    this.ambientInterval = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  }

  startMusic() {
    this.init();
    if (!this.ctx || this.isPlaying || this.isMuted) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.startAmbientLoop();
  }

  toggleMusic() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem("friendshipMusicMuted", String(this.isMuted));
    } catch (e) {}

    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.15;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.4);
    }
    if (!this.isPlaying && !this.isMuted) {
      this.startMusic();
    }
    return !this.isMuted;
  }

  setEnvironment(env) {
    if (this.currentEnvironment === env) return;
    this.currentEnvironment = env;
  }

  startAmbientLoop() {
    const playTone = () => {
      if (!this.isPlaying || !this.ctx || this.isMuted) return;

      let freqBase = 261.63; // Forest Piano
      if (this.currentEnvironment === "garden") freqBase = 329.63;
      else if (this.currentEnvironment === "bridge") freqBase = 293.66;
      else if (this.currentEnvironment === "meadow") freqBase = 392.00;
      else if (this.currentEnvironment === "cloud" || this.currentEnvironment === "tower") freqBase = 523.25;
      else if (this.currentEnvironment === "finale") freqBase = 440.00; // Soft Finale Strings/Piano

      const freq = freqBase * (Math.random() < 0.5 ? 1 : 1.25);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = (this.currentEnvironment === "cloud" || this.currentEnvironment === "finale") ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 1.5);
      gain.gain.linearRampToValueAtTime(0, now + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.6);
    };

    playTone();
    this.ambientInterval = setInterval(playTone, 2200);
  }

  playSparkleSFX() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, i) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.7);
      }, i * 60);
    });
  }
}

const soundManager = new SoundManager();
