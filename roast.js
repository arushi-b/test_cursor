const botRoasts = [
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
  ];
  
  const crowdReactions = [
    "OHHHH 🔥🔥🔥",
    "BOOOOO! 👎",
    "That was weak…",
    "Grandma would roast better 😂",
    "MIC DROP 🎤",
    "CROWD GOES WILD! 🎉",
    "BRUTAL! 💀",
    "EPIC BURN! 🔥",
    "CROWD IS SILENT... 😶",
    "STANDING OVATION! 👏"
  ];
  
  const log = document.getElementById("log");
  const input = document.getElementById("playerInput");
  const sendBtn = document.getElementById("sendBtn");
  
  function addToLog(text, who="game") {
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
    
    // Add battle sound effect (visual feedback)
    if (who === "You" || who === "RoastBot 3000") {
      createBattleEffect();
    }
  }
  
  function createBattleEffect() {
    // Create a visual battle effect
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
    const playerText = input.value.trim();
    if (!playerText) return;
    input.value = "";
  
    if (playerText.toLowerCase() === "quit") {
      addToLog("RoastBot 3000: Running away already? I win! 🤖", "bot");
      return;
    }
  
    addToLog(playerText, "You");
  
    if (botRoasts.length === 0) {
      addToLog("...I'm out of roasts... you win! 🎉", "bot");
      return;
    }
  
    // Bot response
    const bot = botRoasts.splice(Math.floor(Math.random() * botRoasts.length), 1)[0];
    addToLog(bot, "RoastBot 3000");
  
    // Crowd reaction
    const reaction = crowdReactions[Math.floor(Math.random() * crowdReactions.length)];
    addToLog(reaction, "Crowd");
  }
  
  // Event listeners
  sendBtn.addEventListener("click", sendRoast);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendRoast();
  });
  
  // Start message
  addToLog("Welcome challenger! Step up and roast me.", "RoastBot 3000");
  
  // Debug: Check if elements are loaded
  console.log("Roast Battle loaded successfully!");
  console.log("Log element:", log);
  console.log("Input element:", input);
  console.log("Button element:", sendBtn);
  