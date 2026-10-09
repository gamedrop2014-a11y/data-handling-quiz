// --- PROJECT CONFIGURATION & DATA ---
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
    question: "The probability of drawing a face card from a standard pack of 52 cards is __________.",
    options: ["1/13", "4/13", "3/13", "5/13"],
    answer: "3/13"
  },
  {
    visual: "Probability Scenario: A box contains 8 red, 7 blue, and 6 green balls.",
    question: "One ball is picked up randomly. What is the probability that it is neither red nor green (meaning it must be blue)?",
    options: ["2/3", "3/4", "7/21", "7/19"],
    answer: "7/19"
  }
];

// --- STATE VARIABLES ---
let currentQuestionIndex = 0;
let pointsScore = 0;
let studentName = "";
let isProcessingAnswer = false;

// --- INITIALIZE IMMEDIATELY ---
function initQuiz() {
  const screens = {
    loading: document.getElementById('loading-screen'),
    login: document.getElementById('login-screen'),
    game: document.getElementById('game-screen'),
    score: document.getElementById('score-screen')
  };

  function switchScreen(screenKey) {
    Object.keys(screens).forEach(key => {
      if(screens[key]) screens[key].classList.remove('active');
    });
    if(screens[screenKey]) screens[screenKey].classList.add('active');
  }

  // Auto transition from loading screen to name screen after 2 seconds
  setTimeout(() => {
    switchScreen('login');
  }, 2000);

  const nameInput = document.getElementById('student-name');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');

  if(nameInput && startBtn) {
    nameInput.addEventListener('input', (e) => {
      startBtn.disabled = e.target.value.trim().length < 2;
    });

    startBtn.addEventListener('click', () => {
      studentName = nameInput.value.trim();
      const nameDisplay = document.getElementById('display-student-name');
      if(nameDisplay) {
        nameDisplay.innerHTML = `Student: ${studentName} &nbsp;&nbsp; <span id="score-counter">Points: 0</span>`;
      }
      switchScreen('game');
      loadQuestion();
    });
  }

  if(restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentQuestionIndex = 0;
      pointsScore = 0;
      if(nameInput) nameInput.value = "";
      if(startBtn) startBtn.disabled = true;
      switchScreen('login');
    });
  }

  function loadQuestion() {
    isProcessingAnswer = false;
    const currentQuestion = quizData[currentQuestionIndex];
    
    const progressEl = document.getElementById('progress');
    const visualEl = document.getElementById('data-visual');
    const textEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    // Dynamically names the counter based on quizData.length (which is now 15)
    if(progressEl) progressEl.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    if(visualEl) visualEl.innerText = currentQuestion.visual;
    if(textEl) textEl.innerText = currentQuestion.question;
    
    if(optionsContainer) {
      optionsContainer.innerHTML = "";
      currentQuestion.options.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = option;
        btn.addEventListener('click', (e) => handleAnswerSubmit(option, e.target));
        optionsContainer.appendChild(btn);
      });
    }
  }

  function handleAnswerSubmit(selectedOption, clickedButton) {
    if (isProcessingAnswer) return; 
    isProcessingAnswer = true; 

    const currentQuestion = quizData[currentQuestionIndex];
    const allButtons = document.querySelectorAll('.option-btn');
    
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedOption === currentQuestion.answer) {
      pointsScore++;
      clickedButton.classList.add('correct-choice');
      const counterEl = document.getElementById('score-counter');
      if(counterEl) counterEl.innerText = `Points: ${pointsScore}`;
    } else {
      clickedButton.classList.add('incorrect-choice');
      allButtons.forEach(btn => {
        if (btn.innerText === currentQuestion.answer) {
          btn.classList.add('correct-choice');
        }
      });
    }
    
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        loadQuestion();
      } else {
        switchScreen('score');
        
        const finalScoreEl = document.getElementById('final-score');
        const totalScoreEl = document.getElementById('total-score');
        const reportNameEl = document.getElementById('report-name');
        const feedbackEl = document.getElementById('performance-feedback');

        if(finalScoreEl) finalScoreEl.innerText = pointsScore;
        if(totalScoreEl) totalScoreEl.innerText = quizData.length;
        if(reportNameEl) reportNameEl.innerText = studentName;
        
        const percentage = (pointsScore / quizData.length) * 100;
        let feedback = "";
        
        if (percentage === 100) {
          feedback = "Excellent Master of Data Analytics! Perfect Score!";
        } else if (percentage >= 70) {
          feedback = "Good Data Interpreter. Keep practicing!";
        } else {
          feedback = "Needs review. Re-evaluate structural fundamentals.";
        }
        
        if(feedbackEl) feedbackEl.innerText = feedback;
      }
    }, 1500);
  }
}

// Run the script directly
initQuiz();
