var gridUnit, numSquares, shipRow, shipCol;
var rowOfZero = [], grid = [];
var score, message;

function setup() {
    createCanvas(600, 600);
// BONUS 1)     Lets the user reset the board.
    resetSketch();
    createP("");    // Adds a line break after the canvas for layout purposes.
    var button = createButton("Reset"); // Initializes a button; it will say "Reset".
    button.mousePressed(resetSketch);   // When the button is pressed, `resetSketch` will be called.
}

function resetSketch() {
    numSquares = 5;
    gridUnit = width / numSquares;
// BONUS 2      Tracks the user's score. (Starts off with total, subtracts off for each miss.)
    score = (numSquares * numSquares / 2) * 100;

    // Clears arrays as part of reset.
    rowOfZero.length = 0;
    grid.length = 0;

    // Clears the score display message.
    message = "";

// MAIN 2-B)    Creates a nested array of values.

    // Problem: when pushing an existing array, it is copied byref, not by val...
    // ... so the existing array is edited every time.
    // Solution: use .slice() method to create "shallow copy" i.e. by val

    // Creates a 1-D array of zeros with `numSquares` elements.
    rowOfZero = new Array(numSquares).fill(0);

    // Pushes a copy of the 1-D array `numSquares` times to the `grid` array.
    for (var i = 0; i < numSquares; i++) {
        grid.push(rowOfZero.slice());
    }
    // Generates random coordinates to compare with.
    shipRow = floor(random(numSquares));
    shipCol = floor(random(numSquares));
}

function draw() {
// MAIN 2-A)    Sets up the canvas with basic grid.
    // Resets the stroke back to defaults for the grid.
    stroke("black");
    strokeWeight(1);
    for (var r = 0; r < numSquares; r++) {
        for (var c = 0; c < numSquares; c++) {
// MAIN 2-C)    Changes the color based on hit or miss.
            // 0 = not clicked yet, 1 = miss, 2 = hit
            if (grid[r][c] == 0) {
                fill("grey");
            }
            else if (grid[r][c] == 1) {
                fill("blue");
            }
            else if (grid[r][c] == 2){
                fill("red");
            }
            rect(r * gridUnit, c * gridUnit, gridUnit, gridUnit);
        }   
    }
    // Formatting
    textSize(72);
    textFont("Segoe UI");
    fill("black");
    textAlign(CENTER);
    textStyle(BOLD);
    stroke("white");
    strokeWeight(5);
    // The message
    text(message, width / 2, height / 2);
}

function mouseClicked() {
    var row = floor(mouseX / gridUnit);
    var col = floor(mouseY / gridUnit);
    console.log("User chose:     " + row + ", " + col);
    console.log("Correct choice: " + shipRow + ", " + shipCol);
    if (row == shipRow && col == shipCol) {
        console.log("HIT");
        grid[row][col] = 2;
        message = "Score: " + score;
    }
    else {
        console.log("MISS");
        grid[row][col] = 1;
        score -= 50;
    }
}

