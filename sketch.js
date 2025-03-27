let pos1, vel1, acc1; // (WASD)
let pos2, vel2, acc2; // (Arrow)
let maxS; // maxSpeed
let fri = 0.87; // friction
let blobdata = []; // store blobs
let rr = 15; // radius of red player
let rb = 15; // radius of blue player
let redPlayerPoint = 0;
let bluePlayerPoint = 0;
let win = false;

function setup() {
  createCanvas(600, 600);
  startPos();
 
}
function startPos(){
  background(220);
   // Set initial positions
  pos1 = createVector(random(30, 150), random(30, 150));
  vel1 = createVector(0, 0);
  acc1 = createVector(0, 0);

  pos2 = createVector(random(width - 150, width - 30), random(height - 150, height - 30));
  vel2 = createVector(0, 0);
  acc2 = createVector(0, 0);

  // Generate blobs
  for (let i = 0; i < 60; i++) {
    let newblob = {
      x: random(12, width - 12),
      y: random(12, height - 12),
      r: Math.floor(random(9, 12)),
      color: { r: random(0, 255), g: random(0, 255), b: random(0, 255) }
    };
    blobdata.push(newblob);
  }  
}



function draw() {
  background(220);

  if (!win) {
    BlobG();
    SpisB();

    if (rr < rb) { // Z-index
      WASD();
      PIL();
    } else {
      PIL();
      WASD();
    }

    Score();
  } else {
    displayWinner();
  }
}



// Player 1 controls (WASD)
function WASD() {
  acc1.set(0, 0);

  if (keyIsDown(87)) acc1.y = -0.7;
  if (keyIsDown(83)) acc1.y = 0.7;
  if (keyIsDown(65)) acc1.x = -0.7;
  if (keyIsDown(68)) acc1.x = 0.7;

  vel1.add(acc1);
  vel1.mult(fri);
  vel1.limit((2.6 / (2 * sqrt(rr))) * 10);
  pos1.add(vel1);

  pos1.x = constrain(pos1.x, rr, width - rr);
  pos1.y = constrain(pos1.y, rr, height - rr);
  stroke(20)
  fill(255, 0, 0);
  ellipse(pos1.x, pos1.y, rr * 2, rr * 2);
}

// Player 2 controls (Arrow Keys)
function PIL() {
  acc2.set(0, 0);

  if (keyIsDown(UP_ARROW)) acc2.y = -0.7;
  if (keyIsDown(DOWN_ARROW)) acc2.y = 0.7;
  if (keyIsDown(LEFT_ARROW)) acc2.x = -0.7;
  if (keyIsDown(RIGHT_ARROW)) acc2.x = 0.7;

  vel2.add(acc2);
  vel2.mult(fri);
  vel2.limit((2.6 / (2 * sqrt(rb))) * 10);
  pos2.add(vel2);

  pos2.x = constrain(pos2.x, rb, width - rb);
  pos2.y = constrain(pos2.y, rb, height - rb);

  stroke(20)
  fill(0, 0, 255);
  ellipse(pos2.x, pos2.y, rb * 2, rb * 2);
}

// Blob rendering
function BlobG() {
  noStroke();
  for (let i = 0; i < blobdata.length; i++) {
    fill(blobdata[i].color.r, blobdata[i].color.g, blobdata[i].color.b);
    ellipse(blobdata[i].x, blobdata[i].y, blobdata[i].r * 2);
  }
}

// Collision Detection & Score Update
function SpisB() {
  for (let i = blobdata.length - 1; i >= 0; i--) {
    if (dist(pos1.x, pos1.y, blobdata[i].x, blobdata[i].y) < Math.abs(rr - blobdata[i].r / 2)) {
      blobdata.splice(i, 1);
      redPlayerPoint ++ ;
      console.log("Red Score: " + redPlayerPoint);
      rr += 1;
    } else if (dist(pos2.x, pos2.y, blobdata[i].x, blobdata[i].y) < Math.abs(rb - blobdata[i].r / 2)) {
      blobdata.splice(i, 1);
      bluePlayerPoint ++;
      console.log("Blue Score: " + bluePlayerPoint);
      rb += 1;
    }
  }

  // Check Player Collision
  if (dist(pos1.x, pos1.y, pos2.x, pos2.y) < Math.abs(rb - rr)) {
    if (rr > rb) {
      win = "Red Wins!";
    } else if (rb > rr) {
      win = "Blue Wins!";
    }
  }

}

function Score() {
  stroke(20)
  textSize(32);
  fill(255, 0, 0);
  text(redPlayerPoint, 100, 100);
  fill(0, 0, 255);
  text(bluePlayerPoint, 400, 100);
}

// Display winner
function displayWinner() {
  background(50);
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(win, width / 2, height / 2);
  noLoop(); // Stop the game
  let button = createButton("Restart");
  button.mousePressed(startGame);
}
function startGame(){
  startPos();
  redPlayerPoint = 0;
  bluePlayerPoint = 0;
  win = false;
  rr = 15; // radius of red player
  rb = 15;
  loop();
}
