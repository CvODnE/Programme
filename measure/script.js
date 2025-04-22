const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const objectBar = document.getElementById('objectBar');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const modal = document.getElementById('modal');
const resultText = document.getElementById('resultText');
const finalScore = document.getElementById('finalScore');
const continueBtn = document.getElementById('continueBtn');

let score = 0;
let lives = 3;

const questions = [
  {
    type: 'length',
    generate: () => {
      const length = Math.floor(Math.random() * 8) + 2; // 2–9 cm
      objectBar.style.width = `${length * 10}%`;
      const correct = `${length} cm`;
      const options = generateOptions(correct, 'cm');
      return {
        question: 'How long is this object?',
        correct,
        options
      };
    }
  },
  {
    type: 'conversion',
    generate: () => {
      objectBar.style.width = `0%`;
      const meters = Math.floor(Math.random() * 9) + 1;
      const correct = `${meters * 100} cm`;
      const options = generateOptions(correct, 'cm');
      return {
        question: `Convert ${meters} meters to centimeters.`,
        correct,
        options
      };
    }
  },
  {
    type: 'tool',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'Which tool would you use to measure the length of a pencil?',
        correct: 'Ruler',
        options: shuffle(['Ruler', 'Thermometer', 'Scale', 'Clock'])
      };
    }
  },
  {
    type: 'tool',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'Which tool would you use to measure the length of a line in a paper ?',
        correct: 'Scale',
        options: shuffle(['Ruler', 'Thermometer', 'Scale', 'Clock'])
      };
    }
  },
  {
    type: 'volume',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'Which unit is used to measure liquid?',
        correct: 'Liter',
        options: shuffle(['Liter', 'Kilogram', 'Meter', 'Gram'])
      };
    }
  },
  {
    type: 'volume',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'Which unit is used to measure weight ?',
        correct: 'Gram',
        options: shuffle(['Liter', 'Kilogram', 'Meter', 'Gram'])
      };
    }
  },
  {
    type: 'weight',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'Which is heavier: 1 kg or 900 g?',
        correct: '1 kg',
        options: shuffle(['1 kg', '900 g'])
      };
    }
  },
  {
    type: 'weight',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'Which is heavier: 10 g or 1 decagram?',
        correct: 'both are equal',
        options: shuffle(['10 g', '1 decagram', 'both are equal'])
      };
    }
  },
  {
    type: 'time',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'How many minutes are there in 2 hours?',
        correct: '120',
        options: shuffle(['60', '90', '120', '30'])
      };
    }
  },
  {
    type: 'temperature',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'Which is colder?',
        correct: '-5°C',
        options: shuffle(['10°C', '0°C', '20°C', '-5°C'])
      };
    }
  },
  {
    type: 'temperature',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'Which is the highest temprature ?',
        correct: '90°C',
        options: shuffle(['90°C', '0°C', '-100°C', '20°C'])
      };
    }
  },
  {
    type: 'area',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'What is the perimeter of a 3 cm by 4 cm rectangle?',
        correct: '14 cm',
        options: shuffle(['7 cm', '12 cm', '14 cm', '24 cm'])
      };
    }
  },
  {
    type: 'area',
    generate: () => {
      objectBar.style.width = `0%`;
      return {
        question: 'What is the area of a 5 cm by 7 cm rectangle?',
        correct: '35 cm',
        options: shuffle(['12 cm', '2 cm', '35 cm', '70 cm'])
      };
    }
  }
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateOptions(correct, unit) {
  const value = parseInt(correct);
  const options = [value];
  while (options.length < 4) {
    const fake = Math.floor(value + (Math.random() * 6 - 3));
    if (fake > 0 && !options.includes(fake)) options.push(fake);
  }
  return shuffle(options).map(v => `${v} ${unit}`);
}

function showModal(text, isGameOver = false) {
  resultText.textContent = text;
  finalScore.textContent = isGameOver ? `Your final score: ${score}` : '';
  modal.style.display = 'flex';
}

function updateGame() {
  const q = questions[Math.floor(Math.random() * questions.length)].generate();
  questionText.textContent = q.question;
  optionsContainer.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.correct) {
        score++;
        if (lives < 5) lives++;
        showModal('Correct!');
      } else {
        lives--;
        if (lives === 0) {
          showModal('Game Over!', true);
          return;
        } else {
          showModal('Wrong!');
        }
      }
      updateScore();
    };
    optionsContainer.appendChild(btn);
  });
}

function updateScore() {
  scoreEl.textContent = score;
  livesEl.textContent = '❤️'.repeat(lives);
}

continueBtn.onclick = () => {
  modal.style.display = 'none';
  updateGame();
};

updateGame();