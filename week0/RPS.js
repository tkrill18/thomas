//  MAIN
//  PSEUDOCODE
/*
    a.  Set playChoice.
    b.  Set compChoice to random choice.
    c.  Determine winnner and console.log() the result.
        i.  If choices are the same, then print "tie".
        ii. Else if playChoice == "rock" and ...
            a.  if compChoice == "paper", then print "paper beats rock, you lost!".
            b.  else if compChoice == "scissor", then print "rock beats scissor, you won!".
        iii.Else if playChoice == "paper" and ...
            a.  if compChoice == "rock", then print "paper beats rock, you won!".
            b.  else if compChoice == "scissor", then print "scissor beats paper, you lost!".
        iv. Else if playChoice == "scissor" and ...
            a.  if compChoice == "rock", then print "rock beats scissor, you lost!".
            b.  else if compChoice == "paper", then print "scissor beats paper, you won!".
*/

// Set this to whatever choice you'd like.
var playerChoice = 'r';

// Computer's random choice.
var choices = ['r', 'p', 's'];
var compChoice = choices[Math.floor(Math.random() * 3)];

// Tie situation.
if (playerChoice == compChoice) {
    console.log("It's a tie!");
}

// Player picks rock and computer picks paper.
if (playerChoice == 'r' && compChoice == 'p') {
    console.log("Rock loses to paper. You lose!");
}
// Player picks rock and computer picks scissor.
if (playerChoice == 'r' && compChoice == 's') {
    console.log("Rock beats scissor. You win!");
}

// Player picks paper and computer picks rock.
if (playerChoice == 'p' && compChoice == 'r') {
    console.log("Paper beats rock. You win!");
}
// Player picks paper and computer picks scissor.
if (playerChoice == 'p' && compChoice == 's') {
    console.log("Paper loses to scissor. You lose!");
}

// Player picks scissor and computer picks paper.
if (playerChoice == 's' && compChoice == 'p') {
    console.log("Scissor beats paper. You win!");
}
// Player picks scissor and computer picks paper.
if (playerChoice == 's' && compChoice == 'r') {
    console.log("Scissor loses to rock. You lose!");
}

