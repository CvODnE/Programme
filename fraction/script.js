const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const modal = document.getElementById("modal");
const resultText = document.getElementById("resultText");
const finalScore = document.getElementById("finalScore");
const continueBtn = document.getElementById("continueBtn");

let score = 0;
let lives = 3;
let correctAnswer = "";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function simplifyFraction(numerator, denominator) {
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const divisor = gcd(numerator, denominator);
  return `${numerator / divisor}/${denominator / divisor}`;
}

function generateFractionQuestion() {
  const type = Math.floor(Math.random() * 3); // 0, 1, 2

  let question = "", options = [], correct = "";

  if (type === 0) {
    // Simplify a fraction
    const num = Math.floor(Math.random() * 9 + 2) * 2;
    const den = num * 2;
    correct = simplifyFraction(num, den);
    question = `Simplify the fraction: ${num}/${den}`;
    options = shuffle([
      correct,
      simplifyFraction(num + 2, den),
      simplifyFraction(num, den + 2),
      simplifyFraction(num + 4, den + 4)
    ]);
  } else if (type === 1) {
    // Compare fractions
    const a = 1 + Math.floor(Math.random() * 5);
    const b = a + 1 + Math.floor(Math.random() * 5);
    const correctComp = a / b > 1 / b ? "A" : "B";
    correct = correctComp;
    question = `Which fraction is greater? A: ${a}/${b} or B: 1/${b}`;
    options = shuffle(["A", "B", "Equal", "Can't Say"]);
  } else {
    // Add fractions with common denominator
    const den = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
    const num1 = Math.floor(Math.random() * (den - 1)) + 1;
    const num2 = Math.floor(Math.random() * (den - num1)) + 1;
    const sum = simplifyFraction(num1 + num2, den);
    correct = sum;
    question = `What is ${num1}/${den} + ${num2}/${den}?`;
    options = shuffle([
      correct,
      simplifyFraction(num1 + num2 + 1, den),
      simplifyFraction(num1 + num2 - 1, den),
      simplifyFraction(num1 + num2 + 2, den)
    ]);
  }

  return { question, options, correct };
}

function updateScoreBoard() {
  scoreEl.textContent = score;
  livesEl.textContent = "❤️".repeat(lives);
}

function showModal(text, gameOver = false) {
  resultText.textContent = text;
  finalScore.textContent = gameOver ? `Your final score: ${score}` : "";
  modal.style.display = "flex";
}

function loadQuestion() {
  const { question, options, correct } = generateFractionQuestion();
  questionText.textContent = question;
  correctAnswer = correct;
  optionsContainer.innerHTML = "";

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => {
      if (option === correctAnswer) {
        score++;
        if (lives < 5) lives++;
        showModal("Correct!");
      } else {
        lives--;
        if (lives === 0) {
          showModal("Wrong! Game Over.", true);
          return;
        } else {
          showModal("Wrong!");
        }
      }
      updateScoreBoard();
    };
    optionsContainer.appendChild(btn);
  });
}

continueBtn.onclick = () => {
  modal.style.display = "none";
  loadQuestion();
};

updateScoreBoard();
loadQuestion();