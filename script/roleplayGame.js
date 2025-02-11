let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let enemyHealth;
let inventory = ["hand"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const hpText = document.querySelector("#hpText");
const goldText = document.querySelector("#goldText");
const enemyStats = document.querySelector("#enemyStats");
const enemyName = document.querySelector("#enemyName");
const enemyhpText = document.querySelector("#enemyHealth");
const weapons = [
  { name: 'hand', power: 5 },
  { name: 'flip knife', power: 30 },
  { name: 'glock', power: 50 },
  { name: 'AK 47', power: 100 }
];
const enemys = [
  {
    name: "Thug",
    level: 2,
    health: 15
  },
  {
    name: "Brute",
    level: 8,
    health: 60
  },
  {
    name: "Boss",
    level: 20,
    health: 300
  }
]

const locations = [
    {
      name: "town square",
      "button text": ["Go to Black Market", "Go to Street", "Fight Boss"],
      "button functions": [goMarket, goStreet, fightBoss],
      text: "You are in the town square. You see a sign that says \"Market\"."
    },
    {
      name: "Market",
      "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the Market."
    },
    {
      name: "Street",
      "button text": ["Fight Thug", "Fight off some Brutes", "Go to town square"],
      "button functions": [fightThug, fightBrute, goTown],
      text: "You enter the Street. You see some enemys."
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a enemy."
    },
    {
      name: "kill enemy",
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
      "button functions": [goTown, goTown, goTown],
      text: 'The enemy screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "You die. &#x2620;"
    },
    { 
      name: "win", 
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
      "button functions": [restart, restart, restart], 
      text: "You defeat the Boss! YOU WIN THE GAME! &#x1F389;" 
    },
    {
      name: "easter egg",
      "button text": ["2", "8", "Go to town square?"],
      "button functions": [pickTwo, pickEight, goTown],
      text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
]
// initialize buttons
button1.onclick = goMarket;
button2.onclick = goStreet;
button3.onclick = fightBoss;

function update(location) {
  enemyStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goMarket() {
  update(locations[1]);
}

function goStreet() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    hpText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightThug() {
  fighting = 0;
  goFight();
}

function fightBrute() {
  fighting = 1;
  goFight();
}

function fightBoss() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  enemyHealth = enemys[fighting].health;
  enemyStats.style.display = "block";
  enemyName.innerText = enemys[fighting].name;
  enemyhpText.innerText = enemyHealth;
}

function attack() {
  text.innerText = "The " + enemys[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getenemyAttackValue(enemys[fighting].level);
  if (isenemyHit()) {
    enemyHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  hpText.innerText = health;
  enemyhpText.innerText = enemyHealth;
  if (health <= 0) {
    lose();
  } else if (enemyHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatenemy();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getenemyAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isenemyHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + enemys[fighting].name;
}

function defeatenemy() {
  gold += Math.floor(enemys[fighting].level * 6.7);
  xp += enemys[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  hpText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    hpText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}