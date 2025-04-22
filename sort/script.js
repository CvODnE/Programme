const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const ruleText = document.getElementById("ruleText");
const itemContainer = document.getElementById("itemContainer");
const modal = document.getElementById("modal");
const resultText = document.getElementById("resultText");
const finalScore = document.getElementById("finalScore");
const continueBtn = document.getElementById("continueBtn");
const submitBtn = document.getElementById("submitBtn");

let score = 0;
let lives = 3;
let selected = [];
let items = [];
let currentRule;

const colors = ['#e74c3c', '#2ecc71', '#3498db', '#f1c40f'];
const shapes = ['square', 'circle'];
const sizes = ['small', 'medium', 'large'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
  return true;
}

function generateRule() {
  const rules = [
    { label: "Sort numbers in ascending order", type: "asc" },
    { label: "Sort numbers in descending order", type: "desc" },
    { label: "Select all 1-digit numbers", check: (n) => n >= 0 && n <= 9 },
    { label: "Select all 2-digit numbers", check: (n) => n >= 10 && n <= 99 },
    { label: "Select all even numbers", check: (n) => n % 2 === 0 },
    { label: "Select all odd numbers", check: (n) => n % 2 !== 0 },
    { label: "Select all prime numbers", check: (n) => isPrime(n) },
    { label: "", check: null }, // for multiple of random
    { label: "Select all red items", check: (_, color) => color === "#e74c3c" },
    { label: "Select all circles", check: (_, __, shape) => shape === "circle" },
    { label: "Select all squares", check: (_, __, shape) => shape === "square" },
    { label: "Select all small items", check: (_, __, ___, size) => size === "small" }
  ];

  let rule = rules[getRandomInt(0, rules.length - 1)];

  if (rule.label === "") {
    const rand = getRandomInt(2, 9);
    rule = {
      label: `Select all multiples of ${rand}`,
      check: (n) => n % rand === 0
    };
  }

  return rule;
}

function createItems() {
  items = [];
  itemContainer.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const num = getRandomInt(1, 99);
    const color = colors[getRandomInt(0, colors.length - 1)];
    const shape = shapes[getRandomInt(0, shapes.length - 1)];
    const size = sizes[getRandomInt(0, sizes.length - 1)];
    const div = document.createElement("div");
    div.className = `item ${shape} ${size}`;
    div.textContent = num;
    div.style.backgroundColor = color;
    if(shape == "circle") {
        div.style.borderRadius = "50%"
    }
    if(size == "large") {
        div.style.width = "120px"
        div.style.height = "120px"
    }
    if(size == "medium") {
        div.style.width = "79px"
        div.style.height = "79px"
    }
    if(size == "small") {
        div.style.width = "40px"
        div.style.height = "40px"
    }

    div.onclick = () => {
      div.classList.toggle("selected");
      const index = selected.indexOf(i);
      if (index > -1) selected.splice(index, 1);
      else selected.push(i);
    };

    itemContainer.appendChild(div);
    items.push({ num, color, shape, size, div });
  }
}

function updateUI() {
  ruleText.textContent = currentRule.label;
  scoreEl.textContent = score;
  livesEl.textContent = "❤️".repeat(lives);
}

submitBtn.onclick = () => {
  let isCorrect = true;

  items.forEach((item, i) => {
    const shouldBeSelected = checkItem(item);
    const wasSelected = selected.includes(i);

    if (shouldBeSelected && wasSelected) {
      item.div.classList.add("correct");
    } else if (!shouldBeSelected && wasSelected) {
      item.div.classList.add("wrong");
      isCorrect = false;
    } else if (shouldBeSelected && !wasSelected) {
      item.div.classList.add("wrong");
      isCorrect = false;
    }
  });

  setTimeout(() => {
    if (isCorrect) {
      score++;
      if (lives < 5) lives++;
      showModal("Correct!");
    } else {
      lives--;
      if (lives === 0) showModal("Game Over!", true);
      else showModal("Wrong!");
    }
  }, 800);
};

function checkItem(item) {
  if (currentRule.type === "asc") {
    const selectedItems = selected.map(i => items[i].num);
    const sorted = [...selectedItems].sort((a, b) => a - b);
    return JSON.stringify(selectedItems) === JSON.stringify(sorted);
  }
  if (currentRule.type === "desc") {
    const selectedItems = selected.map(i => items[i].num);
    const sorted = [...selectedItems].sort((a, b) => b - a);
    return JSON.stringify(selectedItems) === JSON.stringify(sorted);
  }
  return currentRule.check(item.num, item.color, item.shape, item.size);
}

function showModal(message, gameOver = false) {
  resultText.textContent = message;
  finalScore.textContent = gameOver ? `Your final score: ${score}` : "";
  modal.style.display = "flex";
}

continueBtn.onclick = () => {
  modal.style.display = "none";
  selected = [];
  currentRule = generateRule();
  createItems();
  updateUI();
};

// Initialize game
currentRule = generateRule();
createItems();
updateUI();