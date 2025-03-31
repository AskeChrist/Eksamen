let pos1, vel1, acc1; // (WASD)
let pos2, vel2, acc2; // (Arrow)
let maxS = 2.6; // maxSpeed
let fri = 0.87; // friction
let blobdata = []; // store blobs
let rr = 15; // radius of red player
let rb = 15; // radius of blue player
let redPlayerPoint = 0;
let bluePlayerPoint = 0;
let win = false;
let button;

function preload() {
  lyd_spisB = loadSound("lyd_spisB.mp3");
  lyd_displayWinner = loadSound("lyd_displayWinner.mp3");
  lyd_startGame = loadSound("lyd_startGame.mp3");
}

function setup() {
  createCanvas(600, 600);
  startPos();
}

function startPos() {
  background(220);
  pos1 = createVector(random(30, 150), random(30, 150));
  vel1 = createVector(0, 0);
  acc1 = createVector(0, 0);

  pos2 = createVector(random(width - 150, width - 30), random(height - 150, height - 30));
  vel2 = createVector(0, 0);
  acc2 = createVector(0, 0);

  // Generate blobs
  blobdata = [];
  for (let i = 0; i < 60; i++) {
    let newblob = {
      x: random(12, width - 12),
      y: random(12, height - 12),
      r: Math.floor(random(7, 10)),
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
  } else {
    displayWinner();
  }
}

// Draw player
function drawPlayer(x, y, r, col, points) {
  stroke(20);
  fill(col);
  ellipse(x, y, r * 2, r * 2);

  // Display points inside the blob
  fill(255); // White text for visibility
  textAlign(CENTER, CENTER);
  textSize(16);
  text(points, x, y);
}

// Player 1 controls (WASD)
function WASD() {
  acc1.set(0, 0);

  if (keyIsDown(87)) acc1.y = -0.7; // W key
  if (keyIsDown(83)) acc1.y = 0.7;  // S key
  if (keyIsDown(65)) acc1.x = -0.7; // A key
  if (keyIsDown(68)) acc1.x = 0.7;  // D key

  vel1.add(acc1);
  vel1.mult(fri);
  vel1.limit((maxS / (2 * sqrt(rr))) * 10);
  pos1.add(vel1);

  pos1.x = constrain(pos1.x, rr, width - rr);
  pos1.y = constrain(pos1.y, rr, height - rr);

  drawPlayer(pos1.x, pos1.y, rr, color(255, 0, 0), redPlayerPoint);
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

  drawPlayer(pos2.x, pos2.y, rb, color(0, 0, 255), bluePlayerPoint);
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
    if (dist(pos1.x, pos1.y, blobdata[i].x, blobdata[i].y) < Math.abs(rr - blobdata[i].r / 2) / 1.02) {
      blobdata.splice(i, 1);
      redPlayerPoint++;
      rr += 1;
      lyd_spisB.setVolume(0.3); // Sænk lydstyrken
      lyd_spisB.play(); // Spil spis-lyd
    } else if (dist(pos2.x, pos2.y, blobdata[i].x, blobdata[i].y) < Math.abs(rb - blobdata[i].r / 2) / 1.02) {
      blobdata.splice(i, 1);
      bluePlayerPoint++;
      rb += 1;
      lyd_spisB.setVolume(0.3); // Sænk lydstyrken
      lyd_spisB.play(); // Spil spis-lyd
    }
  }

  // Check Player Collision
  if (dist(pos1.x, pos1.y, pos2.x, pos2.y) < Math.abs((rb - rr)/0.85)) {
    lyd_displayWinner.setVolume(0.1); // Sænk lydstyrken
    lyd_displayWinner.play(); // Spil resultat-lyd
    if (rr > rb) {
      win = "Red wins!";
    } else if (rb > rr) {
      win = "Blue wins!";
    }
  }

}

// Display winner
function displayWinner() {
  background(50);
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(win, width / 2, height / 2);
  noLoop(); // Stop spillet fra at loope midlertidigt
  button = createButton("Play again");
  button.size(100, 30); // Størrelse på knappen
  button.position(width / 2 - 50, height / 2 + 50); // Placer knappen i midten, lige under teksten
  button.mousePressed(startGame);
}

function startGame() {
  lyd_startGame.setVolume(0.3); // Sænk lydstyrken
  lyd_startGame.play(); // Spil start-lyd
  startPos();
  redPlayerPoint = 0;
  bluePlayerPoint = 0;
  button.hide(); // Fjern knappen
  win = false; // Reset så ingen har vundet
  rr = 15; // Reset radius af rød spiller
  rb = 15; // Reset radius af blå spiller
  loop(); // Start spillets loop igen
}
