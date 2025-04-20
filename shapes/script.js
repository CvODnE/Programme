const shapes = [
    'circle',
    'square',
    'triangle',
    'pentagon',
    'hexagon',
    'heptagon',
    'octagon',
    'nonagon',
    'oval',
    'parallelogram',
    'rhombus',
    'trapezium'
];  
let score = 0;
let lives = 3;
const maxLives = 5;

const shapeContainer = document.getElementById('shapeContainer');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const modal = document.getElementById('modal');
const resultText = document.getElementById('resultText');
const finalScore = document.getElementById('finalScore');
const continueBtn = document.getElementById('continueBtn');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

function getRandomShape() {
  return shapes[Math.floor(Math.random() * shapes.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateShapes() {
  shapeContainer.innerHTML = '';
  let shapeCounts = {};

  for (let i = 0; i < 20; i++) {
    const shape = getRandomShape();
    shapeCounts[shape] = (shapeCounts[shape] || 0) + 1;

    const img = document.createElement('img');
    img.src = `shapes/${shape}.png`; // Make sure you have shapes/circle.png etc.
    img.alt = shape;
    img.className = 'shape-img';
    shapeContainer.appendChild(img);
  }

  return shapeCounts;
}

function createQuestion(shapeCounts) {
  const randomShape = getRandomShape();
  const questionType = Math.random() > 0.5 ? 'count' : 'identify';
  const correctCount = shapeCounts[randomShape] || 0;

  optionsEl.innerHTML = '';
  let correctOption;

  if (questionType === 'count') {
    questionEl.textContent = `How many times does the "${randomShape}" appear?`;
    correctOption = correctCount;
    const options = generateOptions(correctCount);
    options.forEach(opt => createOptionButton(opt, correctOption));
  } else {
    questionEl.textContent = `Which shape appears ${correctCount} times?`;
    correctOption = randomShape;
    const options = generateShapeOptions(randomShape);
    options.forEach(opt => createOptionButton(opt, correctOption, true));
  }
}

function generateOptions(correctValue) {
  const options = new Set([correctValue]);
  while (options.size < 4) {
    options.add(getRandomInt(0, 10));
  }
  return shuffle([...options]);
}

function generateShapeOptions(correctShape) {
  const options = new Set([correctShape]);
  while (options.size < 4) {
    options.add(getRandomShape());
  }
  return shuffle([...options]);
}

function createOptionButton(value, correct, isShape = false) {
  const btn = document.createElement('button');
  btn.className = 'option-btn';
  btn.textContent = value;
  btn.onclick = () => checkAnswer(value, correct);
  optionsEl.appendChild(btn);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function checkAnswer(value, correct) {
  const isCorrect = value == correct;
  modal.style.display = 'flex';

  if (isCorrect) {
    resultText.textContent = 'Correct!';
    resultText.className = 'correct';
    correctSound.play();
    score++;
    if (lives < maxLives) lives++;
  } else {
    resultText.textContent = 'Wrong!';
    resultText.className = 'wrong';
    wrongSound.play();
    lives--;
  }

  scoreEl.textContent = score;
  livesEl.textContent = '❤️'.repeat(lives);

  if (lives <= 0) {
    resultText.textContent = 'Game Over!';
    finalScore.textContent = `Your final score is: ${score}`;
    continueBtn.textContent = 'Restart';
    continueBtn.onclick = () => location.reload();
  } else {
    finalScore.textContent = '';
    continueBtn.textContent = 'Continue';
    continueBtn.onclick = () => {
      modal.style.display = 'none';
      startGame();
    };
  }
}

function startGame() {
  const shapeCounts = generateShapes();
  createQuestion(shapeCounts);
}

window.onload = startGame;