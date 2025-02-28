document.addEventListener("DOMContentLoaded", function () {
  // Only run on pages with lock screen
  const lockScreen = document.getElementById("lockScreen");
  if (lockScreen) {
    // Lock screen setup code
    const unlockBtn = document.getElementById("unlockBtn");
    const passwordInput = document.getElementById("passwordInput");
    const content = document.getElementById("content");
    const feedback = document.getElementById("passwordFeedback");
    const titleElement = document.getElementById("macUnlockedTitle");

    // Password Authentication Handler
    function handleUnlock() {
      const password = passwordInput.value.trim();

      if (password === "unlock") {
        feedback.textContent = "Access Granted";
        feedback.className = "password-feedback correct visible";
        lockScreen.style.animation = "gentleFadeOut 1s forwards";
        passwordInput.disabled = true;

        setTimeout(() => {
          lockScreen.style.display = "none";
          content.style.display = "block";
          content.style.animation = "gentleFadeIn 1s forwards";
          passwordInput.value = "";
        }, 1000);
      } else {
        feedback.textContent = "Access Denied";
        feedback.className = "password-feedback incorrect visible";
        unlockBtn.classList.add("shake-lock");
        passwordInput.classList.add("shake-lock");

        setTimeout(() => {
          feedback.className = "password-feedback";
          unlockBtn.classList.remove("shake-lock");
          passwordInput.classList.remove("shake-lock");
          passwordInput.value = "";
        }, 1000);
      }
    }

    // Event Listeners for lock screen
    unlockBtn.addEventListener("click", handleUnlock);
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleUnlock();
    });
  }

  // Matrix effect only for index page
  const matrixCanvas = document.getElementById("matrix");
  if (matrixCanvas && window.location.pathname === "/") {
    const ctx = matrixCanvas.getContext("2d");

    // Matrix Effect Configuration
    let matrixColor = "#00ffcc";
    let matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    let columns = matrixCanvas.width / fontSize;
    let drops = Array.from({ length: columns }).fill(1);

    // Initialize Canvas
    function initMatrix() {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
      columns = matrixCanvas.width / fontSize;
      drops = Array.from({ length: columns }).fill(1);
    }
    initMatrix();

    // Matrix Animation Loop
    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      ctx.fillStyle = matrixColor;
      ctx.font = `${fontSize}px ${
        document.body.style.fontFamily || "Courier New"
      }`;

      drops.forEach((drop, i) => {
        const text = matrixChars.charAt(
          Math.floor(Math.random() * matrixChars.length)
        );
        ctx.fillText(text, i * fontSize, drop * fontSize);

        if (drop * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    }
    const matrixInterval = setInterval(drawMatrix, 50);

    // Settings related to matrix effect
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsPanel = document.getElementById("settingsPanel");
    const colorPicker = document.getElementById("colorPicker");
    const fontSelector = document.getElementById("fontSelector");
    const closeSettings = document.getElementById("closeSettings");

    // Toggle settings panel
    function toggleSettings(show) {
      if (show) {
        settingsPanel.style.display = "block";
        setTimeout(() => settingsPanel.classList.add("active"), 10);
      } else {
        settingsPanel.classList.remove("active");
        setTimeout(() => {
          settingsPanel.style.display = "none";
        }, 300);
      }
    }

    // Settings Event Listeners
    settingsBtn.addEventListener("click", () => toggleSettings(true));
    closeSettings.addEventListener("click", () => toggleSettings(false));

    colorPicker.addEventListener("input", (e) => {
      matrixColor = e.target.value;
      document.documentElement.style.setProperty("--theme-color", matrixColor);
      titleElement.style.textShadow = `0 0 30px ${matrixColor}, 0 0 60px ${matrixColor}`;
    });

    fontSelector.addEventListener("change", (e) => {
      document.body.style.fontFamily = e.target.value;
    });

    // Window Resize Handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initMatrix();
        ctx.font = `${fontSize}px ${
          document.body.style.fontFamily || "Courier New"
        }`;
      }, 200);
    });

    // Initial Setup
    document.documentElement.style.setProperty("--theme-color", matrixColor);
    titleElement.style.textShadow = `0 0 30px ${matrixColor}, 0 0 60px ${matrixColor}`;
  }
});
  // Add other page handling as needed
}
