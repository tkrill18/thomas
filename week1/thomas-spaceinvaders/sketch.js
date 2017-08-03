// This solution has in addition to the main program, bonus 1A.

var alienGridUnit, charSideLength, projectileSpeed;
var aliens, spaceshipProjectiles, alienProjectiles;
var keyShift, spaceshipX, spaceshipY;
var spaceshipProjectileReload, spaceshipProjectileReloadMax, alienProjectileTimer, alienProjectileInterval;

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
    projectileSpeed = height / 72;
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
    spaceshipProjectiles = [];
    alienProjectiles = [];
    // Initial Positions
    keyShift = width / 180; 
    spaceshipX = width / 2;
    spaceshipY = height - (height / 6);
    spaceshipProjectileReload = frameRate();
    alienProjectileInterval = frameRate() * random(0.5, 1.5);
    alienProjectileTimer = 0;
}

function draw() {
// MAIN 2)      Sets up the canvas with the basic elements of the game.
    background("black");
    // Checks for key presses.
    checkKeyIsDowns();
    // Potentially fires alien projectiles.
    letAliensFire();
    // Increments the reloading status of the spaceshipProjectiles.
    spaceshipProjectileReload += 1;
    // Increments the timer for the alienProjectiles.
    alienProjectileTimer += 1;
    // Draws Alien Characters.
    fill("white");
    for (var r = 0; r < 5; r++) {
        for(var c = 0; c < 11; c++) {
            if (aliens[r][c].hasCollided == false) {
                rect(aliens[r][c].xPos, aliens[r][c].yPos, charSideLength, charSideLength);
            }
        }
    }
    // Draws Your Spaceship Character.
    fill("lime");
    rect(spaceshipX, spaceshipY, charSideLength, charSideLength);
    // Draws and advances the Spaceship's Projectiles.
    for (var i = 0; i < spaceshipProjectiles.length; i++) {
        // Draws only the projectiles that have yet to collide.
        if (spaceshipProjectiles[i].hasCollided == false) {
            rect(spaceshipProjectiles[i].xPos, spaceshipProjectiles[i].yPos, charSideLength / 4, charSideLength);
            // Moves the projectiles up the screen.
            spaceshipProjectiles[i].yPos -= projectileSpeed;
        }
    }
    // Draws and advances the Aliens' Projectiles.
    fill("pink");
    for (var i = 0; i < alienProjectiles.length; i++) {
        // Draws only the projectiles that have yet to collide.
        if (alienProjectiles[i].hasCollided == false) {
            rect(alienProjectiles[i].xPos, alienProjectiles[i].yPos, charSideLength / 4, charSideLength);
            // Moves the projectiles up the screen.
            alienProjectiles[i].yPos += projectileSpeed;
        }
    }
    // Checks for collisions.
    checkCollisions();
}

// MAIN 3)      Moves the ship corresponding to the left/right arrow keys.
function checkKeyIsDowns() {
    // default frame rate is 60 frames per second
    // Lets the player fire only once per second.
    if (spaceshipProjectileReload >= frameRate()){
        if (keyIsDown(DOWN_ARROW) || keyIsDown(70)) { // 70 is ASCII for 'F'
            launchSpaceshipProjectile();
            console.log("FIRE!");
            spaceshipProjectileReload = 0;
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

var launchSpaceshipProjectile = function() {
    spaceshipProjectiles.push(new Character(spaceshipX, spaceshipY, false));
}

var launchAlienProjectile = function(row, col) {
    alienProjectiles.push(new Character(aliens[row][col].xPos, aliens[row][col].yPos, false));
}

var letAliensFire = function() {
    // Picks a random time interval.
    if (alienProjectileTimer >= alienProjectileInterval) {
        alienProjectileInterval = frameRate() * random(0.5, 1.5); // will be random
        alienProjectileTimer = 0;
        // Picks a random column to fire from.
        var randomCol = floor(random(11));
        if (getLowestAlien(randomCol) != -1) {
            launchAlienProjectile(getLowestAlien(randomCol), randomCol);
            console.log(randomCol + " fired from " + getLowestAlien(randomCol));
        }
    }
}

var getLowestAlien = function(col) {
    for(var r = 4; r > -1; r--) {
        if (aliens[r][col].hasCollided == false) {
            return r;
        }
    }
    return -1;
}

var checkCollisions = function () {
    // Loops through spaceshipProjectiles.
    for (var i = 0; i < spaceshipProjectiles.length; i++) {
        // Checks that projectile is still active.
        if (spaceshipProjectiles[i].hasCollided == false) {
            // Loops through aliens.
            for (var r = 0; r < 5; r++) {
                for(var c = 0; c < 11; c++) {
                    // Checks that alien is still alive.
                    if (aliens[r][c].hasCollided == false) {
                        // Checks that the projectile and alien align horizontally (i.e. x-axis)
                        if (abs(spaceshipProjectiles[i].xPos - aliens[r][c].xPos) < 5 * charSideLength / 8) {
                            // Checks that the projectile and alien align vertically (i.e. y-axis)
                            if (spaceshipProjectiles[i].yPos - aliens[r][c].yPos <= charSideLength) {
                                // Sets the `hasCollided` property to true for both the alien and projectile.
                                aliens[r][c].hasCollided = true;
                                spaceshipProjectiles[i].hasCollided = true;
                            }
                        }
                    }
                }
            }
        }
    }
    // Loops through alienProjectiles.
    for (var i = 0; i < alienProjectiles.length; i++) {
        // Checks that projectile is still active.
        if (alienProjectiles[i].hasCollided == false) {
            // Checks that the projectile and spaceship align horizontally (i.e. x-axis)
            if (abs(alienProjectiles[i].xPos - spaceshipX) < 5 * charSideLength / 8) {
                // Checks that the projectile and spaceship align vertically (i.e. y-axis)
                // add positive aspect
                if (abs(spaceshipY - alienProjectiles[i].yPos) <= charSideLength) {
                    alienProjectiles[i].hasCollided = true;
                    console.log("SHIP DOWN!");
                    textSize(72);
                    textAlign(CENTER);
                    textFont("Segoe UI");
                    fill("black");
                    textStyle(BOLD);
                    stroke("pink");
                    strokeWeight(5);
                    text("GAME OVER", width/2, height/2);
                    noLoop();
                }
            }
        }
    }
}


