//behavior
//walk towards mouse until its within a certain distance
//change sprites to animated walk
//change sprites when hovered by mouse (pet)
//pet position
let position;
//pet speed
let speed = 5;
//variables for the pet sprites
let petright;
let petleft;
let frame = 1;
let counter = 0;

let sprite;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  //spawn pet at coordinates: 30, 3030
  position = createVector (30, 30);

  petleft = await loadImage ('leftkirby.png');
  petright = await loadImage ('rightkirby.png');

  sprite = petright;
}

function draw() {
  clear ();
  imageMode (CENTER);

  counter = counter + 0.1;

  //get distance to mouse
  let distance = position.dist (createVector (mouseX, mouseY));
  let target_direction = createVector (0, 0);
  //if we are too far away from the mouse
  if (distance > 80) {
  // get direction to mouse
  target_direction = (createVector (mouseX, mouseY). sub (position). normalize ());

  //play run animation
  //direction check
  if (mouseX > position.x) { //point right
  sprite = petright;
  }
  else {//point left
  sprite = petleft;

  }


   frame = floor (counter) % 5 + 3;

  }

  else { frame = 1;}

  if (distance < 33) {
    // play pet animation
    frame = floor (counter) % 2 + 9 -1;
  }
  position = position. add (target_direction.mult (speed));
  position.x = constrain (position.x, 0, windowWidth - 32);
  position.y = constrain (position.y, 0, windowHeight - 32);

  //draw the pet
  //iamge      position       size
  image (sprite, position.x, position.y, 60, 60, 0, frame*32, 32, 32);
}
