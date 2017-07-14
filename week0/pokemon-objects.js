//  MAIN 2)
var Pokemon = function(name, type, hp, atk, def, legend) {
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.legend = legend;
}

var myParty = [
    new Pokemon(
        "Pikachu",
        "Electric",
        35,
        55,
        40,
        false
    ),
    new Pokemon(
        "Venusaur",
        "Grass & Poison",
        80,
        82,
        83,
        false
    ),
    new Pokemon(
        "Charizard",
        "Fire & Flying",
        78,
        84,
        78,
        false
    ),
    new Pokemon(
        "Blastoise",
        "Water",
        79,
        83,
        100,
        false
    ),
    new Pokemon(
        "Snorlax",
        "Normal",
        160,
        110,
        65,
        false
    ),
    new Pokemon(
        "Mewtwo",
        "Psychic",
        106,
        110,
        90,
        true
    )
];

//  MAIN 3)
var printRoster = function(party) {
    for (var i = 0; i < party.length; i++) {
        console.log("");
        console.log("POKEMON " + (i + 1) + ":");
        console.log("Name: " + party[i].name);
        console.log("Type: " + party[i].type);
        console.log("HP: " + party[i].hp);
        console.log("Attack: " + party[i].atk);
        console.log("Defense: " + party[i].def);
        console.log("Legendary Status: " + party[i].legend);
    }
}

//  4)
var pokemonAttacked = function(party) {
    for (var i = 0; i < party.length; i++) {
        party[i].hp -= 10;
    }
    printRoster(party);
}

//  BONUS 1)
var randIndex = function(arrLength) {
    return Math.floor(Math.random() * arrLength);
}

var attackRandom = function(party) {
    party[randIndex(party.length)].hp -= 10;
}

//  BONUS 2)
var prompt = require('prompt-sync')();
var addNewPokemon = function(party) {
    console.log(" - ADDING A NEW POKEMON... - ");
    newName = prompt("Enter its name: ");
    newType = prompt("Enter its type: ");
    newHP = prompt("Enter its HP stat: ");
    newAtk = prompt("Enter its attack stat: ");
    newDef = prompt("Enter its defense stat: ");
    newLegend = prompt("Enter its legendary status: ");
}

//  BONUS 3)
var removeRandom = function(party) {
    return party.splice(randIndex(party.length), 1)[0];
}

//  BONUS 4)

// Transcribed from stackoverflow.
var shuffle = function(array) {
    var i, j, temp;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        temp = array[i - 1];
        array[i - 1] = array[j];
        array[j] = temp;
    }
}

var pokemonBattle = function(playerParty, opponentParty, opponentName) {

    // Copies parties by value.
    var newPlay = playerParty.slice();
    var newOppo = opponentParty.slice();

    // Shuffles the parties.
    shuffle(newPlay);
    shuffle(newOppo);

    // Splices off the first two pokemon, which are random b/c shuffle.
    var playSelect = newPlay.splice(0, 2);
    var oppoSelect = newOppo.splice(0, 2);

    // Displays opening battle text.
    console.log("You are challenged by " + opponentName + ".");
    console.log(opponentName + " sent out " + oppoSelect[0].name + " and " + oppoSelect[1].name + ".");
    console.log(playSelect[0].name + " and " + playSelect[1].name + ", I choose you!");

//  BONUS 5)
    

}



var oppoParty = [
    new Pokemon(
        "Manectric",
        "Electric",
        70,
        75,
        60,
        false
    ),
    new Pokemon(
        "Sceptile",
        "Grass",
        70,
        85,
        65,
        false
    ),
    new Pokemon(
        "Blaziken",
        "Fire & Fighting",
        80,
        120,
        70,
        false
    ),
    new Pokemon(
        "Swampert",
        "Water & Ground",
        100,
        110,
        90,
        false
    ),
    new Pokemon(
        "Slaking",
        "Normal",
        150,
        160,
        100,
        false
    ),
    new Pokemon(
        "Deoxys",
        "Psychic",
        50,
        150,
        50,
        true
    )
];

pokemonBattle(myParty, oppoParty, "Gary");
// printRoster(myParty);
