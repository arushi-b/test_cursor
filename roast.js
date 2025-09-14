const botRoasts = [
    "I'd agree with you, but then we’d both be wrong.",
    "You're like a cloud. When you disappear, it’s a beautiful day.",
    "You bring everyone so much joy… when you leave the room.",
    "You have something on your face… oh wait, that's just your face.",
    "You're proof that even evolution takes a break sometimes."
  ];
  
  const crowdReactions = [
    "OHHHH 🔥🔥🔥",
    "meh 😴",
    "That was weak…",
    "Grandma would roast better 😂",
    "MIC DROP 🎤"
  ];
  
  const log = document.getElementById("log");
  const input = document.getElementById("playerInput");
  const sendBtn = document.getElementById("sendBtn");
  
  function addToLog(text, who="game") {
    const p = document.createElement("p");
    p.innerHTML = `<b>${who}:</b> ${text}`;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
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
  