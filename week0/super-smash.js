// MAIN
var keepPlaying = true;
while (keepPlaying == true) {
    console.log("\n--- SUPER S(MASH) BROTHERS ---")
    // 2)
    var mashArray = ["Final Destination", "Yoshi's Island", "Battlefield", "Pokemon Stadium"];
    // 3)
    var firstQuestion = [1, 2, 3, 4];
    // 4)
    var secondQuestion = ["Pikachu", "Fox", "Samus", "Link"];

    // 5)
    var promptSync = require('prompt-sync')();
    firstQuestion.push(promptSync("How many times will you fight? "));
    secondQuestion.push(promptSync("Who will you choose to fight? "));

    // 6)
    var getRandIndex = function(arrayName) {
        return arrayName[Math.floor(Math.random() * arrayName.length)];
    }

    // console.log("You fought " + getRandIndex(secondQuestion) + 
    //             " in the " + getRandIndex(mashArray) + 
    //             " and hit them " + getRandIndex(firstQuestion) + 
    //             " times. Too bad. Mewtwo wins!");

    // BONUS
    // 2)
    var finalQuestion = ["Ganondorf", "Mewtwo", "Donkey Kong", "Bowser"];
    finalQuestion.push(promptSync("Who is your most fearsome opponent? "));

    console.log("You fought " + getRandIndex(secondQuestion) + 
                " in the " + getRandIndex(mashArray) + 
                " and hit them " + getRandIndex(firstQuestion) + 
                " times. Too bad. " + getRandIndex(finalQuestion) + 
                " wins!");
                
    // 3)
    if (promptSync("Enter 'q' to quit. Otherwise, just press enter: ") == "q") {
        keepPlaying = false;
    }
}
