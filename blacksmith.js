let gold = 10;
let ore = 2;
let wood = 4;
let fireLit = false;
let inventory = { sword: 4, axe: 4 };

function help() {
  return `INSTRUCTIONS:
  Blacksmith is a simple text-based game.
  
  As a blacksmith, you convert ore and wood into swords and axes. You buy your resources using gold and sell your weapons for gold.
  
  COMMANDS:
  - buy(item)
  - make(item)
  - sell(item)
  - fire()
  - inventory()
  - help()`;
}

function buy(item) {
  const prices = { ore: 3, wood: 1 };
  const amounts = { ore: 1, wood: 1 };

  if (prices.hasOwnProperty(item)) {
    const price = prices[item];
    const amount = amounts[item];

    if (gold >= price) {
      gold -= price;
      if (item === 'ore') ore += amount;
      else if (item === 'wood') wood += amount;
      return `You bought ${amount} ${item} for ${price} gold. You now have ${gold} gold, ${ore} ore, and ${wood} wood.`;
    } else {
      return `You don't have enough gold to buy ${item}.`;
    }
  } else {
    return "Invalid item.";
  }
}

function make(item) {
  const recipes = { sword: { ore: 2, wood: 1 }, axe: { ore: 1, wood: 2 } };

  if (recipes.hasOwnProperty(item)) {
    const recipe = recipes[item];
    const requiredOre = recipe.ore;
    const requiredWood = recipe.wood;

    if (ore >= requiredOre && wood >= requiredWood && fireLit) {
      ore -= requiredOre;
      wood -= requiredWood;
      inventory[item]++;
      return `You made a ${item}. You now have ${inventory[item]} ${item}s.`;
    } else {
      return `You don't have enough resources or the fire is not lit to make a ${item}.`;
    }
  } else {
    return "Invalid item.";
  }
}

function sell(item) {
  const prices = { sword: 5, axe: 4 };

  if (prices.hasOwnProperty(item)) {
    const price = prices[item];

    if (inventory[item] > 0 && !fireLit) {
      inventory[item]--;
      gold += price;
      return `You sold a ${item} for ${price} gold. You now have ${gold} gold.`;
    } else {
      return `You don't have any ${item}s to sell or the fire is lit.`;
    }
  } else {
    return "Invalid item.";
  }
}

function fire() {
  if (fireLit) {
    fireLit = false;
    wood--;
    return "You extinguished the fire.";
  } else {
    if (wood >= 1) {
      fireLit = true;
      return "You lit the fire.";
    } else {
      return "You don't have enough wood to light the fire.";
    }
  }
}

function displayInventory() {
  return `Inventory:
  Swords: ${inventory.sword}
  Axes: ${inventory.axe}`;
}

function executeCommand() {
  const commandInput = document.getElementById("commandInput");
  const outputElement = document.getElementById("output");

  const command = commandInput.value.toLowerCase();

  let output;
  switch (command) {
    case "buy ore":
    case "buy wood":
      output = buy(command.split(' ')[1]);
      break;
    case "make sword":
    case "make axe":
      output = make(command.split(' ')[1]);
      break;
    case "sell sword":
    case "sell axe":
      output = sell(command.split(' ')[1]);
      break;
    case "fire":
      output = fire();
      break;
    case "inventory":
      output = displayInventory();
      break;
    case "help":
      output = help();
      break;
    default:
      output = "Invalid command. Type 'help' for instructions.";
  }

  outputElement.textContent = output;
  commandInput.value = "";
}
