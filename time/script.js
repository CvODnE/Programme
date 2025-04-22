const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const modal = document.getElementById("modal");
const resultText = document.getElementById("resultText");
const finalScore = document.getElementById("finalScore");
const continueBtn = document.getElementById("continueBtn");
const clockContainer = document.getElementById("clockContainer");

let score = 0;
let lives = 3;
let currentCorrect = "";

// Correctly draw clock
function drawClock(hour, minute) {
  clockContainer.innerHTML = "";

  const clockFace = document.createElement("div");
  clockFace.className = "clock-face";

  const centerDot = document.createElement("div");
  centerDot.className = "center-dot";

  const hourHand = document.createElement("div");
  hourHand.className = "hand hour-hand";

  const minuteHand = document.createElement("div");
  minuteHand.className = "hand minute-hand";

  // Correct angles
  const hourAngle = (((hour % 12) + minute / 60) * 30) - 90;
  const minuteAngle = (minute * 6) - 90;

  hourHand.style.transform = `rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `rotate(${minuteAngle}deg)`;

  clockFace.appendChild(hourHand);
  clockFace.appendChild(minuteHand);
  clockFace.appendChild(centerDot);
  clockContainer.appendChild(clockFace);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function formatTime(hour, minute) {
  const h = hour === 0 ? 12 : hour;
  const m = minute.toString().padStart(2, "0");
  return `${h}:${m}`;
}

function randomTime() {
  const hour = Math.floor(Math.random() * 12);
  const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
  return { hour, minute };
}

function getQuestion() {
  const type = Math.floor(Math.random() * 4);

  if (type === 0) {
    const { hour, minute } = randomTime();
    drawClock(hour, minute);
    const correct = formatTime(hour, minute);
    currentCorrect = correct;

    const options = new Set([correct]);
    while (options.size < 4) {
      const { hour: h, minute: m } = randomTime();
      options.add(formatTime(h, m));
    }
    console.log(correct)
    return {
      question: "What time is shown on the clock?",
      correct,
      options: shuffle([...options])
    };
  } else if (type === 1) {
    const hours = Math.floor(Math.random() * 5) + 1;
    const correct = hours * 60;
    currentCorrect = correct.toString();

    const options = shuffle([correct, correct - 15, correct + 15, correct + 30]);
    return {
      question: `How many minutes are there in ${hours} hour(s)?`,
      correct: correct.toString(),
      options: options.map(String)
    };
  } else if (type === 2) {
    const now = new Date();
    const hour = now.getHours() % 12;
    const correct = (hour + 1) % 12 || 12;
    currentCorrect = `${correct}:00`;

    const options = shuffle([
      correct,
      (correct + 1) % 12 || 12,
      (correct + 2) % 12 || 12,
      (correct + 3) % 12 || 12
    ]);
    return {
      question: `If it's ${hour || 12}:00 now, what time is it in 1 hour?`,
      correct: `${correct}:00`,
      options: options.map(o => `${o}:00`)
    };
  } else {
    const start = Math.floor(Math.random() * 8) + 1;
    const end = start + Math.floor(Math.random() * 5) + 1;
    const duration = end - start;
    currentCorrect = `${duration} hour(s)`;

    const options = shuffle([
      duration,
      duration + 1,
      duration + 2,
      duration - 1 >= 0 ? duration - 1 : duration + 3
    ]);

    return {
      question: `A movie starts at ${start}:00 and ends at ${end}:00. How long is it?`,
      correct: `${duration} hour(s)`,
      options: options.map(o => `${o} hour(s)`)
    };
  }
}

function updateScore() {
  scoreEl.textContent = score;
  livesEl.textContent = "❤️".repeat(lives);
}

function showModal(text, showCorrect = false, gameOver = false) {
  if (showCorrect) {
    resultText.innerHTML = `<strong>${text}</strong><br><span style="font-size: 20px;">Correct answer: ${currentCorrect}</span>`;
  } else {
    resultText.textContent = text;
  }

  finalScore.textContent = gameOver ? `Your final score: ${score}` : "";
  modal.style.display = "flex";
}

function updateGame() {
  const q = getQuestion();
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.correct) {
        score++;
        if (lives < 5) lives++;
        showModal("Correct!");
      } else {
        lives--;
        if (lives === 0) {
          showModal("Wrong!", true, true);
          return;
        } else {
          showModal("Wrong!", true);
        }
      }
      updateScore();
    };
    optionsContainer.appendChild(btn);
  });
}

continueBtn.onclick = () => {
  modal.style.display = "none";
  updateGame();
};

updateScore();
updateGame();