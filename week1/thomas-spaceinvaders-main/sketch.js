// This solution is just the main section of the prompt, no bonuses.

var alienGridUnit, charSideLength, projectileSpeed;
var aliens, projectiles;
var keyShift, spaceshipX, spaceshipY;
var projectileReload, projectileReloadMax;

var Character = function (xPos, yPos, hasCollided) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.hasCollided = hasCollided;
}

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    // Dimensional Layouts
    alienGridUnit = width / 12;
    charSideLength = width / 24;
    projectileSpeed = height / 50;
    // Character Setup
    // Creates a 2-D array for the aliens.
    aliens = new Array(5);
    for (var i = 0; i < 5; i++) {
        aliens[i] = new Array(11);
    }
    // Fills out each element in the 2-D array.
    for (var r = 0; r < 5; r++) {
        for (var c = 0; c < 11; c++) {
            aliens[r][c] = new Character((c + 1) * alienGridUnit, (height / 4) + (r * alienGridUnit), false);
        }
    }
    projectiles = [];
    // Initial Positions
    keyShift = width / 180; 
    spaceshipX = width / 2;
    spaceshipY = height - (height / 6);
    projectileReload = frameRate();
}

function draw() {
// MAIN 2)      Sets up the canvas with the basic elements of the game.
    background("black");
    // Checks for key presses.
    checkKeyIsDowns();
    // Updates the reloading status of the projectiles.
    projectileReload += 1;
    // Draws Alien Characters.
    fill("white");
    for (var r = 0; r < 5; r++) {
        for(var c = 0; c < 11; c++) {
            if (aliens[r][c].hasCollided == false) {
                rect(aliens[r][c].xPos, aliens[r][c].yPos, charSideLength, charSideLength);
            }
        }
    }
    // Drawss Your Spaceship Character.
    fill("lime");
    rect(spaceshipX, spaceshipY, charSideLength, charSideLength);
    // Draws The Projectiles.
    for (var i = 0; i < projectiles.length; i++) {
        // Draws only the projectiles that have yet to collide.
        if (projectiles[i].hasCollided == false) {
            rect(projectiles[i].xPos, projectiles[i].yPos, charSideLength / 4, charSideLength);
            // Moves the projectiles up the screen.
            projectiles[i].yPos -= projectileSpeed;
        }
    }
    // Checks for collisions.
    checkCollisions();
}

// MAIN 3)      Moves the ship corresponding to the left/right arrow keys.
function checkKeyIsDowns() {
    // default frame rate is 60 frames per second
    if (projectileReload >= frameRate()){
        if (keyIsDown(DOWN_ARROW) || keyIsDown(70)) { // 70 is ASCII for 'F'
            launchProjectile();
            console.log("FIRE!");
            projectileReload = 0;
        }
    }
    if (keyIsDown(LEFT_ARROW)) {
        spaceshipX -= keyShift;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
        spaceshipX += keyShift;
    }
    keepSpaceshipInBounds();
}

var keepSpaceshipInBounds = function() {
    // If spaceship hits the left side.
    if (spaceshipX < (width / 12)) {
        spaceshipX = width / 12;
    }
    // If spaceship hits the right side.
    else if (spaceshipX > (width * 11) / 12) {
        spaceshipX = (width * 11) / 12;
    }
}

var launchProjectile = function() {
    projectiles.push(new Character(spaceshipX, spaceshipY, false));
}

var checkCollisions = function () {
    // Loops through projectiles.
    for (var i = 0; i < projectiles.length; i++) {
        // Checks that projectile is still active.
        if (projectiles[i].hasCollided == false) {
            // Loops through aliens.
            for (var r = 0; r < 5; r++) {
                for(var c = 0; c < 11; c++) {
                    // Checks that alien is still alive.
                    if (aliens[r][c].hasCollided == false) {
                        // Checks that the projectile and alien align horizontally (i.e. x-axis)
                        if (abs(projectiles[i].xPos - aliens[r][c].xPos) < 5 * charSideLength / 8) {
                            // Checks that the projectile and alien align vertically (i.e. y-axis)
                            if (projectiles[i].yPos - aliens[r][c].yPos <= charSideLength) {
                                // Sets the `hasCollided` property to true for both the alien and projectile.
                                aliens[r][c].hasCollided = true;
                                projectiles[i].hasCollided = true;
                            }
                        }
                    }
                }
            }
        }
    }
}
