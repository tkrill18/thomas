// ARRAYS: MAIN
var myPokemonRoster = ["raichu", "ninetales", "alakazam", "kabutops", "dragonair"];

var firstToFight = myPokemonRoster[0];
var secondToFIght = myPokemonRoster[1];

// ARRAYS: BONUS
// 1)
myPokemonRoster.pop();
// 2)
myPokemonRoster.push("dragonite", "machamp");
// 3
var rosterSize =  myPokemonRoster.length;


// LOOPS: MAIN
myPokemonRoster = ["raichu", "ninetales", "alakazam", "kabutops", "dragonair"];

console.log("--MAIN--");
for (var i = 0; i < 5; i++) {
    console.log(myPokemonRoster[i]);
}

// LOOPS: BONUS
// 1)
console.log("\n--BONUS 1--");
for (var i = 4; i >= 0; i--) {
    console.log(myPokemonRoster[i]);
}

// 2)
console.log("\n--BONUS 2--");
for (var i = 0; i < myPokemonRoster.length; i++) {
    console.log(myPokemonRoster[i]);
}

// 3)

console.log("\n--BONUS 3--");
// Uncomment next line to activate else component of conditional.
// myPokemonRoster.pop();

if (myPokemonRoster.length >= 5) {
    for (var i = 0; i < myPokemonRoster.length; i++) {
        console.log(myPokemonRoster[i]);
    }
}
else {
    console.log("You Can't Play! Not Enough Pokemon");
}
