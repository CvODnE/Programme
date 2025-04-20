// Game variables
let score = 0;
let lives = 5;
let currentQuestion = {};
let correctAnswer = 0;

// DOM elements
const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const resultModal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const continueBtn = document.getElementById('continueBtn');

// Initialize the game
function initGame() {
    generateQuestion();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    submitBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
    continueBtn.addEventListener('click', () => {
        resultModal.style.display = 'none';
        if (lives <= 0) {
            resetGame();
        }
        generateQuestion();
    });
}

// Generate a new math question
function generateQuestion() {
    answerInput.value = '';
    answerInput.focus();
    
    // Randomly choose between +- or ×÷
    const isAddSub = Math.random() > 0.5;
    
    if (isAddSub) {
        // Addition or subtraction
        const num1 = Math.floor(Math.random() * 101);
        const num2 = Math.floor(Math.random() * 101);
        const operator = Math.random() > 0.5 ? '+' : '-';
        
        currentQuestion = {
            num1: num1,
            num2: num2,
            operator: operator
        };
        
        correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;
        questionEl.textContent = `What is ${num1} ${operator} ${num2}?`;
    } else {
        // Multiplication or division
        const num1 = Math.floor(Math.random() * 101);
        const num2 = Math.floor(Math.random() * 10) + 1; // Avoid division by 0
        const operator = Math.random() > 0.5 ? '×' : '÷';
        
        currentQuestion = {
            num1: num1,
            num2: num2,
            operator: operator
        };
        
        correctAnswer = operator === '×' ? num1 * num2 : Math.round((num1 / num2) * 10) / 10;
        questionEl.textContent = `What is ${num1} ${operator} ${num2}?`;
    }
}

// Check the player's answer
function checkAnswer() {
    const playerAnswer = parseFloat(answerInput.value);
    
    if (isNaN(playerAnswer)) {
        alert('Please enter a valid number');
        return;
    }

    if (Math.abs(playerAnswer - correctAnswer) < 0.01) {
        // Correct answer
        score++;
        scoreDisplay.textContent = score;
        resultText.textContent = 'Correct!';
        resultText.className = 'correct';
        
        // Add life if not at max
        if (lives < 5) {
            lives++;
            updateLivesDisplay();
        }
    } else {
        // Wrong answer
        lives--;
        updateLivesDisplay();
        resultText.textContent = `Wrong! The correct answer was ${correctAnswer}`;
        resultText.className = 'wrong';
    }
    
    showResultModal();
}

// Update lives display
function updateLivesDisplay() {
    livesDisplay.textContent = '❤️'.repeat(lives);
}

// Show result modal
function showResultModal() {
    if (lives <= 0) {
        resultText.textContent = `Game Over! Final Score: ${score}`;
    }
    resultModal.style.display = 'flex';
}

// Reset the game
function resetGame() {
    score = 0;
    lives = 5;
    scoreDisplay.textContent = '0';
    updateLivesDisplay();
}

// Start the game
initGame();