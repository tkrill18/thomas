// MAIN
// 2)
var party = [
    [
        "Pikachu",
        "Electric",
        142,
        90,
        117,
        false
    ],
    [
        "Venusaur",
        "Grass & Poison",
        187,
        148,
        147,
        false
    ],
    [
        "Charizard",
        "Fire & Flying",
        185,
        143,
        149,
        false
    ],
    [
        "Blastoise",
        "Water",
        186,
        167,
        148,
        false
    ],
    [
        "Snorlax",
        "Normal",
        267,
        128,
        178,
        false
    ],
    [
        "Mewtwo",
        "Psychic",
        213,
        156,
        178,
        true
    ]
];

// 3)
var basicPrint = function(party) {
    for (var i = 0; i < party.length; i++) {
        console.log(party[i]);
    }
}

// 4)
var cleanPrint = function(party) {
    for (var i = 0; i < party.length; i++) {
        pokemonPrint(party[i], i + 1);
    }
}
var pokemonPrint = function(pokemon, index) {
    var name   = pokemon[0];
    var type   = pokemon[1];
    var hp     = pokemon[2];
    var def    = pokemon[3];
    var atk    = pokemon[4];
    var legend = pokemon[5];
    console.log("#" + index + 
                ": " + name + 
                " > TYPE: " + type + 
                " > HP: " + hp + 
                " > ATK: " + atk +
                " > DEF: " + def +
                " > Legend: " + legend
                );
}

// BONUS
// 1)
var prompt = require('prompt-sync')();
var createNewPokemon = function(party) {
    /*
    party.push([
        prompt("Enter the NAME of the new Pokemon: "),
        prompt("Enter the TYPE of the new Pokemon: "),
        prompt("Enter the HP of the new Pokemon: "),
        prompt("Enter the ATTACK of the new Pokemon: "),
        prompt("Enter the DEFENSE of the new Pokemon: "),
        prompt("Enter the LEGENDARY STATUS of the new Pokemon: "),
    ]);
    */
    name = prompt("Enter the NAME of the new Pokemon: ");
    type = prompt("Enter the TYPE of the new Pokemon: ");
    hp = promptNumeric("Enter the HP of the new Pokemon: ");
    defense = promptNumeric();
    attack = promptNumeric();
    legend = promptBoolean("Enter the LEGENDARY STATUS of the new Pokemon: ")
    party.push([name, type, hp, defense, attack, legend]);
}
var promptNumeric = function(message) {
    var response = parseInt(prompt(message));
    while (isNaN(response)) {
        console.log(">   Try again. Please only enter a number.")
        response = parseInt(prompt(message));
    }
    return response;
}
var promptBoolean = function(message) {
    var response = prompt(message);
    while (1 === 1) {
        if (response == "true") {
            return true;
        }
        else if (response == "false") {
            return false;
        }
        else {
            console.log(">   Try again. Please only enter 'true' or 'false'.")
            response = prompt(message);
        }
    }
}
// 2)
var searchRoster = function(party) {
    var query = prompt("Enter the NAME of the pokemon you would like to see: ");
    var wasFound = false;
    for (var i = 0; i < party.length; i++) {
        if (party[i][0] == query) {
            wasFound = true;
            pokemonPrint(party[i], i + 1);
        }
    }
    if (!wasFound) {
        console.log("Unable to find '" + query + "' in the roster. Try again.");
    }
}
createNewPokemon(party);
basicPrint(party);
// cleanPrint(party);
// searchRoster(party);