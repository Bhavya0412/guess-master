// ==================
// GAME SETUP
// ==================

let randomNumber = generateNumber();
let attempts = 0;
let maxAttempts = 10;
let soundOn = true;

function generateNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// ==================
// SOUND SYSTEM
// ==================

function playSound(id) {
  if (!soundOn) return;

  const sound = document.getElementById(id);
  if (!sound) return;

  sound.currentTime = 0;
  sound.play().catch(() => { }); // prevents browser autoplay errors
}

// ==================
// GAME LOGIC
// ==================

function checkGuess() {
  const input = document.getElementById("guessInput");
  const result = document.getElementById("result");
  const container = document.querySelector(".container");

  const guess = Number(input.value);

  // ❌ validation
  if (!guess || guess < 1 || guess > 100) {
    result.innerText = "⚠️ Enter a number between 1-100";
    return;
  }

  attempts++;

  if (guess === randomNumber) {
    result.innerText = `🎉 You Win in ${attempts} attempts!`;
    container.classList.add("win");
    playSound("winSound");
    disableGame();
  }
  else if (attempts >= maxAttempts) {
    result.innerText = `💀 You Lost! Number was ${randomNumber}`;
    playSound("loseSound");
    flashScreen();
    disableGame();
  }
  else {
    result.innerText = guess > randomNumber
      ? "📉 Too High!"
      : "📈 Too Low!";
    playSound("loseSound");
    flashScreen();
  }

  input.value = "";
}

// ==================
// GAME CONTROL
// ==================

function disableGame() {
  document.getElementById("guessInput").disabled = true;
}

function resetGame() {
  randomNumber = generateNumber();
  attempts = 0;

  document.getElementById("guessInput").disabled = false;
  document.getElementById("result").innerText = "";
  document.querySelector(".container").classList.remove("win");
}

// ==================
// VISUAL EFFECTS
// ==================

function flashScreen() {
  document.body.style.background = "#7f1d1d";
  setTimeout(() => {
    document.body.style.background = "#020617";
  }, 150);
}

// ==================
// BACKGROUND ANIMATION
// ==================

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

window.addEventListener("resize", resizeCanvas);

function initParticles() {
  particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2,
      dx: Math.random() - 0.5,
      dy: Math.random() - 0.5
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#3b82f6";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    // bounce edges
    if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
    if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animate);
}

// ==================
// INIT
// ==================

resizeCanvas();
animate();