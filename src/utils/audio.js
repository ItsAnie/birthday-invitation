/**
 * Web Audio API-ով ստեղծված նուրբ և շքեղ երաժշտական նվագարկիչ
 * Չունի արտաքին mp3 ֆայլերի կախվածություն (երբեք չի խափանվում CORS կամ 404 պատճառով)
 */

let audioCtx = null;
let ambientInterval = null;
let isPlayingAmbient = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Նուրբ զանգակային ակորդ ծրարը բացելիս (Chime on Envelope Open)
 */
export function playEnvelopeOpenSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Հարմոնիկ նոտաներ՝ C5, E5, G5, B5, C6 (հարուստ երանգներ)
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 1.3);
    });
  } catch (err) {
    console.warn("Audio chime playback error:", err);
  }
}

/**
 * Նուրբ մեղեդիական ֆոնային երաժշտություն (Ambient Piano / Harp notes)
 */
const ambientChords = [
  // Am9
  [220, 261.63, 329.63, 392.00, 493.88],
  // Fmaj7
  [174.61, 220, 261.63, 329.63, 392.00],
  // Cmaj9
  [261.63, 329.63, 392.00, 493.88, 587.33],
  // Gsus4 -> G
  [196.00, 261.63, 293.66, 392.00, 493.88],
];

let chordStep = 0;

export function startAmbientMusic() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (isPlayingAmbient) return true;
    isPlayingAmbient = true;

    const playChordArpeggio = () => {
      if (!isPlayingAmbient) return;
      const currentChord = ambientChords[chordStep % ambientChords.length];
      chordStep++;
      const now = ctx.currentTime;

      currentChord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Մեղմ, դասական երանգ (triangle / sine)
        osc.type = idx % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.35);

        gain.gain.setValueAtTime(0, now + idx * 0.35);
        gain.gain.linearRampToValueAtTime(0.045, now + idx * 0.35 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.35 + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.35);
        osc.stop(now + idx * 0.35 + 3.0);
      });
    };

    playChordArpeggio();
    ambientInterval = setInterval(playChordArpeggio, 3200);
    return true;
  } catch (e) {
    console.warn("Ambient music error:", e);
    return false;
  }
}

export function stopAmbientMusic() {
  isPlayingAmbient = false;
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
}

export function toggleAmbientMusic() {
  if (isPlayingAmbient) {
    stopAmbientMusic();
    return false;
  } else {
    return startAmbientMusic();
  }
}

export function getAmbientStatus() {
  return isPlayingAmbient;
}
