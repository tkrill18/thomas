var prompt = require('prompt-sync')();
//
// get input from the user.
//
//var n = prompt('How many more times? ');

var money = 1000;
var items = [];

while (money > 99) {
    console.log("You have $" + money + " left. Sword = $500, Food = $100");
    var answer = prompt("Which item do you want to buy? ");
    if (answer == "Sword") {
        money = money - 500;
        items.push("Sword");
        console.log("You bought a Sword!");
    }
    else if (answer == "Food") {
        money = money - 100;
        items.push("Food");
        console.log("You bought Food!");
    }
    else {
        console.log("I didn't understand your answer. Try again.")
    }
}



