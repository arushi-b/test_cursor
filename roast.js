// EPIC ROAST BATTLE ROYALE - Game State
let currentTheme = null;
let gameActive = false;
let timeLeft = 30;
let timerInterval = null;
let playerHealth = 100;
let botHealth = 100;
let comboCount = 0;
let damageDealt = 0;
let isBotTyping = false;
let activePowerUps = {
  shield: false,
  damage: false,
  time: false,
  combo: false
};
let powerUpCooldowns = {
  shield: 0,
  damage: 0,
  time: 0,
  combo: 0
};

// Epic Roast Collections by Warrior Class
const roastThemes = {
  firelord: [
    "Your face looks like it caught fire and someone tried to put it out with a fork.",
    "You're so ugly, when you were born, the doctor slapped your mother.",
    "I'd roast you, but I don't want to be accused of animal cruelty.",
    "Your existence is proof that God has a sense of humor.",
    "You're so dense, light bends around you.",
    "I'd explain it to you, but I don't have any crayons.",
    "You're not stupid, you're just intellectually challenged.",
    "Your face looks like it was designed by committee.",
    "You're the reason aliens won't visit Earth.",
    "I'd insult you, but you're not worth the energy."
  ],
  mindbender: [
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
  shadowmaster: [
    "You're like a broken pencil - pointless.",
    "You're so ugly, it could stop a clock.",
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
  ],
  thunderking: [
    "I'd agree with you, but then we'd both be wrong.",
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "You bring everyone so much joy… when you leave the room.",
    "You have something on your face… oh wait, that's just your face.",
    "You're proof that even evolution takes a break sometimes.",
    "Your roasts are so weak, I'm getting secondhand embarrassment.",
    "I've seen better comebacks in a tennis match.",
    "That was so bad, even the crowd is booing you.",
    "Your wit is drier than the Sahara desert.",
    "I've heard better insults from a kindergarten playground.",
    "You're like a broken pencil - pointless.",
    "You're so ugly, it could stop a clock.",
    "You're not stupid, you're just intellectually challenged.",
    "I'd explain it to you, but I don't have any crayons.",
    "You're so dense, light bends around you."
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
const playerHealthEl = document.getElementById('playerHealth');
const playerHealthText = document.getElementById('playerHealthText');
const botHealthEl = document.getElementById('botHealth');
const botHealthText = document.getElementById('botHealthText');
const comboCountEl = document.getElementById('comboCount');
const damageDealtEl = document.getElementById('damageDealt');
const specialReadyEl = document.getElementById('specialReady');

// Power-up elements
const powerUps = document.querySelectorAll('.power-up');

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
    startBattleBtn.textContent = 'ENTER BATTLE! ⚔️';
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
  timeLeft = 30;
  playerHealth = 100;
  botHealth = 100;
  comboCount = 0;
  damageDealt = 0;
  isBotTyping = false;
  
  // Reset power-ups
  Object.keys(activePowerUps).forEach(key => activePowerUps[key] = false);
  Object.keys(powerUpCooldowns).forEach(key => powerUpCooldowns[key] = 0);
  
  // Update battle title with theme
  const themeNames = {
    firelord: 'Fire Lord',
    mindbender: 'Mind Bender',
    shadowmaster: 'Shadow Master',
    thunderking: 'Thunder King'
  };
  battleTitle.textContent = `⚔️ ${themeNames[currentTheme]} vs ROASTBOT 3000 ⚔️`;
  
  // Clear log and add welcome message
  log.innerHTML = '';
  addToLog("Welcome to the ultimate roast battle royale! Prepare for destruction!", "System");
  
  // Update health bars
  updateHealthBars();
  updateStats();
  updatePowerUps();
  
  // Start timer
  startTimer();
  
  // Enable input after a delay
  setTimeout(() => {
    playerInput.disabled = false;
    sendBtn.disabled = false;
    playerInput.focus();
    addToLog("Your turn! You have 30 seconds to launch your attack...", "System");
  }, 2000);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    
    // Update power-up cooldowns
    Object.keys(powerUpCooldowns).forEach(key => {
      if (powerUpCooldowns[key] > 0) {
        powerUpCooldowns[key]--;
      }
    });
    updatePowerUps();
    
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
  playerInput.disabled = true;
  sendBtn.disabled = true;
  
  addToLog("TIME'S UP! You failed to attack in time!", "System");
  takeDamage('player', 15);
  
  // Bot gets a free attack
  setTimeout(() => {
    if (botHealth > 0) {
      botTurn();
    }
  }, 1500);
}

function updateHealthBars() {
  playerHealthEl.style.width = `${playerHealth}%`;
  playerHealthText.textContent = `${playerHealth}/100`;
  botHealthEl.style.width = `${botHealth}%`;
  botHealthText.textContent = `${botHealth}/100`;
  
  // Check for game over
  if (playerHealth <= 0) {
    endGame("DEFEAT! RoastBot 3000 reigns supreme! 💀");
  } else if (botHealth <= 0) {
    endGame("VICTORY! You are the ultimate roast champion! 🏆");
  }
}

function updateStats() {
  comboCountEl.textContent = `${comboCount}x`;
  damageDealtEl.textContent = damageDealt;
  
  // Special ability indicator
  if (comboCount >= 3) {
    specialReadyEl.textContent = "🔥";
    specialReadyEl.style.color = "#ff4444";
  } else {
    specialReadyEl.textContent = "⚡";
    specialReadyEl.style.color = "#ffd700";
  }
}

function updatePowerUps() {
  powerUps.forEach(powerUp => {
    const power = powerUp.dataset.power;
    const cooldown = powerUpCooldowns[power];
    
    if (cooldown > 0) {
      powerUp.classList.add('cooldown');
      powerUp.classList.remove('ready');
      powerUp.querySelector('.power-cooldown').textContent = `${cooldown}s`;
    } else {
      powerUp.classList.add('ready');
      powerUp.classList.remove('cooldown');
      powerUp.querySelector('.power-cooldown').textContent = 'Ready';
    }
  });
}

function takeDamage(target, damage) {
  if (target === 'player') {
    playerHealth = Math.max(0, playerHealth - damage);
    createDamageNumber(damage, 'player');
  } else {
    botHealth = Math.max(0, botHealth - damage);
    damageDealt += damage;
    createDamageNumber(damage, 'bot');
  }
  
  updateHealthBars();
  updateStats();
  createScreenShake();
}

function createDamageNumber(damage, target) {
  const damageEl = document.createElement('div');
  damageEl.textContent = `-${damage}`;
  damageEl.style.position = 'fixed';
  damageEl.style.fontSize = '2rem';
  damageEl.style.fontWeight = 'bold';
  damageEl.style.color = '#ff4444';
  damageEl.style.pointerEvents = 'none';
  damageEl.style.zIndex = '1000';
  damageEl.style.animation = 'damageFloat 2s ease-out forwards';
  
  if (target === 'player') {
    damageEl.style.left = '20%';
    damageEl.style.top = '30%';
  } else {
    damageEl.style.right = '20%';
    damageEl.style.top = '30%';
  }
  
  document.body.appendChild(damageEl);
  
  setTimeout(() => {
    document.body.removeChild(damageEl);
  }, 2000);
}

function createScreenShake() {
  document.body.style.animation = 'screenShake 0.5s ease-in-out';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 500);
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
  effect.style.fontSize = "4rem";
  effect.style.color = "#ff4444";
  effect.style.pointerEvents = "none";
  effect.style.zIndex = "1000";
  effect.style.animation = "battleEffect 1s ease-out forwards";
  effect.innerHTML = "💥";
  
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
  timeLeft = 30;
  timer.style.color = '#ffd700';
  timer.style.animation = 'none';
  
  playerInput.value = "";
  addToLog(playerText, "You");
  
  if (playerText.toLowerCase() === "quit") {
    endGame("You surrendered! RoastBot 3000 wins! 🤖");
    return;
  }
  
  // Calculate damage based on combo and power-ups
  let damage = 10 + Math.floor(Math.random() * 15); // Base damage 10-25
  
  if (activePowerUps.damage) {
    damage *= 2;
    addToLog("🔥 DOUBLE DAMAGE ACTIVATED! 🔥", "System");
  }
  
  if (comboCount > 0) {
    damage += comboCount * 5;
    addToLog(`⚡ COMBO BONUS: +${comboCount * 5} damage! ⚡`, "System");
  }
  
  // Apply damage
  takeDamage('bot', damage);
  comboCount++;
  
  // Check if bot has health left
  if (botHealth <= 0) {
    return;
  }
  
  // Disable input while bot is responding
  playerInput.disabled = true;
  sendBtn.disabled = true;
  isBotTyping = true;
  
  // Bot responds with realistic typing delay
  setTimeout(() => {
    botTurn();
  }, 1000 + Math.random() * 2000);
}

function botTurn() {
  if (!gameActive || botHealth <= 0) return;
  
  // Get random roast
  const roastIndex = Math.floor(Math.random() * roastThemes[currentTheme].length);
  const botRoast = roastThemes[currentTheme].splice(roastIndex, 1)[0];
  
  // Calculate bot damage
  let botDamage = 8 + Math.floor(Math.random() * 12); // Bot damage 8-20
  
  // Simulate realistic typing with character-by-character display
  typeMessage(botRoast, "RoastBot 3000", () => {
    // Apply damage to player
    if (!activePowerUps.shield) {
      takeDamage('player', botDamage);
    } else {
      addToLog("🛡️ SHIELD ABSORBED THE DAMAGE! 🛡️", "System");
      activePowerUps.shield = false;
    }
    
    // Reset combo if player takes damage
    if (!activePowerUps.shield) {
      comboCount = 0;
    }
    
    // Re-enable input
    setTimeout(() => {
      if (gameActive && playerHealth > 0) {
        playerInput.disabled = false;
        sendBtn.disabled = false;
        playerInput.focus();
        isBotTyping = false;
        
        // Reset timer
        timeLeft = 30;
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
  }, 30 + Math.random() * 50); // Faster typing for epic battles
  
  log.scrollTop = log.scrollHeight;
}

function endGame(message) {
  gameActive = false;
  clearInterval(timerInterval);
  playerInput.disabled = true;
  sendBtn.disabled = true;
  
  addToLog(message, "System");
  
  // Show final stats
  setTimeout(() => {
    addToLog(`Final Stats - Damage Dealt: ${damageDealt}, Max Combo: ${comboCount}x`, "System");
    if (playerHealth > botHealth) {
      addToLog("🏆 EPIC VICTORY! You are the ultimate roast warrior! 🏆", "System");
    } else if (botHealth > playerHealth) {
      addToLog("💀 DEFEAT! Better luck next time, warrior! 💀", "System");
    } else {
      addToLog("🤝 DRAW! You're both equally savage! 🤝", "System");
    }
  }, 2000);
}

// Power-up event listeners
powerUps.forEach(powerUp => {
  powerUp.addEventListener('click', () => {
    const power = powerUp.dataset.power;
    if (powerUpCooldowns[power] === 0 && gameActive) {
      activatePowerUp(power);
    }
  });
});

function activatePowerUp(power) {
  switch(power) {
    case 'shield':
      activePowerUps.shield = true;
      powerUpCooldowns.shield = 15;
      addToLog("🛡️ SHIELD ACTIVATED! Next attack blocked! 🛡️", "System");
      break;
    case 'damage':
      activePowerUps.damage = true;
      powerUpCooldowns.damage = 20;
      addToLog("💥 DOUBLE DAMAGE ACTIVATED! Next attack deals 2x damage! 💥", "System");
      break;
    case 'time':
      timeLeft += 10;
      powerUpCooldowns.time = 25;
      addToLog("⏰ TIME FREEZE! +10 seconds added! ⏰", "System");
      break;
    case 'combo':
      comboCount += 2;
      powerUpCooldowns.combo = 18;
      addToLog("⚡ COMBO BOOST! +2 combo multiplier! ⚡", "System");
      break;
  }
  updatePowerUps();
  updateStats();
}

// Event Listeners
sendBtn.addEventListener("click", sendRoast);
playerInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && !playerInput.disabled) {
    sendRoast();
  }
});

// Initialize
console.log("Epic Roast Battle Royale loaded successfully!");