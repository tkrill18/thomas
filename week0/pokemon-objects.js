//  MAIN 2)     Creates a new array with 6 objects inside of it.
// Creates the Pokemon object.
var Pokemon = function(name, type, hp, atk, def, legend) {
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.legend = legend;
}

// Creates an array with 6 instances of the Pokemon object.
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

//  MAIN 3)     Loops through the primary array and logs each object's stats.
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

//  MAIN 4)
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

var pokemonBattleV1 = function(playerParty, opponentParty, opponentName) {
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

//pokemonBattleV1(myParty, oppoParty, "Gary");

//  BONUS 5)

var pokemonBattleV2 = function(playerParty, opponentParty, opponentName) {
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
    console.log("    BATTLE");
    // Determines the winning team.
    var playTotal = totalPartyStats(playSelect);
    var oppoTotal = totalPartyStats(oppoSelect);

    // Displays the corresponding message.
    if (playTotal == oppoTotal) {
        console.log("It's a tie.")
    }
    else if (playTotal > oppoTotal) {
        console.log(opponentName + " was defeated.");
        console.log("Your best Pokemon was " + getBestPkmn(playSelect) + ".");
    }
    else {
        console.log(opponentName + " defeated you.")
        console.log(getBestPkmn(oppoSelect) + " was " + opponentName + "'s best Pokemon.");
    }
}

// Returns the sum of a given pokemon's hp, attack, and defense stats.
var totalPkmnStats = function(pokemon) {
    return pokemon.hp + pokemon.atk + pokemon.def;
}

// Returns the sum of a given party's pokemons' stats.
var totalPartyStats = function(party) {
    var total = 0;
    for (var i = 0; i < party.length; i++) {
        total += totalPkmnStats(party[i]);
    }
    return total;
}

var getBestPkmn = function(party) {
    if (totalPkmnStats(party[0]) > totalPkmnStats(party[1])) {
        return party[0].name;
    }
    else {
        return party[1].name;
    }
}

pokemonBattleV2(myParty, oppoParty, "Gary");