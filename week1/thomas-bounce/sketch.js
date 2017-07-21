
// MAIN 4)      Defines x and y positions as variables...
var x, y, radius, xVelocity, yVelocity;
function setup() {
// MAIN 2)      Setups a canvas and draws a circle.
    createCanvas(600, 600);
    x = width / 2;
    y = height / 2;
    radius = width / 9;
    xVelocity = 1;
    yVelocity = 1;
}

// MAIN 3)      Ellipses are drawn from thier CENTERs by default.
function draw() {
    background(225);
    ellipse(x, y, radius * 2);
    if (x <= radius || x >= width - radius) {
        xVelocity *= -1;
// BONUS 2)     Makes the ball speed up every time it hits an edge.
        if (xVelocity > 0) {
            xVelocity++;
        }
        else {
            xVelocity--;
        }
    }
    else if (y <= radius || y >= height - radius) {
        yVelocity *= -1;
        if (yVelocity > 0) {
            yVelocity++;
        }
        else {
            yVelocity--;
        }
    }
// MAIN 4)      ... and incrementally increases them.
    x += xVelocity;
    y += yVelocity;
}

// BONUS 1)     Changes the color of the ball if the user is able to click it.
function mousePressed() {
    distanceFromCenter = dist(mouseX, mouseY, x, y);
    if (distanceFromCenter <= radius) {
        fill(random(256), random(256), random(256));
    }
}
