//behavior
//swim towards mouse until its within certain distance DONE
//change sprites to animate swim DONE
//change sprites when mouse is hovering over the "pet"

//pet position
let position;
//pet speed
let speed = 5;
let spinning = false;

//variables for the pet sprites
let petL;
let petR;

let frame = 5;
let counter = 0;

let angle = 0;
let offset=0;

let dir = 1

function conv2dto3d(vec){
    let newx = vec.x - windowWidth/2;
    let newy = vec.y - windowHeight/2;
    return createVector(newx, newy);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);


  //spawn pet at X, Y.
  position = createVector(30, 30);


  //load pet sprites
   petL = await loadImage("fishL.png"); //replace with name of your file
   petR = await loadImage("fishR.png"); //same as above
    sprite=petL;
}

function draw() {


  //makes background clear
  clear();

  imageMode(CENTER);

  counter = counter + 0.1;

    //my brain hurts...


  //distance to mouse
let distance = position.dist(createVector(mouseX, mouseY));
let targetdir = createVector(0, 0);

  //vector a - vector b = arrow
  //if too far away from mouse:
  //sub = subtract
  //This is VERY MENTAL.
  //HUURRG


frame =0;
  if (distance > 80) {
    //get direction to mouse
    targetdir = (createVector(mouseX, mouseY).sub(position).normalize() );
    //play swim animation
    //switch direction
    if (mouseX > position.x){//point right

        sprite=petR;
        dir = 1
    }

    else { //point left
        sprite=petL;
        dir = -1
    }
    if (distance < 33*2.5){
        //play animation
        frame = 0;

       if (mouseIsPressed) {
           spinning = true;
       }

    }

      frame = floor(counter) % 5 +4;
}


if (spinning) {
    print("spinning")
    offset = lerp(offset, -50, 0.4);
    if (angle*dir < 360 * dir){
        angle += 20;
    }
    if (angle*dir >= 360*dir){
        angle = 0;
        spinning = false;
        offset = 0;
    }
}





// pet position = pet position + direction * speed
  position = position.add(targetdir.mult(speed));
  //after the line above, my "pet works" but is being VERY stupid...

    //constrains the pet
    position.x = constrain(position.x, 0, windowWidth-32);
    position.y = constrain(position.y, 0, windowHeight-32);

// uses X, Y, W, H.  X, Y is where. W, H is the dimensions
  // controls rotation movement
    push();
    let newcoords = conv2dto3d(position);

    translate(newcoords.x, newcoords.y);

    rotateZ(radians(angle));

    translate(0, offset);

    //draws pet
 image(sprite, -32*1.25, 32*1.25, 32*2.5, 32*2.5, 0, 32*frame, 32, 32 );
 //stops rotation
 pop();
}

// IDK why im doing this. hdhdhdhdhdhdhdhdhdhdhdhdhd
//Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu longest place name.
