//  BONUS 3)
var keepPlaying = true;
while (keepPlaying == true) {
    console.log("\n--- SUPER S(MASH) BROTHERS ---")
//  MAIN 2)     New array with 4 battle locations
    var mashArray = ["Final Destination", "Yoshi's Island", "Battlefield", "Pokemon Stadium"];
//  MAIN 3)     New array with at least 2 numbers 
    var firstQuestion = [1, 2, 3, 4];
//  MAIN 4)     New array with at least 2 SSB characters
    var secondQuestion = ["Pikachu", "Fox", "Samus", "Link"];

//  MAIN 5)     Adds answers to questiosn to the arrays. 
    var promptSync = require('prompt-sync')();

    function askQuestions() {
        firstQuestion.push(promptSync("How many times will you fight? "));
        secondQuestion.push(promptSync("Who will you choose to fight? "));
    }
    askQuestions();

//  MAIN 6)     Logs the answer to the console.

    // Returns a random element from the given array.
    var getRandElement = function(arrayName) {
        return arrayName[Math.floor(Math.random() * arrayName.length)];
    }

    function displayAnswerV1() {
        console.log("You fought " + getRandElement(secondQuestion) + 
                    " in the " + getRandElement(mashArray) + 
                    " and hit them " + getRandElement(firstQuestion) + 
                    " times. Too bad. Mewtwo wins!");
    }
    //displayAnswer();

//  BONUS 1 is redundant to MAIN 6.

//  BONUS 2)    Adds an additional prompt and modifies the answer that logs to the console.
    function askFinalQuestion() {
        var finalQuestion = ["Ganondorf", "Mewtwo", "Donkey Kong", "Bowser"];
        finalQuestion.push(promptSync("Who is your most fearsome opponent? "));
    }
    askFinalQuestion();
    function displayAnswerV2() {
        console.log("You fought " + getRandElement(secondQuestion) + 
                    " in the " + getRandElement(mashArray) + 
                    " and hit them " + getRandElement(firstQuestion) + 
                    " times. Too bad. " + getRandElement(finalQuestion) + 
                    " wins!");
    }
                
//  BONUS 3)    
    if (promptSync("Enter 'q' to quit. Otherwise, just press enter: ") == "q") {
        keepPlaying = false;
    }
}
