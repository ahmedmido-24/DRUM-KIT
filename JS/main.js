document.addEventListener('DOMContentLoaded', () => {
  //  Remove transition class after animation ends
  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  //  Main playSound function (works for both keydown + touch/click)
  function playSound(e) {
    let keyCode;

    // Detect input type: keyboard vs mouse/touch
    if (e.type === 'keydown') {
      keyCode = e.keyCode;
    } else {
      if (e.type === 'touchstart') e.preventDefault();
      keyCode = this.getAttribute('data-key');
    }

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`div[data-key="${keyCode}"]`);
    if (!audio || !key) return;

    key.classList.add('playing');
    audio.currentTime = 0;

    try {
      audio.play().catch(err => {
        console.warn("Audio play failed:", err);
      });
    } catch (err) {
      console.warn("Playback error:", err);
    }
  }

  //  Keyboard support
  window.addEventListener('keydown', playSound);

  //  Touch and Click support
  document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', playSound);
    key.addEventListener('touchstart', playSound);
    key.addEventListener('transitionend', removeTransition);
  });
});
