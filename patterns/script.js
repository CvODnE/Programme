// Game configuration
const patternTypes = {
    arithmetic: {
        name: "Arithmetic",
        generate: (start, diff) => [start, start + diff, start + diff * 2, start + diff * 3, "?"]
    },
    geometric: {
        name: "Geometric",
        generate: (start, ratio) => [start, start * ratio, start * ratio * ratio, start * ratio * ratio * ratio, "?"]
    },
    square: {
        name: "Square Numbers",
        generate: (start) => [start, start + 1, start + 2, start + 3].map(n => n * n).concat(["?"])
    },
    fibonacci: {
        name: "Fibonacci",
        generate: (a, b) => {
            const seq = [a, b, a + b, a + b * 2];
            seq.push("?");
            return seq;
        }
    }
};

// Game state
let score = 0;
let lives = 5;
let correctAnswer = "";
let currentPattern = "";

// DOM elements
const patternDisplay = document.getElementById("pattern-display");
const questionEl = document.getElementById("question");
const options = [
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
    document.getElementById("option4")
];
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const resultModal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const correctAnswerDisplay = document.getElementById("correctAnswer");
const continueBtn = document.getElementById("continueBtn");

// Initialize game
function initGame() {
    generateNewRound();
    setupEventListeners();
}

function setupEventListeners() {
    options.forEach(option => {
        option.addEventListener("click", () => checkAnswer(option.textContent));
    });
    continueBtn.addEventListener("click", () => {
        resultModal.style.display = "none";
        if (lives <= 0) resetGame();
        generateNewRound();
    });
}

function generateNewRound() {
    // Clear previous
    patternDisplay.innerHTML = "";
    
    // Select random pattern type
    const patternKeys = Object.keys(patternTypes);
    currentPattern = patternKeys[Math.floor(Math.random() * patternKeys.length)];
    
    // Generate pattern
    let sequence;
    switch(currentPattern) {
        case "arithmetic":
            sequence = patternTypes.arithmetic.generate(
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 5) + 1
            );
            correctAnswer = sequence[3] + (sequence[1] - sequence[0]);
            break;
        case "geometric":
            sequence = patternTypes.geometric.generate(
                Math.floor(Math.random() * 5) + 1,
                Math.floor(Math.random() * 3) + 2
            );
            correctAnswer = sequence[3] * (sequence[1] / sequence[0]);
            break;
        case "square":
            sequence = patternTypes.square.generate(
                Math.floor(Math.random() * 5) + 1
            );
            correctAnswer = Math.pow(sequence[3] + 1, 2);
            break;
        case "fibonacci":
            sequence = patternTypes.fibonacci.generate(
                Math.floor(Math.random() * 5) + 1,
                Math.floor(Math.random() * 5) + 1
            );
            correctAnswer = sequence[2] + sequence[3];
            break;
    }
    
    // Display pattern
    sequence.forEach(num => {
        const numEl = document.createElement("div");
        numEl.className = "pattern-number";
        numEl.textContent = num;
        patternDisplay.appendChild(numEl);
    });
    
    // Set question and options
    questionEl.textContent = "What comes next in this pattern?";
    generateOptions();
}

function generateOptions() {
    const answers = [correctAnswer];
    
    // Generate 3 wrong answers
    while (answers.length < 4) {
        let wrongAnswer;
        if (typeof correctAnswer === "number") {
            wrongAnswer = correctAnswer + (Math.floor(Math.random() * 10) - 5);
            if (wrongAnswer < 0) wrongAnswer = Math.abs(wrongAnswer);
        } else {
            wrongAnswer = "Option " + (answers.length + 1);
        }
        
        if (!answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer);
        }
    }
    
    // Shuffle and display options
    shuffleArray(answers);
    answers.forEach((answer, i) => {
        options[i].textContent = answer;
    });
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer == correctAnswer) {
        handleCorrect();
    } else {
        handleWrong();
    }
    showResult();
}

function handleCorrect() {
    score++;
    scoreDisplay.textContent = score;
    resultText.textContent = "Correct!";
    resultText.className = "correct";
    correctAnswerDisplay.style.display = "none";
    
    // Add life if not at max
    if (lives < 5) {
        lives++;
        updateLivesDisplay();
    }
}

function handleWrong() {
    lives--;
    updateLivesDisplay();
    resultText.textContent = "Wrong!";
    resultText.className = "wrong";
    correctAnswerDisplay.textContent = `Correct answer: ${correctAnswer}`;
    correctAnswerDisplay.style.display = "block";
}

function updateLivesDisplay() {
    livesDisplay.textContent = "❤️".repeat(lives);
}

function showResult() {
    if (lives <= 0) {
        resultText.textContent = "Game Over!";
        correctAnswerDisplay.textContent = `Final Score: ${score}`;
    }
    resultModal.style.display = "flex";
}

function resetGame() {
    score = 0;
    lives = 5;
    scoreDisplay.textContent = "0";
    updateLivesDisplay();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start the game
initGame();