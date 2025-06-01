// Desktop Keyboard Support
window.addEventListener('keydown', e => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
});

// Mobile / Touch Support
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', playSound);
  key.addEventListener('touchstart', playSound);
});

function playSound(e) {

  if (e.type === 'touchstart') e.preventDefault();

  const keyCode = this.dataset.key;
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  
  if (!audio) return;

  audio.currentTime = 0;
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log("Playback failed:", error);
      
    });
  }
}
