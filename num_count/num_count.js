// Game variables
let score = 0;
let lives = 5;
let correctAnswer = 0;
let currentCategory = '';

// Item categories with emojis
const categories = {
    car: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐'],
    fruit: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒'],
    toy: ['🧸', '🪀', '🪁', '🎮', '🎯', '🎲', '♟️', '🎨', '😂', '🎱'],
    animal: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'],
    other: ['⭐', '🌈', '☀️', '🌙', '⚡', '❄️', '💧', '🔥', '🌊', '🍀']
};

// DOM elements
const itemsContainer = document.getElementById('items-container');
const boxes = document.querySelectorAll('.box');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const resultModal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const correctAnswerDisplay = document.getElementById('correctAnswer');
const continueBtn = document.getElementById('continueBtn');

// Initialize the game
function initGame() {
    generateNewRound();
    
    continueBtn.addEventListener('click', () => {
        resultModal.style.display = 'none';
        if (lives > 0) {
            generateNewRound();
        } else {
            // Game over - restart
            lives = 5;
            score = 0;
            updateLivesDisplay();
            scoreDisplay.textContent = '0';
            generateNewRound();
        }
    });
}

// Update lives display
function updateLivesDisplay() {
    livesDisplay.textContent = '❤️'.repeat(lives);
}

// Generate a new round with random items
function generateNewRound() {
    // Clear previous items
    itemsContainer.innerHTML = '';
    
    // Select a random category
    const categoryKeys = Object.keys(categories);
    currentCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const categoryEmojis = categories[currentCategory];
    
    // Generate random number of items (1-20)
    const itemCount = Math.floor(Math.random() * 20) + 1;
    correctAnswer = itemCount;
    
    // Select a random emoji from the category
    const randomEmoji = categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)];
    
    // Display the items
    for (let i = 0; i < itemCount; i++) {
        const item = document.createElement('div');
        item.className = `item ${currentCategory}`;
        item.textContent = randomEmoji;
        itemsContainer.appendChild(item);
    }
    
    // Generate answer options
    const answers = [];
    
    // Add correct answer at random position
    const correctPos = Math.floor(Math.random() * 4);
    answers[correctPos] = itemCount;
    
    // Fill other options with wrong answers
    for (let i = 0; i < 4; i++) {
        if (i !== correctPos) {
            let wrongAnswer;
            do {
                wrongAnswer = Math.floor(Math.random() * 20) + 1;
            } while (wrongAnswer === itemCount || answers.includes(wrongAnswer));
            answers[i] = wrongAnswer;
        }
    }
    
    // Update the boxes
    boxes.forEach((box, index) => {
        box.textContent = answers[index];
        box.dataset.number = answers[index];
    });
}

// Check the selected answer
function checkAnswer(selectedNumber) {
    if (selectedNumber === correctAnswer) {
        // Correct answer
        score++;
        scoreDisplay.textContent = score;
        
        resultText.textContent = "Correct!";
        resultText.className = "correct";
        correctAnswerDisplay.style.display = 'none';
        
        // Add a life if not at max (5 hearts)
        if (lives < 5) {
            lives++;
            updateLivesDisplay();
        }
    } else {
        // Wrong answer
        lives--;
        updateLivesDisplay();
        
        resultText.textContent = "Wrong!";
        resultText.className = "wrong";
        correctAnswerDisplay.textContent = `Correct answer is ${correctAnswer}`;
        correctAnswerDisplay.style.display = 'block';
    }
    
    // Show result modal
    resultModal.style.display = 'flex';
    
    // Game over check
    if (lives <= 0) {
        resultText.textContent = "Game Over!";
        correctAnswerDisplay.textContent = `Your final score: ${score}`;
        correctAnswerDisplay.style.display = 'block';
    }
}

// Set up event listeners for boxes
function setupEventListeners() {
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            checkAnswer(parseInt(box.dataset.number));
        });
    });
}

// Start the game
setupEventListeners();
initGame();