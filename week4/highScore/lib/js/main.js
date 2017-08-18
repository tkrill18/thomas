// Initializes global scoring variables.
var wins = 0, ties = 0, losses = 0, winRatio = 0, lastResult = "";
var initials = "";
var fileToSave = "";

// Sets the database object.
var database = firebase.database().ref("games");

// Enables the following event listeners once the document is ready (jQuery).
$(function(){
    // These will execute when...
    updateHighScore();

    // ...the `initials` form loses focus (blur), has its text submitted (submit), or has its text changed (change).
    $("#initials").on("blur submit change", function() {
        validateInitials();
    });

    // ...any of the rock, paper, scissor buttons are clicked.
    $(".btn-choice").on("click", function(e) {
        // Sends the `id` of the clicked button to the `processChoice` function. Will be either 'r', 'p', or 's'.
        processChoice($(this).attr("id"));
        updateScoreboard();
        // Prevents the click from returning the viewport to the top of the screen, since the "buttons" are modified links (`a` stands for "anchor"). 
        e.preventDefault();
    });

    // ...any of the buttons in the modal are clicked.
    $(".btn-modal").on("click", function() {
        // Sets the `fileToSave` variable to the `id` of the clicked button. Will be either 'cancel', 'current' or 'previous'.
        fileToSave = $(this).attr("id");
        // Hides the modal, now that the button was pressed.
        $("#modal-file-save").modal("hide");
    })

    // ...the `log in` button is clicked.
    $("#log-in").on("click", function() {
        // Sets the `initials` variable to the contents of the initials form.
        initials = $("#initials").val();
        // !! This is equivalent to `if(validateInitials() == true)`.
        if (validateInitials()) {
            logIn();
        }
    })

    // ...the `save` button is clicked.
    $("#save").on("click", function() {
        updateDatabase();
    })

    // ...the `log out` button is clicked.
    $("#log-out").on("click", function() {
        // Resets the global scoring variables.
        wins = 0;
        ties = 0;
        losses = 0;
        winRatio = 0;
        lastResult = "";
        updateScoreboard();
        logOut();
        // Sets the focus back to the initials form.
        $("#initials").focus();
    })
})

// Displays a popover on the input form if the user enters invalid input.
var validateInitials = () => {
    // Gets the length of the initials currently entered in the form.
    if ($("#initials").val().length < 2) {
        // Generates a popover.
        $("#initials").popover({
                html: true,
                // !! <i class='fa fa-___'> is used to insert icons from FontAwesome.
                title: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Incomplete",
                content: "Please enter at least two letters for your initials.",
                placement: "bottom"
            });
        $("#initials").popover("show");
        // Gives this popover the `popover-danger` class so it will be red.
        $("#initials").next(".popover").addClass("popover-danger");
        return false;
    } else {
        // Hides the popover if the input was valid.
        $("#initials").popover("hide");
        return true;
    }
}

// Generates the computer's choice, determines the winner, displays the results, and updates the local win-tie-loss totals.
var processChoice = playChoice => {

    // Displays the player's choice.
    $("#playChoice").html(`You chose ${decodeChoice(playChoice)}.`)
    
    // Determines the computer's random choice.
    var choices = ['r', 'p', 's'];
    var compChoice = choices[Math.floor(Math.random() * 3)];
    // Displays the computer's choice.
    $("#compChoice").html(`Computer chose ${decodeChoice(compChoice)}.`)

    // Determines the winner with logic.
    var result = "";
    if (playChoice == compChoice) {
        result = "t";
    }
    else if (playChoice == "r") {
        if (compChoice == "p") {
            result = "l";
        }
        else if (compChoice == "s") {
            result = "w";
        }
    }
    else if (playChoice == "p") {
        if (compChoice == "r") {
            result = "w";
        }
        else if (compChoice == "s") {
            result = "l";
        }
    }
    else if (playChoice == "s") {
        if (compChoice == "r") {
            result = "l";
        }
        else if (compChoice == "p") {
            result = "w";
        }
    }

    // Sets the result to be displayed, and updates the totals.
    var resultText = "";
    switch(result) {
        case "w":
            resultText = "You won!"
            wins++;
            break;
        case "t":
            resultText = "It&rsquo;s a tie."
            ties++;
            break;
        case "l":
            resultText = "You lost..."
            losses++;
            break;
    }
    lastResult = result;
    // Displays the result.
    // !! `<strong>` makes text bold.
    $("#result").html(`<strong>${resultText}</strong>`);
}

// Converts "r, p, or s" to "rock, paper, or scissors", respectively.
var decodeChoice = letter => {
    switch(letter) {
        case "r":
            return "rock";
            break;
        case "p":
            return "paper";
            break;
        case "s":
            return "scissors";
            break;
        default:
            return "undefined";
            break;
    }
}

// Updates the Google Firebase database with the user's game stats.
var updateDatabase = () => {
    var entry = undefined;
    // Attempts to read out an entry that is equal to the entered initials.
    database.orderByChild("INITIALS").equalTo(initials).once("value").then(function(snapshot) {
        // Gets the entry from the returned snapshot.
        entry = snapshot.val();
        checkIfExists(entry, initials);
    });
}

// Determines if a given entry already exists in the database corresponding to the user's initials.
var checkIfExists = (entry, initials) => {
    // Determines if the user exists, based on if an entry was recieved in the `updateDatabase()` function.
    // The entry will have remained undefined if nothing was found.
    if (entry == undefined) {
        // Creates a new JSON to be submitted to the database, since the database has no information on the user.
        var value = {
            INITIALS: initials,
            WINS: wins,
            TIES: ties,
            LOSSES: losses,
            WINRATIO: winRatio
        }
        // Pushes the just-created JSON to the database.
        database.push(value);
        updateHighScore();
        confirmSave();
    }
    else {
        // Since the returned entry was not undefined, a user does exist.
        // The user must make a choice to continue with their current game, or load in their previous game.
        // !! `Object.keys` gets the keys of a given object (here, `entry`) and returns them in an array. We just want the first key.
        var gameKey = Object.keys(entry)[0];
        var gameObject = entry[gameKey];
        // Updates the information displayed to the user in the modal.
        $("#display-current").html(`Current Game: ${wins} Wins, ${ties} Ties, ${losses} Losses`)
        $("#display-previous").html(`Previous Game: ${gameObject.WINS} Wins, ${gameObject.TIES} Ties, ${gameObject.LOSSES} Losses`)
        // Gets the win ratio of the previous game out of the object.
        var prevWinRatio = gameObject.WINRATIO;
        // !! This is a "ternary operator". If the given condition inside the '( )' is true, the expression after the '?' is returned. If the condition is false, the expression after the ':' is returned.
        // So, if the current win ratio is greater than the previous win ratio, the word "current" will be returned, else, "previous" will be returned.
        var bestGame = (winRatio >= prevWinRatio) ? "current" : "previous";
        var bestRatio = (winRatio >= prevWinRatio) ? winRatio : prevWinRatio;
        // Updates the recommendation in the modal.
        $("#display-recommend").html(`We recommend your <strong>${bestGame} game</strong>; it has a winning percentage of <strong>${(bestRatio * 100).toFixed(1)}%</strong>.`)
        // Shows the modal.
        $("#modal-file-save").modal("show");
        // This following event "listens" for the modal we just showed to be hidden, i.e. the user clicked a button such that it was dismissed.
        $("#modal-file-save").on("hidden.bs.modal", function () {
            // Once the modal is dismissed, determine which button was pressed.
            // When the buttons in the modal are clicked, they set the `fileToSave` variable to either "current", "previous", or "cancel".
            if (fileToSave == "current") {
                // Creates a new JSON to be submitted to the database, that will be used to update the user's file.
                var value = {
                    INITIALS: initials,
                    WINS: wins,
                    TIES: ties,
                    LOSSES: losses,
                    WINRATIO: winRatio
                }
                // Updates the database with the just-created JSON.
                database.child(gameKey).update(value);
                updateHighScore();
                confirmSave();
            }
            else if (fileToSave == "previous") {
                // Updates local variables with the data from the existing Firebase data.
                wins = gameObject.WINS;
                ties = gameObject.TIES;
                losses = gameObject.LOSSES;
                winRatio = gameObject.WINRATIO;
                updateScoreboard();
                confirmSave();
            }
            else {
                // Takes no action, since the user clicked "cancel", the "x", or clicked away. 
                // Hides any residual popovers.
                $("#save").next(".popover").popover("hide");
            }
        })
        // Resets the `fileToSave` variable, so that the next time the modal comes up, a click away won't trigger "current" or "previous"
        fileToSave = "";
    }
}

// Displays a popover beneath the save button to confirm that the file was saved.
var confirmSave = () => {
    // Generates a popover.
    $("#save").popover({
                html: true,
                content: "<i class='fa fa-check' aria-hidden='true'></i> Saved!",
                placement: "bottom"
    });
    // Shows the popover.
    $("#save").popover("show");
    // Adds the popover-success class to this popover. 
    // !! The `.next` jQuery selector gets the children of the given element.
    $("#save").next(".popover").addClass("popover-success");
    // Makes the popover fade away after 2000 milliseconds.
    setTimeout(function () {
        $("#save").next(".popover").fadeOut("slow");
    }, 2000);
}

// Gets the current high score from the Google Firebase database and updates the display.
var updateHighScore = () => {
    // Gets the highest score from the database. `orderByChild` sorts ascending, so we need the last element for the highest value.
    var selection = database.orderByChild("WINRATIO").limitToLast(1);
    selection.on("value", function(snapshot) {
        var entry = snapshot.val();
        // Same as above.
        var gameKey = Object.keys(entry)[0];
        var gameObject = entry[gameKey];
        // Sets the high-score element's text equal to the leader and their score.
        $("#high-score").html(`<i class="fa fa-line-chart" aria-hidden="true"></i>&nbsp;High&nbsp;Score: ${gameObject.INITIALS},&nbsp;${(gameObject.WINRATIO * 100).toFixed(1)}%`);
    });
}

// Updates the scoreboard with the global variables.
var updateScoreboard = () => {
    // Updates the scoreboard displays.
    $("#wins").html(pad(wins, 2));
    $("#ties").html(pad(ties, 2));
    $("#losses").html(pad(losses, 2));

    // Shows the correct direction arrow if thier overall score went up, down, or stayed the same.
    var oldWinRatio = winRatio;
    // !! Here, the pipes '||' let us specify a fallback value of '0' in the case that there is a division by zero.
    winRatio = wins / (wins + losses) || 0;
    // Determines which symbol to add.
    var symbol = "";
    if (lastResult == "w") {
        symbol = '<i class="fa fa-arrow-up" aria-hidden="true"></i>'
    }
    else if (lastResult == "l") {
        symbol = '<i class="fa fa-arrow-down" aria-hidden="true"></i>'
    }
    else {
        symbol = '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
    }
    // Updates the display based on whether or not there are inintials entered yet.
    if (initials) {
        $("#your-score").html(`${symbol}&nbsp;Your&nbsp;Score: ${initials},&nbsp;${(winRatio * 100).toFixed(1)}%`)
    }
    else {
        $("#your-score").html(`${symbol}&nbsp;Your&nbsp;Score: ${(winRatio * 100).toFixed(1)}%`)
    }
}

// Configures the appropriate settings for a logged in user.
var logIn = () => {
    $("#initials").prop("disabled", true);
    $("#log-in").prop("disabled", true);
    $("#save").prop("disabled", false);
    $("#log-out").prop("disabled", false);
    $("#nameDisplay").html(`Welcome, <span class="name">${initials}</span>!`);
    updateScoreboard();
}

// Configures the appropriate settings for a logged out user.
var logOut = () => {
    $("#initials").prop("disabled", false);
    $("#log-in").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#log-out").prop("disabled", true);
    $("#nameDisplay").html("&nbsp;");
    $("#initials").val("");
    $("#playChoice, #compChoice, #result").html("&nbsp;");
    $("#your-score").html("&nbsp;");
}

// From StackOverflow `https://stackoverflow.com/a/10073788`
// Pads a given number `n`, with `width` zeros, or, if specified, `z`s.
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
