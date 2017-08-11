// Initializes global score variables.
var wins = 0, ties = 0, losses = 0, winRatio = 0, lastResult = "";
var initials = "";
var fileToSave = "";

// Sets the database object.
var database = firebase.database().ref("games");

$(function(){
    updateHighScore();

    $("#initials").on("blur submit change", function() {
        validateInitials();
    });

    $(".btn-choice").on("click", function(e) {
        processChoice($(this).attr("id"));
        updateScoreboard();
        e.preventDefault();
    });

    $(".btn-modal").on("click", function() {
        fileToSave = $(this).attr("id");
        $("#modal-file-save").modal("hide");
    })

    $("#log-in").on("click", function() {
        initials = $("#initials").val();
        if (validateInitials()) {
            logIn();
        }
    })

    $("#save").on("click", function() {
        // Reads out the entered information.
        updateDatabase();
    })

    $("#log-out").on("click", function() {
        wins = 0;
        ties = 0;
        losses = 0;
        winRatio = 0;
        lastResult = "";
        updateScoreboard();
        logOut();
        $("#initials").focus();
    })
})

var validateInitials = () => {
    if ($("#initials").val().length < 2) {
        $("#initials").popover({
                html: true,
                title: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Incomplete",
                content: "Please enter at least two letters for your initials.",
                placement: "bottom"
            });
        $("#initials").popover("show");
        $("#initials").next(".popover").addClass("popover-danger");
        return false;
    } else {
        $("#initials").popover("hide");
        return true;
    }
}

var processChoice = playChoice => {

    // Outputs the player's choice.
    $("#playChoice").html(`You chose ${decodeChoice(playChoice)}.`)
    
    // Determines the computer's random choice.
    var choices = ['r', 'p', 's'];
    var compChoice = choices[Math.floor(Math.random() * 3)];
    // Outputs the computer's choice.
    $("#compChoice").html(`Computer chose ${decodeChoice(compChoice)}.`)

    // Determines the winner.
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

    // Decodes the result.
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
    $("#result").html(`<strong>${resultText}</strong>`);
}

// Decodes the letter of choice.
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

var updateDatabase = () => {
    var entry = undefined;
    // Attempts to read out entries that are equal to the entered initials.
    database.orderByChild("INITIALS").equalTo(initials).once("value").then(function(snapshot) {
        entry = snapshot.val();
        checkIfExists(entry, initials);
    });
}

var checkIfExists = (entry, initials) => {
    // console.log(entry);
    // Determines if the user exists, based on if an entry was returned in the previous block.
    if (entry == undefined) {
        // Creates a new entry, since the database has no information on the user.

        var value = {
            INITIALS: initials,
            WINS: wins,
            TIES: ties,
            LOSSES: losses,
            WINRATIO: winRatio
        }
        database.push(value);
        console.log("Determined to not exist, added new entry.")
        updateHighScore();
        confirmSave();
    }
    else {
        var gameKey = Object.keys(entry)[0];
        var gameObject = entry[gameKey];
        $("#display-current").html(`Current Game: ${wins} Wins, ${ties} Ties, ${losses} Losses`)
        $("#display-previous").html(`Previous Game: ${gameObject.WINS} Wins, ${gameObject.TIES} Ties, ${gameObject.LOSSES} Losses`)
        var prevWinRatio = gameObject.WINRATIO;
        console.log(`Current: ${winRatio}; Previous: ${prevWinRatio}`);
        var bestGame = (winRatio >= prevWinRatio) ? "current" : "previous";
        var bestRatio = (winRatio >= prevWinRatio) ? winRatio : prevWinRatio;
        $("#display-recommend").html(`We recommend your <strong>${bestGame} game</strong>; it has a winning percentage of <strong>${(bestRatio * 100).toFixed(1)}%</strong>.`)
        console.log("Determined to exist, comparing with extant.")
        $("#modal-file-save").modal("show");
        $("#modal-file-save").on("hidden.bs.modal", function () {
            if (fileToSave == "current") {
                var value = {
                    INITIALS: initials,
                    WINS: wins,
                    TIES: ties,
                    LOSSES: losses,
                    WINRATIO: winRatio
                }
                database.child(gameKey).update(value);
                updateHighScore();
                confirmSave();
            }
            else if (fileToSave == "previous") {
                // Update local variables with download from firebase
                wins = gameObject.WINS;
                ties = gameObject.TIES;
                losses = gameObject.LOSSES;
                winRatio = gameObject.WINRATIO;
                updateScoreboard();
                confirmSave();
            }
            else {
                // Takes no action.
                $("#save").next(".popover").popover("hide");
            }
        })
        fileToSave = "";
    }
}

var confirmSave = () => {
    $("#save").popover({
                html: true,
                content: "<i class='fa fa-check' aria-hidden='true'></i> Saved!",
                placement: "bottom"
            });
    $("#save").popover("show");
    $("#save").next(".popover").addClass("popover-success");
    setTimeout(function () {
        $("#save").next(".popover").fadeOut("slow");
    }, 2000);
}

var updateHighScore = () => {
    var example = database.orderByChild("WINRATIO").limitToLast(1);
    example.on("value", function(snapshot) {
        entry = snapshot.val();
        var gameKey = Object.keys(entry)[0];
        var gameObject = entry[gameKey];
        $("#high-score").html(`<i class="fa fa-line-chart" aria-hidden="true"></i>&nbsp;High&nbsp;Score: ${gameObject.INITIALS},&nbsp;${(gameObject.WINRATIO * 100).toFixed(1)}%`);
    });
}

// Updates the scoreboard with the global variables.
var updateScoreboard = () => {
    $("#wins").html(pad(wins, 2));
    $("#ties").html(pad(ties, 2));
    $("#losses").html(pad(losses, 2));

    var oldWinRatio = winRatio
    winRatio = wins / (wins + losses) || 0;
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
    if (initials) {
        $("#your-score").html(`${symbol}&nbsp;Your&nbsp;Score: ${initials},&nbsp;${(winRatio * 100).toFixed(1)}%`)
    }
    else {
        $("#your-score").html(`${symbol}&nbsp;Your&nbsp;Score: ${(winRatio * 100).toFixed(1)}%`)
    }
}

var logIn = () => {
    $("#initials").prop("disabled", true);
    $("#log-in").prop("disabled", true);
    $("#save").prop("disabled", false);
    $("#log-out").prop("disabled", false);
    $("#nameDisplay").html(`Welcome, <span class="name">${initials}</span>!`);
    updateScoreboard();
}

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
