function setup() {
    // Creates a canvas element in the document.
    // Here, sets the dimensions to 300 (w) x 300 (h) pixels.
    createCanvas(300, 300); 

    // Sets the color used for the background of the canvas.
    // Here, sets the color to the greyscale integer value corresponding to white.
    background(255);

    // Sets the color used to draw lines and borders around shapes.
    // Here, sets to color string value of "black".
    stroke("black");

    // Sets the width of the stroke used for lines, points, and the border around shapes.
    // Here, sets the width to 5 pixels.
    strokeWeight(5);

    // Sets the color used to fill shapes.
    // Here, sets to color string value of "white".
    fill("white");

    // `width` and `height` are global variables for the width and height of the canvas.
    // So, `width / 2` and `height / 2` give the coordinates for the center of the canvas.

    // BOTTOM HALF

    // Draws an arc to the screen. Syntax: arc(a, b, c, d, start, stop, [mode]);
    // Here, sets x & y coordinates of arc's ellipse to center of canvas (i.e. center of circle),
    //       sets both width and height of arc's ellipse to 200 pixels (i.e. radius of circle),
    //       sets start at 0 rad and stop to PI radians (drawing clockwise),
    //       sets the mode to CHORD, so straight line drawn across from start to stop.
    arc(width / 2, height / 2, 200, 200, 0, PI, CHORD);

    // TOP HALF

    // Sets the color used to fill shapes to red.
    fill("red");

    // Here, same as before, but,
    //       sets sets start at PI radians and stop at O radians (drawing clockwise).
    arc(width / 2, height / 2, 200, 200, PI, 0, CHORD);

    // CENTER

    // Sets the color used to fill shapes back to white.
    fill("white");

    // Draws an ellipse (oval) to the screen.
    // Here, sets x & y coordinates to center of canvas, and radius to 50 pixels.
    ellipse(width / 2, height / 2, 50);

    // Sets the color used to fill shapes to black.
    fill("black");
    
    // Draws an ellipse at the center of the canvas with radius to 25 pixels.
    ellipse(width / 2, height / 2, 25);
}