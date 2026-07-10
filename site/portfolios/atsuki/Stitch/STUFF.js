// Set variables to draw the racetrack.
let startLine = 30;
let finishLine = 400;

// Set variables for the caterpillar.
let spacing = 20;
let segmentSize = 30;
let eyeSize = 15;

// Set variables for the race.
let numCaterpillars = 3;
let caterpillarEnds = [];

//Set a default state
// before the race begings.
let isRacing = false;

function setup() {
  createCanvas(500, 500);

  // Set a slow frame rate.
  frameRate (3);
  for (let i=0;i<numCaterpillars;i++) {
    caterpillarEnds.push (startLine)
  }
}

function draw() {
  // Draw the background.
  // start, and finish line.
  background(121, 96, 76);
  noStroke();
  fill(0);
  rect(startLine, 0, 5, height);
  fill(0, 255, 0);
  rect(finishLine, 0, 20, height);

  //Move caterpillars if
  // race has started
  if (isRacing === true) {
    moveCaterpillars ();
  } else {
    // if the race hasn't started
    //instructions on the start screen
    writeStart ();
  }

  // Draw caterpillars at
  // the starting line.
  drawCaterpillars ();

 // Check if there is a winner
  checkWinner ();
}

  // Draw
