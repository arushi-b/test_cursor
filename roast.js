// Game State
let currentTheme = null;
let gameActive = false;
let timeLeft = 45;
let timerInterval = null;
let playerScore = 0;
let botScore = 0;
let isBotTyping = false;

// Theme-specific roast collections
const roastThemes = {
  classic: [
    "I'd agree with you, but then we'd both be wrong.",
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "You bring everyone so much joy… when you leave the room.",
    "You have something on your face… oh wait, that's just your face.",
    "You're proof that even evolution takes a break sometimes.",
    "Your roasts are so weak, I'm getting secondhand embarrassment.",
    "I've seen better comebacks in a tennis match.",
    "That was so bad, even the crowd is booing you.",
    "Your wit is drier than the Sahara desert.",
    "I've heard better insults from a kindergarten playground."
  ],
  savage: [
    "Your existence is proof that God has a sense of humor.",
    "I'd roast you, but I don't want to be accused of animal cruelty.",
    "You're so dense, light bends around you.",
    "I'd explain it to you, but I don't have any crayons.",
    "You're not stupid, you're just intellectually challenged.",
    "Your face looks like it caught fire and someone tried to put it out with a fork.",
    "You're the reason aliens won't visit Earth.",
    "I'd insult you, but you're not worth the energy.",
    "You're so ugly, when you were born, the doctor slapped your mother.",
    "Your personality is like a wet blanket at a party."
  ],
  intellectual: [
    "Your argument is as sound as a chocolate teapot.",
    "You possess the intellectual depth of a puddle in a parking lot.",
    "Your logic is so flawed, it makes flat Earth theory seem reasonable.",
    "You're not wrong, you're just not right either.",
    "Your reasoning skills are inversely proportional to your confidence.",
    "You're the human equivalent of a participation trophy.",
    "Your cognitive abilities are like a broken pencil - pointless.",
    "You're so intellectually bankrupt, you couldn't afford a thought.",
    "Your brain is like a computer with 2GB RAM trying to run Windows 11.",
    "You're proof that evolution can go backwards."
  ],
  random: [
    "You're like a broken pencil - pointless.",
    "Your face is so ugly, it could stop a clock.",
    "You're not stupid, you're just intellectually challenged.",
    "I'd explain it to you, but I don't have any crayons.",
    "You're so dense, light bends around you.",
    "Your existence is proof that God has a sense of humor.",
    "You're the reason aliens won't visit Earth.",
    "I'd roast you, but I don't want to be accused of animal cruelty.",
    "You're so ugly, when you were born, the doctor slapped your mother.",
    "Your personality is like a wet blanket at a party.",
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "You bring everyone so much joy… when you leave the room.",
    "You have something on your face… oh wait, that's just your face.",
    "You're proof that even evolution takes a break sometimes.",
    "Your roasts are so weak, I'm getting secondhand embarrassment."
  ]
};


// DOM Elements
const landingPage = document.getElementById('landingPage');
const themePage = document.getElementById('themePage');
const battlePage = document.getElementById('battlePage');
const enterArenaBtn = document.getElementById('enterArena');
const themeCards = document.querySelectorAll('.theme-card');
const startBattleBtn = document.getElementById('startBattle');
const battleTitle = document.getElementById('battleTitle');
const log = document.querySelector('.battle-log');
const playerInput = document.getElementById('playerInput');
const sendBtn = document.getElementById('sendBtn');
const timer = document.getElementById('timer');
const playerScoreEl = document.getElementById('playerScore');
const botScoreEl = document.getElementById('botScore');

// Page Navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

// Landing Page Events
enterArenaBtn.addEventListener('click', () => {
  showPage('themePage');
});

// Theme Selection Events
themeCards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove previous selection
    themeCards.forEach(c => c.classList.remove('selected'));
    
    // Select current card
    card.classList.add('selected');
    currentTheme = card.dataset.theme;
    
    // Enable start button
    startBattleBtn.disabled = false;
    startBattleBtn.textContent = 'START BATTLE! ⚔️';
  });
});

startBattleBtn.addEventListener('click', () => {
  if (currentTheme) {
    startBattle();
  }
});

// Battle Functions
function startBattle() {
  showPage('battlePage');
  gameActive = true;
  timeLeft = 45;
  playerScore = 0;
  botScore = 0;
  isBotTyping = false;
  
  // Update battle title with theme
  const themeNames = {
    classic: 'Classic Roasts',
    savage: 'Savage Mode',
    intellectual: 'Intellectual Burns',
    random: 'Chaos Mode'
  };
  battleTitle.textContent = `🔥 ${themeNames[currentTheme]} Arena 🔥`;
  
  // Clear log and add welcome message
  log.innerHTML = '';
  addToLog("Welcome to the arena, challenger! Let's see what you've got.", "RoastBot 3000");
  
  // Start timer
  startTimer();
  
  // Enable input after a delay
  setTimeout(() => {
    playerInput.disabled = false;
    sendBtn.disabled = false;
    playerInput.focus();
    addToLog("Your turn! You have 45 seconds to respond...", "System");
  }, 2000);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    
    // Change timer color as time runs out
    if (timeLeft <= 10) {
      timer.style.color = '#ff4444';
      timer.style.animation = 'pulse 0.5s infinite';
    } else if (timeLeft <= 20) {
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
  playerInput.disabled = true;
  sendBtn.disabled = true;
  
  addToLog("TIME'S UP! You failed to respond in time!", "System");
  botScore++;
  updateScores();
  
  // Bot gets a free roast
  setTimeout(() => {
    if (roastThemes[currentTheme].length > 0) {
      botTurn();
    }
  }, 1500);
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  botScoreEl.textContent = botScore;
}

function addToLog(text, who = "game") {
  const p = document.createElement("p");
  p.innerHTML = `<b>${who}:</b> ${text}`;
  p.style.opacity = "0";
  p.style.transform = "translateY(20px)";
  log.appendChild(p);
  
  // Animate the message appearing
  setTimeout(() => {
    p.style.transition = "all 0.5s ease";
    p.style.opacity = "1";
    p.style.transform = "translateY(0)";
  }, 100);
  
  log.scrollTop = log.scrollHeight;
  
  // Add battle effect for roasts
  if (who === "You" || who === "RoastBot 3000") {
    createBattleEffect();
  }
}

function createBattleEffect() {
  const effect = document.createElement("div");
  effect.style.position = "fixed";
  effect.style.top = "50%";
  effect.style.left = "50%";
  effect.style.transform = "translate(-50%, -50%)";
  effect.style.fontSize = "3rem";
  effect.style.color = "#ff4444";
  effect.style.pointerEvents = "none";
  effect.style.zIndex = "1000";
  effect.style.animation = "battleEffect 1s ease-out forwards";
  effect.innerHTML = "⚡";
  
  document.body.appendChild(effect);
  
  setTimeout(() => {
    document.body.removeChild(effect);
  }, 1000);
}

function sendRoast() {
  if (!gameActive || isBotTyping) return;
  
  const playerText = playerInput.value.trim();
  if (!playerText) return;
  
  // Reset timer
  timeLeft = 45;
  timer.style.color = '#ffd700';
  timer.style.animation = 'none';
  
  playerInput.value = "";
  addToLog(playerText, "You");
  
  if (playerText.toLowerCase() === "quit") {
    endGame("You gave up! RoastBot 3000 wins! 🤖");
    return;
  }
  
  // Check if bot has roasts left
  if (roastThemes[currentTheme].length === 0) {
    endGame("You win! RoastBot 3000 is out of roasts! 🎉");
    return;
  }
  
  // Disable input while bot is responding
  playerInput.disabled = true;
  sendBtn.disabled = true;
  isBotTyping = true;
  
  // Bot responds with realistic typing delay
  setTimeout(() => {
    botTurn();
  }, 1000 + Math.random() * 2000); // 1-3 second delay
}

function botTurn() {
  if (!gameActive) return;
  
  // Get random roast
  const roastIndex = Math.floor(Math.random() * roastThemes[currentTheme].length);
  const botRoast = roastThemes[currentTheme].splice(roastIndex, 1)[0];
  
  // Simulate realistic typing with character-by-character display
  typeMessage(botRoast, "RoastBot 3000", () => {
    // Re-enable input
    setTimeout(() => {
      if (gameActive) {
        playerInput.disabled = false;
        sendBtn.disabled = false;
        playerInput.focus();
        isBotTyping = false;
        
        // Reset timer
        timeLeft = 45;
        timer.textContent = timeLeft;
        timer.style.color = '#ffd700';
        timer.style.animation = 'none';
      }
    }, 1000);
  });
}

function typeMessage(text, sender, callback) {
  const p = document.createElement("p");
  p.innerHTML = `<b>${sender}:</b> <span class="typing-text"></span>`;
  p.style.opacity = "0";
  p.style.transform = "translateY(20px)";
  log.appendChild(p);
  
  setTimeout(() => {
    p.style.transition = "all 0.5s ease";
    p.style.opacity = "1";
    p.style.transform = "translateY(0)";
  }, 100);
  
  const typingSpan = p.querySelector('.typing-text');
  let i = 0;
  
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      typingSpan.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      if (callback) callback();
    }
  }, 50 + Math.random() * 100); // Realistic typing speed with variation
  
  log.scrollTop = log.scrollHeight;
}

function endGame(message) {
  gameActive = false;
  clearInterval(timerInterval);
  playerInput.disabled = true;
  sendBtn.disabled = true;
  
  addToLog(message, "System");
  
  // Show final scores
  setTimeout(() => {
    addToLog(`Final Score - You: ${playerScore}, RoastBot 3000: ${botScore}`, "System");
    if (playerScore > botScore) {
      addToLog("Congratulations! You are the roast champion! 🏆", "System");
    } else if (botScore > playerScore) {
      addToLog("Better luck next time! RoastBot 3000 reigns supreme! 👑", "System");
    } else {
      addToLog("It's a tie! You're both equally savage! 🤝", "System");
    }
  }, 2000);
}

// Event Listeners
sendBtn.addEventListener("click", sendRoast);
playerInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && !playerInput.disabled) {
    sendRoast();
  }
});

// Initialize
console.log("Roast Battle 3000 loaded successfully!");
