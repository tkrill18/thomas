//  MAIN
var minWordLength = 1, maxWordLength = 8;
var minSentLength = 2, maxSentLength = 10;

//  2)
function randLetter() {
    var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    letter = letters[Math.floor(Math.random() * letters.length)];
    //  BONUS 1)
    console.log("randLetter generated '" + letter + "'.");
    return letter;
}

//  3)
function randWord() {
    var length = Math.floor(Math.random() * (maxWordLength - minWordLength + 1)) + minWordLength;
    var word = "";
    for (var i = 0; i < length; i++) {
        word += randLetter();
    }
    //  BONUS 1)
    console.log("randWord generated '" + word + "'.");
    return word;
}

//  4)
function randSentence() {
    var length = Math.floor(Math.random() * (maxSentLength - minSentLength + 1)) + minSentLength;
    var sentenceArray = [];
    for (var i = 0; i < length; i++) {
        sentenceArray.push(randWord());
    }
    firstWord = sentenceArray[0];
    firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    sentenceArray[0] = firstWord;
    sentence = sentenceArray.join(' ') + '.';
    //  BONUS 1)
    console.log("randSentence generated '" + sentence + "'.");
    return sentence;
}

//  5)
//      A)
// format = ["name", pokedex_num, HP, attack]
bulbasaur = ["Bulbasaur", 1, 45, 49];
charmander = ["Charmander", 4, 39, 52];

//      B)
function pokeAttack(pkmn1, pkmn2) {
    pkmn2[2] -= pkmn1[3];
    //  BONUS 2)
    console.log(pkmn1[0] +  " attacked " + pkmn2[0] + "!\n" + pkmn2[0] + " lost " + pkmn1[3] + " HP, and has " + pkmn2[2] + " HP left.");
}

//  BONUS 3)
function pokeSelect() {
    pokemonArray = [["Bulbasaur", 1, 45, 49], ["Charmander", 4, 39, 52], ["Squirtle", 7, 44, 48], ["Pikachu", 25, 35, 55]];
    pkmn1 = pokemonArray.splice(Math.floor(Math.random() * pokemonArray.length), 1)[0];
    pkmn2 = pokemonArray[Math.floor(Math.random() * pokemonArray.length)];
    pokeAttack(pkmn1, pkmn2);
}

pokeSelect();