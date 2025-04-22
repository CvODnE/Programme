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

// Utility
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomMoneyAmount(min = 10, max = 99) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}  

function generateQuestion() {
  const type = Math.floor(Math.random() * 4);
  let question, options = [];

  if (type === 0) {
    // Total cost
    const item1 = getRandomMoneyAmount(1, 10);
    const item2 = getRandomMoneyAmount(1, 10);
    const total = item1 + item2;
    correctAnswer = `$${total}`;

    options = shuffle([
      `$${total}`,
      `$${total + 1}`,
      `$${total - 1}`,
      `$${total + 2}`
    ]);

    question = `You bought two items for $${item1} and $${item2}. What is the total cost?`;

  } else if (type === 1) {
    // Change
    const cost = getRandomMoneyAmount(2, 15);
    const paid = cost + getRandomMoneyAmount(1, 5);
    const change = paid - cost;
    correctAnswer = `$${change}`;

    options = shuffle([
      `$${change}`,
      `$${change + 1}`,
      `$${change - 1}`,
      `$${change + 2}`
    ]);

    question = `You paid $${paid} for an item that costs $${cost}. How much change should you get?`;

  } else if (type === 2) {
    // Comparison
    const amount1 = getRandomMoneyAmount();
    const amount2 = getRandomMoneyAmount();
    const correct = amount1 > amount2 ? "First" : "Second";
    correctAnswer = correct;

    question = `Which amount is greater? $${amount1} or $${amount2}?`;
    options = shuffle(["First", "Second", "Both", "None"]);

  } else {
    // Coin count (approximate using whole dollars)
    const dollars = getRandomMoneyAmount(1, 10);
    correctAnswer = `$${dollars}`;

    options = shuffle([
      `$${dollars}`,
      `$${dollars + 1}`,
      `$${dollars - 1}`,
      `$${dollars + 2}`
    ]);

    question = `You collected some coins worth $${dollars}. What is the total value?`;
  }

  return { question, options };
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
  const { question, options } = generateQuestion();
  questionText.textContent = question;
  optionsContainer.innerHTML = "";

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === correctAnswer) {
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