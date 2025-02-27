document.addEventListener("DOMContentLoaded", function () {
  const lockScreen = document.getElementById("lockScreen");
  const unlockBtn = document.getElementById("unlockBtn");
  const passwordInput = document.getElementById("passwordInput");
  const content = document.getElementById("content");
  const matrixCanvas = document.getElementById("matrix");
  const ctx = matrixCanvas.getContext("2d");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsPanel = document.getElementById("settingsPanel");
  const colorPicker = document.getElementById("colorPicker");
  const fontSelector = document.getElementById("fontSelector");
  const closeSettings = document.getElementById("closeSettings");
  const feedback = document.getElementById("passwordFeedback");

  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;

  let matrixColor = "#00ffcc";
  let matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 16;
  const columns = matrixCanvas.width / fontSize;
  const drops = Array.from({ length: columns }).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    ctx.fillStyle = matrixColor;
    ctx.font = `${fontSize}px ${
      document.body.style.fontFamily || "Courier New"
    }`;

    for (let i = 0; i < drops.length; i++) {
      const text = matrixChars.charAt(
        Math.floor(Math.random() * matrixChars.length)
      );
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);

  unlockBtn.addEventListener("click", () => {
    if (passwordInput.value === "unlock") {
      feedback.textContent = "Access Granted";
      feedback.className = "password-feedback correct visible";

      lockScreen.style.animation = "gentleFadeOut 1s forwards";
      passwordInput.style.pointerEvents = "none";

      setTimeout(() => {
        lockScreen.style.display = "none";
        content.style.display = "block";
        content.style.animation = "gentleFadeIn 1s forwards";
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
      }, 1000);
    }
  });

  settingsBtn.addEventListener("click", () => {
    settingsPanel.classList.add("active");
  });

  closeSettings.addEventListener("click", () => {
    settingsPanel.classList.remove("active");
    setTimeout(() => {
      settingsPanel.style.display = "none";
    }, 400);
  });

  colorPicker.addEventListener("input", (event) => {
    matrixColor = event.target.value;
    document.documentElement.style.setProperty("--theme-color", matrixColor);
  });

  fontSelector.addEventListener("change", (event) => {
    document.body.style.fontFamily = event.target.value;
  });

  window.addEventListener("resize", () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
  });
});
