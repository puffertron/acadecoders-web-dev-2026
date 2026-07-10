let pos;

let speed =4;

let petsprite;

let frame = 6;
let counter = 0;



async function setup() {
  createCanvas(windowWidth,windowHeight);
  pos = createVector(30,50);

  petsprite = await loadImage('spritefromfort.png');

}


function draw() {
  clear();


  imageMode (CENTER);

  counter = counter + 0.1;


let distance = pos.dist(createVector(mouseX, mouseY));
let target_dir=createVector(0,0);


  if(distance > 80)  {
     target_dir = (createVector(mouseX, mouseY).sub(pos).normalize() );

frame = floor (counter) % 4 + 5;

  }

  else {frame = floor(counter) % 5; }

  if (distance < 33){

      frame = 9;}


 pos = pos.add(target_dir.mult(speed));

pos.x = constrain(pos.x, 0, windowWidth-32);
pos.y = constrain(pos.y, 0, windowHeight-32);
image(petsprite,pos.x, pos.y, 31*2, 31*2, 0, frame*32,31,31);



}
