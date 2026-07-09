function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('navy'); //navy background

  //moon
  fill(255);
  stroke(0);
  circle(350, 50, 100);

  //overlapping navy circle for crescent moon
  stroke("navy");
  fill("navy");
  circle(320,50,100);

  //big gray mountains
  stroke(0);
  fill(80);
  triangle(-40,300,75,100, 250,300);
  triangle(100,300,300,100, 500,300);

  //grass
  fill('rgb(50,76,50)');
  rect(0,300, 400, 100);

  //displays the x and y position of the mouse on the canvas
  fill(255) //white text
  text(`mouseX:) ${mouseX}, mouseY: ${mouseY}`, 20, 20);
  //cloud
fill(255);
ellipse(50, 50, 80, 40);
  //custom variable for x coordinate of cloud
let cloudOneX = 50;
  ellipse(cloudOneX, 50, 80, 40)
//sets the x coordinate to the frame count
//resets at left edge
cloudOneX = frameCount % width
}
