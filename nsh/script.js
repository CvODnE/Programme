const yellow = document.getElementById("yellowCircle");
const red = document.getElementById("redCircle");
const green = document.getElementById("greenCircle");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const resultModal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const finalScore = document.getElementById("finalScore");
const continueBtn = document.getElementById("continueBtn");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

let score = 0;
let lives = 3;

function getRandomMath() {
  const ops = ["+", "-", "x", "÷"];
  let a = Math.floor(Math.random() * 20 + 1);
  let b = Math.floor(Math.random() * 10 + 1);
  let op = ops[Math.floor(Math.random() * ops.length)];
  let question = `${a} ${op} ${b}`;
  let answer = eval(op === "x" ? `${a}*${b}` : op === "÷" ? `${a}/${b}` : `${a}${op}${b}`);
  answer = Math.round(answer * 100) / 100;
  return [question, answer];
}

function randomAssign() {
  let [q, a] = getRandomMath();
  let mode = Math.random() < 0.5 ? "question" : "answer";
  yellow.dataset.mode = mode;
  if (mode === "question") {
    yellow.innerText = q;
    if (Math.random() < 0.5) {
      red.innerText = a;
      green.innerText = a + Math.floor(Math.random() * 10 + 1);
    } else {
      green.innerText = a;
      red.innerText = a + Math.floor(Math.random() * 10 + 1);
    }
  } else {
    yellow.innerText = a;
    if (Math.random() < 0.5) {
      red.innerText = q;
      green.innerText = getRandomMath()[0];
    } else {
      green.innerText = q;
      red.innerText = getRandomMath()[0];
    }
  }
}

randomAssign();

function showModal(msg, isGameOver = false) {
  resultText.innerText = msg;
  finalScore.innerText = isGameOver ? `Your score: ${score}` : "";
  resultModal.style.display = "flex";
}

continueBtn.addEventListener("click", () => {
  resultModal.style.display = "none";
  if (lives === 0) {
    score = 0;
    lives = 3;
    scoreEl.innerText = score;
    livesEl.innerText = "❤️❤️❤️";
  }
  randomAssign();
});

let offsetX, offsetY;

function startDrag(e) {
  const rect = yellow.getBoundingClientRect();
  offsetX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  offsetY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

function drag(e) {
  e.preventDefault();
  let x = (e.touches ? e.touches[0].clientX : e.clientX) - offsetX;
  let y = (e.touches ? e.touches[0].clientY : e.clientY) - offsetY;
  yellow.style.left = `${x}px`;
  yellow.style.top = `${y}px`;
  checkCollision();
}

function endDrag() {
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchend", endDrag);
}

yellow.addEventListener("mousedown", startDrag);
yellow.addEventListener("touchstart", startDrag);

function isColliding(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.left > bRect.right ||
    aRect.right < bRect.left
  );
}

function checkCollision() {
  [red, green].forEach(div => {
    if (isColliding(yellow, div)) {
      const mode = yellow.dataset.mode;
      const yVal = yellow.innerText.trim();
      const dVal = div.innerText.trim();
      let correct = false;
      if (mode === "question") {
        try {
          correct = parseFloat(dVal) === eval(yVal.replace("x", "*").replace("÷", "/"));
        } catch {}
      } else {
        try {
          correct = parseFloat(yVal) === eval(dVal.replace("x", "*").replace("÷", "/"));
        } catch {}
      }

      if (correct) {
        correctSound.play();
        score++;
        scoreEl.innerText = score;
        if (lives < 5) lives++;
        livesEl.innerText = "❤️".repeat(lives);
        showModal("Correct!");
      } else {
        wrongSound.play();
        lives--;
        livesEl.innerText = "❤️".repeat(lives);
        if (lives <= 0) {
          showModal("Game Over!", true);
        } else {
          showModal("Wrong!");
        }
      }
    }
  });
}