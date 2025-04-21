const yellow = document.getElementById("yellowCircle");
const red = document.getElementById("redCircle");
const green = document.getElementById("greenCircle");
const playArea = document.getElementById("playArea");

const modal = document.getElementById("modal");
const resultText = document.getElementById("resultText");
const finalScore = document.getElementById("finalScore");
const continueBtn = document.getElementById("continueBtn");

let score = 0;
let lives = 3;
let correctAnswer = 0;
let mode = "question";
let gamePaused = false;
let dragging = false;
let moveInterval;
let offsetX, offsetY;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateScoreLives() {
  document.getElementById("score").textContent = score;
  document.getElementById("lives").textContent = "❤️".repeat(lives);
}

function generateQuestion() {
  const a = randomInt(1, 20);
  const b = randomInt(1, 20);
  const operations = ["+", "-", "*", "/"];
  const op = operations[randomInt(0, operations.length - 1)];

  let displayOp = op;
  if (op === "*") displayOp = "x";
  if (op === "/") displayOp = "÷";

  let questionForDisplay = `${a} ${displayOp} ${b}`;
  let actualQuestion = `${a} ${op} ${b}`;
  const answer = Math.round(eval(actualQuestion));

  correctAnswer = answer;
  mode = Math.random() > 0.5 ? "question" : "answer";

  if (mode === "question") {
    yellow.textContent = questionForDisplay;
    const correctOn = Math.random() < 0.5 ? red : green;
    const wrongOn = correctOn === red ? green : red;
    correctOn.textContent = answer;
    wrongOn.textContent = randomInt(1, 40);
  } else {
    yellow.textContent = answer;
    const correctQ = questionForDisplay;

    const fakeA = randomInt(1, 10);
    const fakeB = randomInt(1, 10);
    const fakeOpRaw = ["+", "-"][randomInt(0, 1)];
    const fakeOp = fakeOpRaw === "*" ? "x" : fakeOpRaw === "/" ? "÷" : fakeOpRaw;
    const fakeQ = `${fakeA} ${fakeOp} ${fakeB}`;

    const correctOn = Math.random() < 0.5 ? red : green;
    const wrongOn = correctOn === red ? green : red;
    correctOn.textContent = correctQ;
    wrongOn.textContent = fakeQ;
  }
}

function checkCollision(target) {
  const yellowRect = yellow.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  return !(
    yellowRect.right < targetRect.left ||
    yellowRect.left > targetRect.right ||
    yellowRect.bottom < targetRect.top ||
    yellowRect.top > targetRect.bottom
  );
}

function handleCheck() {
  if (checkCollision(red)) checkAnswer(red.textContent);
  else if (checkCollision(green)) checkAnswer(green.textContent);
}

function checkAnswer(value) {
  let correct = false;

  if (mode === "question") {
    correct = Number(value) === correctAnswer;
  } else {
    try {
      let cleaned = value.replace(/x/g, "*").replace(/÷/g, "/");
      correct = Math.round(eval(cleaned)) === correctAnswer;
    } catch {
      correct = false;
    }
  }

  if (correct) {
    score++;
    if (lives < 5) lives++;
    showPopup("Correct!");
  } else {
    lives--;
    if (lives <= 0) {
      showPopup("Game Over", true);
    } else {
      showPopup("Wrong!");
    }
  }

  updateScoreLives();
}

function showPopup(text, gameOver = false) {
  pauseGame();
  modal.style.display = "flex";
  resultText.textContent = text;
  finalScore.textContent = gameOver ? `Your score: ${score}` : "";
  continueBtn.textContent = gameOver ? "Restart" : "Continue";

  continueBtn.onclick = () => {
    modal.style.display = "none";
    if (gameOver) {
      score = 0;
      lives = 3;
    }
    generateQuestion();
    updateScoreLives();
    resumeGame();
  };
}

function getRandomPosition(element) {
  const parentRect = playArea.getBoundingClientRect();
  const elRect = element.getBoundingClientRect();
  const maxX = parentRect.width - elRect.width;
  const maxY = parentRect.height - elRect.height;

  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY)
  };
}

function moveTargetSmoothly(target) {
  const { x, y } = getRandomPosition(target);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function resumeGame() {
  gamePaused = false;
  moveInterval = setInterval(() => {
    if (gamePaused) return;
    moveTargetSmoothly(red);
    moveTargetSmoothly(green);
  }, 2000);
}

function pauseGame() {
  gamePaused = true;
  clearInterval(moveInterval);
}

// === Drag Events ===
yellow.addEventListener("mousedown", (e) => {
  if (gamePaused) return;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  dragging = true;
});

document.addEventListener("mousemove", (e) => {
  if (!dragging || gamePaused) return;
  const x = e.clientX - offsetX - playArea.offsetLeft;
  const y = e.clientY - offsetY - playArea.offsetTop;
  yellow.style.left = `${x}px`;
  yellow.style.top = `${y}px`;
  handleCheck();
});

document.addEventListener("mouseup", () => {
  dragging = false;
});

yellow.addEventListener("touchstart", (e) => {
  if (gamePaused) return;
  const touch = e.touches[0];
  const rect = yellow.getBoundingClientRect();
  offsetX = touch.clientX - rect.left;
  offsetY = touch.clientY - rect.top;
  dragging = true;
});

document.addEventListener("touchmove", (e) => {
  if (!dragging || gamePaused) return;
  const touch = e.touches[0];
  const x = touch.clientX - offsetX - playArea.offsetLeft;
  const y = touch.clientY - offsetY - playArea.offsetTop;
  yellow.style.left = `${x}px`;
  yellow.style.top = `${y}px`;
  handleCheck();
});

document.addEventListener("touchend", () => {
  dragging = false;
});

// === Start Game ===
window.onload = () => {
  generateQuestion();
  updateScoreLives();
  resumeGame();
};