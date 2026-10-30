import confetti from 'canvas-confetti';

/**
 * Ոսկեզօծ և շքեղ կոնֆետիի անիմացիա (Luxury Gold & Emerald Confetti)
 */
export function fireCelebrationConfetti() {
  try {
    // Առաջին ալիք՝ ոսկեզօծ և շամպայն
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#D4AF37', '#F3E5AB', '#FFFFFF', '#255042', '#DFB2B5'],
      ticks: 200,
      gravity: 0.8,
      scalar: 1.1,
      disableForReducedMotion: true,
    });

    // Երկրորդ ալիք՝ կողային հրանոթներ
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#D4AF37', '#E5C158', '#F5EFE6'],
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#D4AF37', '#E5C158', '#F5EFE6'],
        disableForReducedMotion: true,
      });
    }, 250);
  } catch (err) {
    console.warn("Confetti effect unavailable:", err);
  }
}

export function fireGentleSparkles() {
  try {
    confetti({
      particleCount: 35,
      spread: 45,
      startVelocity: 25,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#FFFFFF', '#E6C687'],
      ticks: 120,
      gravity: 0.6,
      shapes: ['circle'],
      scalar: 0.8,
      disableForReducedMotion: true,
    });
  } catch (err) {
    console.warn("Sparkle effect unavailable:", err);
  }
}
