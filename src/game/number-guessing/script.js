const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const restartButton = document.getElementById("restart-button");
const feedbackMessage = document.getElementById("feedback-message");
const errorMessage = document.getElementById("error-message");
const attemptCount = document.getElementById("attempt-count");

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const MAX_ATTEMPTS = 100;

let secretNumber = 0;
let attempts = 0;
let gameOver = false;

function createSecretNumber() {
  return Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
}

function updateAttempts() {
  attemptCount.textContent = `${attempts} / ${MAX_ATTEMPTS}`;
}

function setFeedback(message, type = "default") {
  feedbackMessage.textContent = message;
  feedbackMessage.className = `message feedback${type === "default" ? "" : ` ${type}`}`;
}

function setError(message = "") {
  errorMessage.textContent = message;
}

function disableGame() {
  gameOver = true;
  guessInput.disabled = true;
  submitButton.disabled = true;
}

function enableGame() {
  gameOver = false;
  guessInput.disabled = false;
  submitButton.disabled = false;
}

function resetGame() {
  secretNumber = createSecretNumber();
  attempts = 0;
  enableGame();
  guessForm.reset();
  updateAttempts();
  setError();
  setFeedback("Make your first guess.");
  guessInput.focus();
}

function validateGuess(value) {
  if (value.trim() === "") {
    return "Please enter a number.";
  }

  const guess = Number(value);

  if (!Number.isInteger(guess)) {
    return "Enter a whole number only.";
  }

  if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
    return "Guess must be between 1 and 100.";
  }

  return "";
}

guessForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (gameOver) {
    return;
  }

  const rawGuess = guessInput.value;
  const validationMessage = validateGuess(rawGuess);

  if (validationMessage) {
    setError(validationMessage);
    setFeedback("Waiting for a valid guess.", "limit");
    return;
  }

  setError();

  const guess = Number(rawGuess);
  attempts += 1;
  updateAttempts();

  if (guess === secretNumber) {
    setFeedback("Correct", "correct");
    disableGame();
    return;
  }

  if (attempts >= MAX_ATTEMPTS) {
    setFeedback(`No attempts left. The number was ${secretNumber}.`, "limit");
    disableGame();
    return;
  }

  if (guess > secretNumber) {
    setFeedback("Lower");
  } else {
    setFeedback("Higher");
  }

  guessForm.reset();
  guessInput.focus();
});

restartButton.addEventListener("click", resetGame);

resetGame();