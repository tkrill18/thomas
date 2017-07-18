// MAIN 5)      Defines a shape that will be drawn when the mouse is dragged.
    var radius = 20;

// MAIN 6)      Creates 
    var shapeNum = Math.floor(Math.random() * 3);
    console.log(shapeNum);
    switch(shapeNum) {
        case 0:
            ellipse(mouseX, mouseY, radius * 2);
            break;
        case 1:
            rect(mouseX - radius, mouseY - radius, radius * 2, radius * 2);
            break;
        case 2:
            triangle(mouseX, mouseY - radius,
                     mouseX + (Math.sin(Math.PI / 3) * radius), mouseY + (Math.cos(Math.PI / 3) * radius),
                     mouseX - (Math.sin(Math.PI / 3) * radius), mouseY + (Math.cos(Math.PI / 3) * radius)
            );
            break;
    }