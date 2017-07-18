// BONUS 1)     Loads the strings via an external TXT file.
// !! Have to use local hosting to get this to work.
var lyrics;

// The preload function loads data before anything else executes.
function preload() {
    lyrics = loadStrings("lyrics.txt");
}

// MAIN 2)      Sets up the canvas.
function setup() {
    createCanvas(850, 600);
    console.log(lyrics); 
    lyrics.push("No more lyrics left.");
}
// MAIN 4)      Gets at least 5 strings together.
/*
var lyrics = [
    "Dry! ...Me a desert him",
    "Nuh time to have you lurking",
    "Him ah go act like he nuh like it",
    "You know I dealt with you the nicest",
    "Nuh body touch me you nuh righteous"
];
lyrics.push("No more lyrics left.");
*/

var lineIndex = 0;
var userString = "";
var score = 0;
var totalWords = 0;
var wordsPerMinute = 0;
var message = "";

// MAIN 3)      Draws a few strings of text to the canvas telling the user what to type below.
function draw() {
    background(225);
    // Title / Instructions
    textSize(32);           // Sets the text size to 28 pixels.
    textFont("Segoe UI");   // Sets the text font to Segoe UI, the Windows system font.
    textAlign(CENTER);      // Aligns the text to the horizontal center.
    textStyle(BOLD);        // Sets the text style to bold.
    text("Please type the sentence below: ", width / 2, 50);
    // Scoreboard
    wordsPerMinute = (totalWords / (millis() / 6000)).toFixed(2);
    text("Your score: " + score, width / 2, 500);
     // Message area
    textStyle(NORMAL);      // Sets the text style back to normal.
    text(message, width / 2, 400);
    // Sentence to type
    textFont("Consolas");
    textAlign(LEFT);
    textSize(28);           // Sets the text size down to 24 pixels.
    text(lyrics[lineIndex], 10, 150);
    // Player's sentence
    text(userString, 10, 250);
}

function keyTyped() {
// MAIN 5)      Compares what the user types to the requested string.
    // Saves the user's typing to a string.
    userString += key;
    message = "";
    // Checks if the user completed the string.
    if (userString.length == lyrics[lineIndex].length) {
// MAIN 6)      Determines if the displayed string matches the typed string, and awards 10 points if so.
        // Checks if the strings match, i.e. the user was correct.
        if (userString == lyrics[lineIndex]) {
            message = "You got it right! +10";
            score += 10;
// BONUS 2)     Keeps track of the user input speed.
            // Adds the number of words in the string to the total number of words typed.
            totalWords += lyrics[lineIndex].split(" ").length;
        }
        else {
            message = "You need to work on your typing...";
        }

        // Increments the timer and resets the user's typing string.
        lineIndex++;
        userString = "";
    }


    // Checks if there are no more lines left.
    if (lineIndex >= lyrics.length - 1) {
        userString = "";
        message = "Game Complete. Words Per Minute: " + wordsPerMinute;
    }
}

// My iteration: allows the user to backspace.
function keyPressed() {
    if (keyCode == BACKSPACE) {
        userString = userString.slice(0, -1);
    }
}