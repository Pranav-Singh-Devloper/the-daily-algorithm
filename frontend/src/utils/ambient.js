let audio = null;
let fade = null;

export const AMBIENT_VOLUME = 0.14;

export function getAudio() {
  if (!audio) {
    audio = new Audio("/audio/jazz-loop.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    window.__ambient = audio; // debug/testing hook
  }
  return audio;
}

export function isOn() {
  return localStorage.getItem("ambient") !== "off";
}

export function setOn(on) {
  localStorage.setItem("ambient", on ? "on" : "off");
}

export function fadeTo(target, ms = 1500) {
  const a = getAudio();
  clearInterval(fade);
  const from = a.volume;
  const t0 = performance.now();
  fade = setInterval(() => {
    const p = Math.min(1, (performance.now() - t0) / ms);
    a.volume = +(from + (target - from) * p).toFixed(3);
    if (p >= 1) clearInterval(fade);
  }, 60);
}

export async function startAmbient() {
  const a = getAudio();
  try {
    await a.play();
    fadeTo(AMBIENT_VOLUME);
    return true;
  } catch {
    return false;
  }
}

export function stopAmbient() {
  fadeTo(0, 900);
  const a = getAudio();
  setTimeout(() => a.pause(), 950);
}
