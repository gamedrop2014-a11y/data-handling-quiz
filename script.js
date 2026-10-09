// --- PROJECT CONFIGURATION & DATA (ALL VALUES COMPLETED) ---
const quizData = [
  {
    visual: "Scenario: Ashish studies on three consecutive days.",
    question: "What is the average number of hours he studies daily?",
    options: ["3 hours", "4 hours", "5 hours", "12 hours"],
    answer: "4 hours",
    graphData: { labels: ["Day 1", "Day 2", "Day 3"], values: [4, 5, 3] }
  },
  {
    visual: "Data Handling Terminology Definition Evaluation.",
    question: "The difference between the highest and the lowest observations in a data set is its __________.",
    options: ["frequency", "width", "range", "mode"],
    answer: "range"
  },
  {
    visual: "Dataset Sample Array Matrix.",
    question: "The mean of the numbers 10, 20, 30, and 40 is __________.",
    options: ["20", "25", "30", "50"],
    answer: "25",
    graphData: { labels: ["1st", "2nd", "3rd", "4th"], values: [10, 20, 30, 40] }
  },
  {
    visual: "Distribution Array Stream.",
    question: "The mode of the distribution is __________.",
    options: ["7", "4", "3", "1"],
    answer: "4",
    graphData: { labels: ["1", "2", "3", "4", "5"], values: [1, 1, 2, 3, 1] }
  },
  {
    visual: "Dataset Matrix.",
    question: "What is the calculated range (R)?",
    options: ["5", "2", "7", "9"],
    answer: "7",
    graphData: { labels: ["A", "B", "C", "D", "E"], values: [4, 7, 2, 9, 5] }
  },
  {
    visual: "Tally Table: Margins of Victory in Matches.",
    question: "According to the tally data, which margin of victory occurs most frequently (14 times) and represents the mode?",
    options: ["1", "2", "6", "14"],
    answer: "2",
    graphData: { labels: ["Marg 1", "Marg 2", "Marg 3", "Marg 4"], values: [5, 14, 7, 3] }
  },
  {
    visual: "Dataset Stream.",
    question: "What is the median value for this dataset?",
    options: ["10", "15", "50", "100"],
    answer: "15",
    graphData: { labels: ["Min", "Low", "Mid", "High", "Max"], values: [6, 10, 15, 50, 120] }
  },
  {
    visual: "Dataset: Marks obtained in a Science Test.",
    question: "What is the range of these marks? (Highest - Lowest)",
    options: ["39", "48", "56", "95"],
    answer: "56",
    graphData: { labels: ["Low Mark", "High Mark"], values: [39, 95] }
  },
  {
    visual: "Prime Numbers Configuration Node.",
    question: "The mean of the first five prime numbers (2, 3, 5, 7, 11) is __________.",
    options: ["4", "4.7", "5", "5.6"],
    answer: "5.6",
    graphData: { labels: ["1st", "2nd", "3rd", "4th", "5th"], values: [2, 3, 5, 7, 11] }
  },
  {
    visual: "Averages Core Principle Evaluator.",
    question: "The arithmetic mean of 5 scores is 85. Then the sum of the scores is __________.",
    options: ["425", "85", "More than 425", "Less than 400"],
    answer: "425"
  },
  {
    visual: "Statistical Rule Concept Block.",
    question: "If each score in a dataset is increased by 5, then the mean __________.",
    options: ["Remains the same", "Increases by 5", "Decreases by 5", "None of these"],
    answer: "Increases by 5"
  },
  {
    visual: "Central Tendency Concept Analysis.",
    question: "Which measures of central tendency get affected if the extreme observations on both the ends of a sorted dataset are removed?",
    options: ["Mean and mode", "Mean and Median", "Mode and Median", "Mean, Median, and Mode"],
    answer: "Mean and mode"
  },
  {
    visual: "Dataset on a Board Structure.",
    question: "What is the range of these integers?",
    options: ["31", "37", "20", "3"],
    answer: "37",
    graphData: { labels: ["Min", "Neg", "Zero", "Pos", "Max"], values: [-17, -11, 0, 5, 20] }
  },
  {
    visual: "Card Probability Analysis.",
    question: "The probability of drawing a face card (Jack, Queen, King) from a standard pack of 52 cards is __________.",
    options: ["1/13", "4/13", "3/13", "5/13"],
    answer: "3/13"
  },
  {
    visual: "Probability Scenario: Box configurations.",
    question: "One ball is picked up randomly. What is the probability that it is blue?",
    options: ["1/3", "3/4", "7/19", "2/5"],
    answer: "1/3",
    graphData: { labels: ["Red", "Blue", "Green"], values: [8, 7, 6] }
  }
];

let currentQuestionIndex = 0;
let score = 0;
let studentName = "";

// --- DOM SELECTION ELEMENTS ---
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

// Graph Containers
const graphWrapper = document.getElementById('graph-wrapper');
const chartBarsContainer = document.getElementById('chart-bars');

const finalScoreLabel = document.getElementById('final-score');
const totalScoreLabel = document.getElementById('total-score');
const reportNameLabel = document.getElementById('report-name');
const performanceLabel = document.getElementById('performance-feedback');

// --- PANEL LAYOUT TOGGLE FUNCTION ---
function showScreen(targetScreen) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  targetScreen.classList.add('active');
}

// --- APP LIFECYCLE ROUTINES ---
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    showScreen(screens.login);
  }, 1800);
  totalScoreLabel.textContent = quizData.length;
});

inputName.addEventListener('input', () => {
  startBtn.disabled = inputName.value.trim().length < 2;
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

// --- CORE INTERACTIVE ENGINE RENDERER ---
function loadQuestion() {
  const currentData = quizData[currentQuestionIndex];
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  dataVisualBox.textContent = currentData.visual;
  questionTextBox.textContent = currentData.question;
  optionsContainer.innerHTML = '';

  // DYNAMIC CHART RENDERING DISPATCHER
  if (currentData.graphData) {
    graphWrapper.style.display = 'block';
    chartBarsContainer.innerHTML = '';
    
    // Calculate maximum structural boundaries to maintain clean scaling heights
    const maxVal = Math.max(...currentData.graphData.values.map(v => Math.abs(v)));
    
    currentData.graphData.labels.forEach((label, idx) => {
      const originalValue = currentData.graphData.values[idx];
      // Convert metrics into uniform height percentage steps
      const percentageHeight = maxVal > 0 ? (Math.abs(originalValue) / maxVal) * 85 : 10;
      
      const barWrapper = document.createElement('div');
      barWrapper.className = 'bar-wrapper';
      
      const barElement = document.createElement('div');
      barElement.className = 'bar';
      barElement.style.height = `${percentageHeight}%`;
      
      // Value indicator tag
      const valueSpan = document.createElement('span');
      valueSpan.className = 'bar-value';
      valueSpan.textContent = originalValue;
      
      // Axis label container
      const labelDiv = document.createElement('div');
      labelDiv.className = 'bar-label';
      labelDiv.textContent = label;
      
      barElement.appendChild(valueSpan);
      barWrapper.appendChild(barElement);
      barWrapper.appendChild(labelDiv);
      chartBarsContainer.appendChild(barWrapper);
    });
  } else {
    // Hide graph area if question is purely text conceptual terminology
    graphWrapper.style.display = 'none';
  }

  // Option Action Generators
  currentData.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.type = 'button';
    btn.addEventListener('click', () => handleSelection(btn, option, currentData.answer));
    optionsContainer.appendChild(btn);
  });
}

function handleSelection(selectedButton, selectedValue, correctValue) {
  const allButtons = optionsContainer.querySelectorAll('.option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedValue === correctValue) {
    score++;
    scoreCounter.textContent = `Score: ${score}`;
    selectedButton.classList.add('correct-choice');
  } else {
    selectedButton.classList.add('incorrect-choice');
    allButtons.forEach(btn => {
      if (btn.textContent === correctValue) btn.classList.add('correct-choice');
    });
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      renderSummaryReport();
    }
  }, 1400);
}

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

restartBtn.addEventListener('click', () => {
  inputName.value = '';
  startBtn.disabled = true;
  showScreen(screens.login);
});
