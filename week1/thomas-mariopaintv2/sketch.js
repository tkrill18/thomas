var slider;

function setup() {
    createCanvas(600, 600);
    resetSketch();
    // Creates a button with "Reset" written on it.
    // This requires the p5.dom library to be included as well.
    createP("");    // Adds a line break after the canvas for layout purposes.
    var button = createButton("Reset");
    // Creates a slider. Syntax is `createSlider(min, max, startingPoint)`
    slider = createSlider(5, 30, 15);
    // Attaches the `resetSketch` function to the `mousePressed` event of `button`.
    button.mousePressed(resetSketch);
}

// MAIN 3)      Draws three shapes to the canvas with three different colors.
// The draw function continuously draws shapes to the canvas.
function draw() {
    var gridUnit = height / 9;  // The grid unit, set to one-ninth the width/height of the canvas.
    var adj = 2;                // The adjustment, so that shapes do not run into each other.
    // Draws the three color bars.
    fill("red");
    rect(0, 0, width, gridUnit);
    fill("green");
    rect(0, gridUnit, width, gridUnit);
    fill("blue");
    rect(0, gridUnit * 2, width, gridUnit);

// BONUS 1)     Creates clickable shapes that let the user decide which shape to draw.
    // Draws a rectangle around the three shapes.
    fill(205);
    rect(0, gridUnit * 3, gridUnit + (adj * 2), (gridUnit * 3) + (adj * 5));
    fill(paintColor);
    ellipse((gridUnit / 2) + adj, (gridUnit * 4) - (gridUnit / 2) + adj, gridUnit);
    rect(adj, gridUnit * 4 + (adj * 2), gridUnit, gridUnit);
    triangle((gridUnit / 2) + adj, gridUnit * 5 + (adj * 4), adj, gridUnit * 6 + (adj * 4), gridUnit + adj, gridUnit * 6 + (adj * 4))
}

// MAIN 4)      Changes color values inside `mouseDragged` when user clicks on bar "buttons".

var paintColor = "red";
var paintShape = "circle";
function mousePressed() {
    var gridUnit = height / 9;
    var adj = 2;
    if (mouseY < gridUnit) {
        paintColor = "red";
    }
    else if (mouseY < gridUnit * 2) {
        paintColor = "green";
    }
    else if (mouseY < gridUnit * 3) {
        paintColor = "blue";
    }
    else if (mouseX < gridUnit) {
        if (mouseY < gridUnit * 4 + adj) {
            paintShape = "circle";
        }
        else if (mouseY < (gridUnit * 5) + (adj * 2)) {
            paintShape = "square";
        }
        else if (mouseY < (gridUnit * 6) + (adj * 4)) {
            paintShape = "triangle";
        }
    }
}

function mouseDragged() {
    fill(paintColor);

    // Creates the shape with different dimensions each time it is created.
    // Returns a random number between 5 and 20, inclusive.  
    var radius = slider.value();    

    // Defines a shape that will be drawn when the mouse is dragged.
    switch (paintShape) {
        case "circle":
            ellipse(mouseX, mouseY, radius * 2);
            break;
        case "square":
            rect(mouseX - radius, mouseY - radius, radius * 2, radius * 2);
            break;
        case "triangle":
            triangle(mouseX, mouseY - radius,
                     mouseX + (Math.sin(Math.PI / 3) * radius), mouseY + (Math.cos(Math.PI / 3) * radius),
                     mouseX - (Math.sin(Math.PI / 3) * radius), mouseY + (Math.cos(Math.PI / 3) * radius)
            );
    }
}

// MAIN 5)      Removes the shapes the user drew to the canvas.
function resetSketch(){
    // I copied everything in setup, besides button and creating the canvas.
    background(225);
}
