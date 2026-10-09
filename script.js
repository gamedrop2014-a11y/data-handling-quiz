// --- PROJECT INITIAL CONFIGURATION & DATA ---
const quizData = [
  {
    visual: "Scenario: Ashish studies for 4 hours, 5 hours, and 3 hours respectively on three consecutive days.",
    question: "What is the average number of hours he studies daily?",
    options: ["3 hours", "4 hours", "5 hours", "12 hours"],
    answer: "4 hours"
  },
  {
    visual: "Data Handling Terminology",
    question: "The difference between the highest and the lowest observations in a data set is its __________.",
    options: ["frequency", "width", "range", "mode"],
    answer: "range"
  },
  {
    visual: "Dataset: 10, 20, 30, and 40",
    question: "The mean of the numbers 10, 20, 30, and 40 is __________.",
    options: ["20", "25", "30", "50"],
    answer: "25"
  },
  {
    visual: "Distribution: 3, 5, 7, 4, 2, 1, 4, 3, 4",
    question: "The mode of the distribution is __________.",
    options: ["7", "4", "3", "1"],
    answer: "4"
  },
  {
    visual: "Dataset: 4, 7, 2, 9, 5",
    question: "What is the calculated range (R)?",
    options: ["5", "2", "7", "9"],
    answer: "7"
  },
  {
    visual: "Tally Table: Margins of Victory in Matches",
    question: "According to the tally table data, which margin of victory occurs most frequently (14 times) and represents the mode?",
    options: ["1", "2", "6", "14"],
    answer: "2"
  },
  {
    visual: "Dataset: 6, 15, 120, 50, 100, 80, 10, 15, 8, 10, 15",
    question: "What is the median value for this dataset?",
    options: ["10", "15", "50", "100"],
    answer: "15"
  },
  {
    visual: "Dataset: Marks obtained in a Science Test: 85, 76, 90, 85, 39, 48, 56, 95, 81, and 75.",
    question: "What is the range of these marks? (Highest - Lowest)",
    options: ["39", "48", "56", "95"],
    answer: "56"
  },
  {
    visual: "Prime Numbers Rule",
    question: "The mean of the first five prime numbers (2, 3, 5, 7, 11) is __________.",
    options: ["4", "4.7", "5", "5.6"],
    answer: "5.6"
  },
  {
    visual: "Averages Core Principle",
    question: "The arithmetic mean of 5 scores is 85. Then the sum of the scores is __________.",
    options: ["425", "85", "More than 425", "Less than 400"],
    answer: "425"
  },
  {
    visual: "Statistical Rule",
    question: "If each score in a dataset is increased by 5, then the mean __________.",
    options: ["Remains the same", "Increases by 5", "Decreases by 5", "None of these"],
    answer: "Increases by 5"
  },
  {
    visual: "Central Tendency Concept",
    question: "Which measures of central tendency get affected if the extreme observations on both the ends of a sorted dataset are removed?",
    options: ["Mean and mode", "Mean and Median", "Mode and Median", "Mean, Median, and Mode"],
    answer: "Mean and mode"
  },
  {
    visual: "Dataset on a Board: 0, 15, -11, -17, +20, 5, -4",
    question: "What is the range of these integers?",
    options: ["31", "37", "20", "3"],
    answer: "37"
  },
  {
    visual: "Card Probability (Standard deck of 52 cards)",
    question: "The probability of drawing a face card (Jack, Queen, King) from a standard pack of 52 cards is __________.",
    options: ["1/13", "4/13", "3/13", "5/13"],
    answer: "3/13"
  },
  {
    visual: "Probability Scenario: A box contains 8 red, 7 blue, and 6 green balls.",
    question: "One ball is picked up randomly. What is the probability that it is blue?",
    options: ["1/3", "3/4", "7/19", "2/5"],
    answer: "1/3"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let studentName = "";

// --- DOM ELEMENTS SELECTION ---
const screens = {
  loading: document.getElementById('loading-screen'),
  login: document.getElementById('login-screen'),
  game: document.getElementById('game-screen'),
  score: document.getElementById('score-screen')
};

const inputName = document.getElementById('student-name');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const displayName = document.getElementById('display-student-name');
const scoreCounter = document.getElementById('score-counter');
const progressText = document.getElementById('progress');
const dataVisualBox = document.getElementById('data-visual');
const questionTextBox = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const finalScoreLabel = document.getElementById('final-score');
const totalScoreLabel = document.getElementById('total-score');
const reportNameLabel = document.getElementById('report-name');
const performanceLabel = document.getElementById('performance-feedback');

// --- APP FLOW DISPLAY SWITCHER ---
function showScreen(targetScreen) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  targetScreen.classList.add('active');
}

// --- INITIALIZE APPLICATION STATE ---
window.addEventListener('DOMContentLoaded', () => {
  // Simulates modules runtime compilation checks 
  setTimeout(() => {
    showScreen(screens.login);
  }, 1800);

  // Sync up array dataset bounds to view components
  totalScoreLabel.textContent = quizData.length;
});

// --- AUTHENTICATION INTERACTIVE LISTENERS ---
inputName.addEventListener('input', () => {
  const value = inputName.value.trim();
  startBtn.disabled = value.length < 2;
});

startBtn.addEventListener('click', () => {
  studentName = inputName.value.trim();
  displayName.textContent = `Student: ${studentName}`;
  currentQuestionIndex = 0;
  score = 0;
  scoreCounter.textContent = `Score: 0`;
  showScreen(screens.game);
  loadQuestion();
});

// --- ENGINE RUNTIME RENDERING LOGIC ---
function loadQuestion() {
  const currentData = quizData[currentQuestionIndex];
  
  // Update structural trackers dynamically
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  
  // Set question values
  dataVisualBox.textContent = currentData.visual;
  questionTextBox.textContent = currentData.question;
  optionsContainer.innerHTML = '';

  // Render randomized choices or native index structures safely
  currentData.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.type = 'button';
    btn.addEventListener('click', () => handleSelection(btn, option, currentData.answer));
    optionsContainer.appendChild(btn);
  });
}

// --- EVALUATION SELECTION CONTROL ---
function handleSelection(selectedButton, selectedValue, correctValue) {
  // Prevent evaluation double clicking anomalies
  const allButtons = optionsContainer.querySelectorAll('.option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedValue === correctValue) {
    score++;
    scoreCounter.textContent = `Score: ${score}`;
    selectedButton.classList.add('correct-choice');
  } else {
    selectedButton.classList.add('incorrect-choice');
    // Reveal correct choice for optimal feedback loops
    allButtons.forEach(btn => {
      if (btn.textContent === correctValue) {
        btn.classList.add('correct-choice');
      }
    });
  }

  // Smooth UI delay to check feedback before structural step progression
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      renderSummaryReport();
    }
  }, 1200);
}

// --- TERMINAL SUMMARY PROCESSOR ---
function renderSummaryReport() {
  finalScoreLabel.textContent = score;
  reportNameLabel.textContent = studentName;

  const percentage = (score / quizData.length) * 100;
  let feedback = "";

  if (percentage === 100) feedback = "Perfect Score! Absolute Mastery.";
  else if (percentage >= 80) feedback = "Excellent work! Strong analytical understanding.";
  else if (percentage >= 50) feedback = "Good effort! Review missed terms to improve further.";
  else feedback = "Needs Practice. Go back over Mean, Median, and Mode fundamentals.";

  performanceLabel.textContent = feedback;
  showScreen(screens.score);
}

// --- REBOOT ASSESSMENT RUNTIME SYSTEM ---
restartBtn.addEventListener('click', () => {
  inputName.value = '';
  startBtn.disabled = true;
  showScreen(screens.login);
});
