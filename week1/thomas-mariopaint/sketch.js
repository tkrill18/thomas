function setup() {
    createCanvas(600, 600);
    resetSketch();
    // Creates a button with "Reset" written on it.
    // This requires the p5.dom library to be included as well.
    var button = createButton("Reset");
    // Attaches the `resetSketch` function to the `mousePressed` event of `button`.
    button.mousePressed(resetSketch);
}

function mouseDragged() {
// BONUS 1)     Changes the fill color each time the mouse is dragged.
    var r = random(0, 256);
    var g = random(0, 256);
    var b = random(0, 256);
    var a = random(200, 255);
    
    fill(r, g, b, a);

// MAIN 6)      Creates the shape with different dimensions each time it is created.
    // Returns a random number between 5 and 20, inclusive.  
    var radius = random(5, 21);     

// MAIN 5)      Defines a shape that will be drawn when the mouse is dragged.
    rect(mouseX - radius, mouseY - radius, radius * 2, radius * 2);

}

// BONUS 2)     Removes the shapes the user drew to the canvas.
function resetSketch(){
    // I copied everything in setup, besides button and creating the canvas.
    background(225);
}
