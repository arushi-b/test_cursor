// SONG LYRIC CHALLENGE - Game State
let gameActive = false;
let timeLeft = 30;
let timerInterval = null;
let currentWord = '';
let score = 0;
let streak = 0;
let round = 1;
let usedWords = [];

// Word database for the game
const wordDatabase = [
  'love', 'heart', 'dream', 'night', 'day', 'time', 'life', 'world', 'home', 'fire',
  'water', 'sky', 'star', 'moon', 'sun', 'rain', 'wind', 'light', 'dark', 'blue',
  'red', 'green', 'black', 'white', 'gold', 'silver', 'dance', 'sing', 'music', 'song',
  'voice', 'smile', 'tears', 'pain', 'joy', 'hope', 'fear', 'free', 'fly', 'run',
  'walk', 'talk', 'see', 'feel', 'know', 'think', 'believe', 'remember', 'forget', 'try',
  'fight', 'win', 'lose', 'fall', 'rise', 'break', 'mend', 'start', 'end', 'begin',
  'forever', 'never', 'always', 'sometimes', 'maybe', 'sure', 'lost', 'found', 'gone', 'here',
  'there', 'everywhere', 'nowhere', 'somewhere', 'anywhere', 'together', 'alone', 'friend', 'family', 'mother',
  'father', 'sister', 'brother', 'baby', 'child', 'man', 'woman', 'boy', 'girl', 'people',
  'city', 'town', 'street', 'road', 'house', 'door', 'window', 'room', 'bed', 'chair',
  'table', 'book', 'phone', 'car', 'train', 'plane', 'boat', 'ship', 'bridge', 'mountain',
  'river', 'ocean', 'tree', 'flower', 'bird', 'dog', 'cat', 'horse', 'cow', 'fish',
  'money', 'work', 'play', 'game', 'fun', 'party', 'celebration', 'holiday', 'vacation', 'trip',
  'journey', 'adventure', 'story', 'tale', 'legend', 'myth', 'magic', 'miracle', 'wonder', 'beauty',
  'truth', 'lie', 'secret', 'mystery', 'question', 'answer', 'problem', 'solution', 'choice', 'decision',
  'chance', 'luck', 'fate', 'destiny', 'future', 'past', 'present', 'moment', 'second', 'minute',
  'hour', 'week', 'month', 'year', 'century', 'age', 'young', 'old', 'new', 'old',
  'first', 'last', 'next', 'previous', 'before', 'after', 'during', 'while', 'until', 'since',
  'because', 'although', 'however', 'therefore', 'moreover', 'furthermore', 'nevertheless', 'meanwhile', 'finally', 'suddenly'
];

// DOM Elements
const landingPage = document.getElementById('landingPage');
const gamePage = document.getElementById('gamePage');
const gameArenaPage = document.getElementById('gameArenaPage');
const enterArenaBtn = document.getElementById('enterArena');
const startGameBtn = document.getElementById('startGame');
const currentWordEl = document.getElementById('currentWord');
const currentWordArenaEl = document.getElementById('currentWordArena');
const timer = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const scoreArenaEl = document.getElementById('scoreArena');
const streakEl = document.getElementById('streak');
const streakArenaEl = document.getElementById('streakArena');
const roundEl = document.getElementById('round');
const roundArenaEl = document.getElementById('roundArena');
const gameLog = document.getElementById('gameLog');
const songTitleInput = document.getElementById('songTitle');
const songLyricInput = document.getElementById('songLyric');
const submitBtn = document.getElementById('submitBtn');
const skipBtn = document.getElementById('skipBtn');
const quitBtn = document.getElementById('quitBtn');

// Page Navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

// Landing Page Events
enterArenaBtn.addEventListener('click', () => {
  showPage('gamePage');
});

// Game Page Events
startGameBtn.addEventListener('click', () => {
  startGame();
});

// Game Functions
function startGame() {
  showPage('gameArenaPage');
  gameActive = true;
  score = 0;
  streak = 0;
  round = 1;
  usedWords = [];
  
  // Clear log and add welcome message
  gameLog.innerHTML = '';
  addToLog("Welcome to the Song Lyric Challenge! 🌸", "System");
  addToLog("You have 30 seconds for each word. Good luck! 🌸", "System");
  
  // Update stats
  updateStats();
  
  // Start first round
  startNewRound();
}

function startNewRound() {
  if (!gameActive) return;
  
  // Get a new word
  currentWord = getNewWord();
  currentWordArenaEl.textContent = currentWord.toUpperCase();
  
  // Reset timer
  timeLeft = 30;
  timer.textContent = timeLeft;
  timer.style.color = '#ffd700';
  timer.style.animation = 'none';
  
  // Clear inputs
  songTitleInput.value = '';
  songLyricInput.value = '';
  
  // Enable inputs
  songTitleInput.disabled = false;
  songLyricInput.disabled = false;
  submitBtn.disabled = false;
  skipBtn.disabled = false;
  
  // Focus on first input
  songTitleInput.focus();
  
  // Start timer
  startTimer();
  
  addToLog(`Round ${round}: Find a song with the word "${currentWord}"! 🌸`, "System");
}

function getNewWord() {
  let availableWords = wordDatabase.filter(word => !usedWords.includes(word));
  
  if (availableWords.length === 0) {
    // Reset used words if all words have been used
    usedWords = [];
    availableWords = wordDatabase;
  }
  
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const selectedWord = availableWords[randomIndex];
  usedWords.push(selectedWord);
  
  return selectedWord;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    
    // Change timer color as time runs out
    if (timeLeft <= 5) {
      timer.style.color = '#ff4444';
      timer.style.animation = 'pulse 0.5s infinite';
      createScreenShake();
    } else if (timeLeft <= 10) {
      timer.style.color = '#ffaa00';
    }
    
    if (timeLeft <= 0) {
      timeUp();
    }
  }, 1000);
}

function timeUp() {
  clearInterval(timerInterval);
  gameActive = false;
  songTitleInput.disabled = true;
  songLyricInput.disabled = true;
  submitBtn.disabled = true;
  skipBtn.disabled = true;
  
  addToLog("⏰ TIME'S UP! You failed to submit in time! ⏰", "System");
  addToLog(`The word was: "${currentWord}"`, "System");
  
  // End game
  setTimeout(() => {
    endGame();
  }, 2000);
}

function submitAnswer() {
  if (!gameActive) return;
  
  const title = songTitleInput.value.trim();
  const lyric = songLyricInput.value.trim();
  
  if (!title || !lyric) {
    addToLog("Please enter both song title and lyric! 📝", "System");
    return;
  }
  
  // Check if the lyric contains the word (case insensitive)
  if (!lyric.toLowerCase().includes(currentWord.toLowerCase())) {
    addToLog(`❌ The lyric doesn't contain the word "${currentWord}"! Try again!`, "System");
    return;
  }
  
  // Success!
  clearInterval(timerInterval);
  
  // Calculate points
  const points = Math.max(1, Math.floor(timeLeft / 3)); // More points for faster answers
  score += points;
  streak++;
  
  addToLog(`✅ CORRECT! "${title}" - "${lyric}"`, "You");
  addToLog(`🌸 +${points} points! Streak: ${streak}x`, "System");
  
  // Update stats
  updateStats();
  
  // Disable inputs
  songTitleInput.disabled = true;
  songLyricInput.disabled = true;
  submitBtn.disabled = true;
  skipBtn.disabled = true;
  
  // Move to next round
  round++;
  setTimeout(() => {
    if (gameActive) {
      startNewRound();
    }
  }, 2000);
}

function skipWord() {
  if (!gameActive) return;
  
  clearInterval(timerInterval);
  
  addToLog(`⏭️ Skipped word: "${currentWord}"`, "System");
  
  // Reset streak
  streak = 0;
  updateStats();
  
  // Disable inputs
  songTitleInput.disabled = true;
  songLyricInput.disabled = true;
  submitBtn.disabled = true;
  skipBtn.disabled = true;
  
  // Move to next round
  round++;
  setTimeout(() => {
    if (gameActive) {
      startNewRound();
    }
  }, 1500);
}

function quitGame() {
  gameActive = false;
  clearInterval(timerInterval);
  
  addToLog("🌸 Game ended by player choice", "System");
  
  setTimeout(() => {
    endGame();
  }, 1000);
}

function updateStats() {
  scoreEl.textContent = score;
  scoreArenaEl.textContent = score;
  streakEl.textContent = streak;
  streakArenaEl.textContent = streak;
  roundEl.textContent = round;
  roundArenaEl.textContent = round;
}

function addToLog(text, who = "System") {
  const p = document.createElement("p");
  p.innerHTML = `<b>${who}:</b> ${text}`;
  p.style.opacity = "0";
  p.style.transform = "translateY(20px)";
  gameLog.appendChild(p);
  
  // Animate the message appearing
  setTimeout(() => {
    p.style.transition = "all 0.5s ease";
    p.style.opacity = "1";
    p.style.transform = "translateY(0)";
  }, 100);
  
  gameLog.scrollTop = gameLog.scrollHeight;
  
  // Add effect for correct answers
  if (who === "You") {
    createSuccessEffect();
  }
}

function createSuccessEffect() {
  const effect = document.createElement("div");
  effect.style.position = "fixed";
  effect.style.top = "50%";
  effect.style.left = "50%";
  effect.style.transform = "translate(-50%, -50%)";
  effect.style.fontSize = "4rem";
  effect.style.color = "#ff6b9d";
  effect.style.pointerEvents = "none";
  effect.style.zIndex = "1000";
  effect.style.animation = "successEffect 1s ease-out forwards";
  effect.innerHTML = "🌸";
  
  document.body.appendChild(effect);
  
  setTimeout(() => {
    document.body.removeChild(effect);
  }, 1000);
}

function createScreenShake() {
  document.body.style.animation = 'screenShake 0.5s ease-in-out';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 500);
}

function endGame() {
  gameActive = false;
  clearInterval(timerInterval);
  songTitleInput.disabled = true;
  songLyricInput.disabled = true;
  submitBtn.disabled = true;
  skipBtn.disabled = true;
  
  // Show final stats
  addToLog("🌸 GAME OVER! 🌸", "System");
  addToLog(`Final Score: ${score} points`, "System");
  addToLog(`Rounds Completed: ${round - 1}`, "System");
  addToLog(`Best Streak: ${streak}x`, "System");
  
  // Show performance message
  setTimeout(() => {
    if (score >= 50) {
      addToLog("🌸 AMAZING! You're a true music expert! 🌸", "System");
    } else if (score >= 30) {
      addToLog("🌸 GREAT JOB! You know your music! 🌸", "System");
    } else if (score >= 15) {
      addToLog("🌸 GOOD EFFORT! Keep practicing! 🌸", "System");
    } else {
      addToLog("🌸 NICE TRY! Better luck next time! 🌸", "System");
    }
    
    addToLog("Click 'Quit Game' to return to main menu", "System");
  }, 2000);
}

// Event Listeners
submitBtn.addEventListener("click", submitAnswer);
skipBtn.addEventListener("click", skipWord);
quitBtn.addEventListener("click", quitGame);

// Enter key support
songTitleInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && !songTitleInput.disabled) {
    songLyricInput.focus();
  }
});

songLyricInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && !songLyricInput.disabled) {
    submitAnswer();
  }
});

// Initialize
console.log("Song Lyric Challenge loaded successfully!");