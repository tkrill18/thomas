var x, y, radius, xVelocity, yVelocity, paddleY, adj, lostGame, keyShift;
function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    x = width / 2;
    y = height / 2;
    radius = width / 30;
    xVelocity = 5;
    yVelocity = 2;
    adj = 5;
    lostGame = false;
    keyShift = height / 10;
    paddleY = height / 2;
}

// MAIN 2)      Refactors the conditional so the ball can escape one side.
function draw() {
    background(25);
// MAIN 3)      Draws a rectangle for the paddle.
    // Paddle / Rectangle
    rect(width / 15, paddleY, width / 30, height / 6);
    // Ball
    ellipse(x, y, radius * 2);
    // If ball hits the right side:
    if (x >= width - radius) {
        xVelocity *= -1;

    }
    // If ball hits the top or bottom:
    if (y <= radius || y >= height - radius) {
        yVelocity *= -1;
    }
// MAIN 4)      Makes the ball bounce back when it hits the rectangle paddle.
    // If ball hits the paddle:
    if (x <= (width / 10) + radius - adj) {
        if (y >= paddleY - (height / 12) - radius && y <= paddleY + (height / 12) + radius && !lostGame) {
            xVelocity *= -1;
            xVelocity = incrementVelocity(xVelocity);
        }
// MAIN 5)      Ends the game if the ball leaves the canvas.
        else {
            lostGame = true;
            if (x < radius + adj) {
                textAlign(CENTER);
                textFont("Segoe UI");
                textSize(64);
                fill("white");
                text("GAME OVER", width / 2, height / 2);
                textSize(24);
                text("Refresh the page (CTRL + R) to play again.", width / 2, 3 * height / 4)
                noLoop();
            }
        }
    }
    x += xVelocity;
    y += yVelocity;
}

// BONUS 1)     Lets the user control the game via mouse AND keyboard.
function mouseMoved() {
    paddleY = mouseY;
    keepPaddleInBounds();
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        paddleY -= keyShift;
    }
    else if (keyCode == DOWN_ARROW) {
        paddleY += keyShift;
    }
    keepPaddleInBounds();
}

var keepPaddleInBounds = function() {
    // If paddle hits the top.
    if (paddleY < (height / 12)) {
        paddleY = height / 12;
    }
    // If paddle hits the bottom.
    else if (paddleY > (height * 11) / 12) {
        paddleY = (height * 11) / 12;
    }
}

// BONUS 2)     Gives the ball more speed every time it hits the paddle.
var incrementVelocity = function(velocity) {
    if (velocity > 0) {
        return velocity + 1;
    }
    else if (velocity < 0) {
        return velocity - 1;
    }
}
