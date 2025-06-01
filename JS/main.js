document.addEventListener('DOMContentLoaded', () => {
  // Keyboard support for desktops
  window.addEventListener('keydown', e => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  });

  // Mobile support: click or touch
  document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', playSound);
    key.addEventListener('touchstart', playSound);
  });

  function playSound(e) {
    // Prevent default scrolling on touch
    if (e.type === 'touchstart') e.preventDefault();

    const keyCode = this.getAttribute('data-key');
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if (!audio) return;

    audio.currentTime = 0;

    // Some Android browsers need play() to be in try-catch
    try {
      audio.play().catch(err => {
        console.warn("Audio play failed:", err);
      });
    } catch (err) {
      console.warn("Playback error:", err);
    }
  }
});


function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
