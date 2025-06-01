// Desktop Keyboard Support
    window.addEventListener('keydown', e => {
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    });

    // Mobile Touch Support
    document.querySelectorAll('.sound').forEach(key => {
      key.addEventListener('click', playSound);
      key.addEventListener('touchstart', playSound);
    });

    function playSound(e) {
      // Prevent mobile scrolling
      e.preventDefault();
      
      const keyCode = this.dataset.key;
      const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
      
      if (!audio) return;
      
      // Reset and play
      audio.currentTime = 0;
      const playPromise = audio.play();
      
      // Handle play() promise for modern browsers
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Playback failed:", error);
          // Show user instruction to interact first
        });
      }
    }
