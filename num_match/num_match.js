// Game variables
let score = 0;
let lives = 5;
let correctAnswer = 0;
let isDragging = false;
let offsetX, offsetY;

// DOM elements
const draggable = document.getElementById('draggable');
const boxes = document.querySelectorAll('.box');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const resultModal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const correctAnswerDisplay = document.getElementById('correctAnswer');
const continueBtn = document.getElementById('continueBtn');

// Initialize the game
function initGame() {
    generateNewNumbers();
    setupDragAndDrop();
    
    continueBtn.addEventListener('click', () => {
        resultModal.style.display = 'none';
        if (lives > 0) {
            generateNewNumbers();
        } else {
            // Game over - restart
            lives = 5;
            score = 0;
            updateLivesDisplay();
            scoreDisplay.textContent = '0';
            generateNewNumbers();
        }
    });
}

// Update lives display
function updateLivesDisplay() {
    livesDisplay.textContent = '❤️'.repeat(lives);
}

// Generate new random numbers
function generateNewNumbers() {
    // Generate a random number for the draggable element (1-20)
    const randomNum = Math.floor(Math.random() * 20) + 1;
    draggable.textContent = randomNum;
    
    // Generate 3 random wrong answers and 1 correct answer
    const answers = [];
    for (let i = 0; i < 3; i++) {
        let wrongAnswer;
        do {
            wrongAnswer = Math.floor(Math.random() * 20) + 1;
        } while (wrongAnswer === randomNum || answers.includes(wrongAnswer));
        answers.push(wrongAnswer);
    }
    
    // Add the correct answer at a random position
    const correctPos = Math.floor(Math.random() * 4);
    answers.splice(correctPos, 0, randomNum);
    correctAnswer = randomNum;
    
    // Update the boxes
    boxes.forEach((box, index) => {
        box.textContent = answers[index];
        box.dataset.number = answers[index];
    });
    
    // Reset draggable position
    draggable.style.position = 'relative';
    draggable.style.left = 'auto';
    draggable.style.top = 'auto';
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    draggable.addEventListener('mousedown', startDrag);
    draggable.addEventListener('touchstart', startDrag, { passive: false });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    // Also allow clicking on boxes for touch devices
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            checkAnswer(parseInt(box.dataset.number));
        });
    });
}

function startDrag(e) {
    isDragging = true;
    
    // Get the initial position
    const rect = draggable.getBoundingClientRect();
    
    if (e.type === 'mousedown') {
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    } else if (e.type === 'touchstart') {
        e.preventDefault();
        offsetX = e.touches[0].clientX - rect.left;
        offsetY = e.touches[0].clientY - rect.top;
    }
    
    // Set position style for dragging
    draggable.style.position = 'absolute';
    draggable.style.zIndex = '10';
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    let clientX, clientY;
    
    if (e.type === 'mousemove') {
        clientX = e.clientX;
        clientY = e.clientY;
    } else if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }
    
    draggable.style.left = (clientX - offsetX) + 'px';
    draggable.style.top = (clientY - offsetY) + 'px';
    
    // Check for collision with boxes
    const draggableRect = draggable.getBoundingClientRect();
    
    boxes.forEach(box => {
        const boxRect = box.getBoundingClientRect();
        
        // Simple collision detection
        if (!(draggableRect.right < boxRect.left || 
              draggableRect.left > boxRect.right || 
              draggableRect.bottom < boxRect.top || 
              draggableRect.top > boxRect.bottom)) {
            // Collision detected
            checkAnswer(parseInt(box.dataset.number));
            endDrag();
        }
    });
}

function endDrag() {
    isDragging = false;
    draggable.style.zIndex = 'auto';
}

function checkAnswer(selectedNumber) {
    const currentNumber = parseInt(draggable.textContent);
    
    if (selectedNumber === currentNumber) {
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
        correctAnswerDisplay.textContent = "Correct answer is " + correctAnswer;
        correctAnswerDisplay.style.display = 'block';
    }
    
    // Show result modal
    resultModal.style.display = 'flex';
    
    // Game over check
    if (lives <= 0) {
        resultText.textContent = "Game Over!";
        correctAnswerDisplay.textContent = "Your final score: " + score;
        correctAnswerDisplay.style.display = 'block';
    }
}

// Start the game
initGame();