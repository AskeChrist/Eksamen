let pos1, vel1, acc1; // (WASD)
let pos2, vel2, acc2; // (Arrow)

let maxS = 7; // maxSpeed
let fri = 0.9; // friction

let blobdata = []; // Store blobs

let i;
let u;

function setup() {
  createCanvas(600, 600);

  pos1 = createVector(width / 20, height / 20);
  vel1 = createVector(0, 0);
  acc1 = createVector(0, 0);

  pos2 = createVector(width - 30, height - 30);
  vel2 = createVector(0, 0);
  acc2 = createVector(0, 0);


  for (let i = 0; i < 30; i++) {
    let newblob = {
      x: random(0,600),
      y: random(0,600),
      r: 10,
    };
    blobdata.push(newblob);
  }
}

function draw() {
  background(220); 
  WASD();
  PIL();
  BlobG();
  SpisB();
}

function WASD() {
  acc1.set(0, 0);

  if (keyIsDown(87)) acc1.y = -0.3;
  if (keyIsDown(83)) acc1.y = 0.3;
  if (keyIsDown(65)) acc1.x = -0.3;
  if (keyIsDown(68)) acc1.x = 0.3;

  vel1.add(acc1);
  vel1.mult(fri);
  vel1.limit(maxS);
  pos1.add(vel1);

  pos1.x = constrain(pos1.x, 10, width - 10);
  pos1.y = constrain(pos1.y, 10, height - 10);

  fill(255, 0, 0);
  ellipse(pos1.x, pos1.y, 20, 20);
}

function PIL() {
  acc2.set(0, 0);

  if (keyIsDown(38)) acc2.y = -0.3;
  if (keyIsDown(40)) acc2.y = 0.3;
  if (keyIsDown(37)) acc2.x = -0.3;
  if (keyIsDown(39)) acc2.x = 0.3;

  vel2.add(acc2);
  vel2.mult(fri);
  vel2.limit(maxS);
  pos2.add(vel2);

  pos2.x = constrain(pos2.x, 10, width - 10);
  pos2.y = constrain(pos2.y, 10, height - 10);

  fill(0, 0, 255);
  ellipse(pos2.x, pos2.y, 20, 20);
}

function BlobG() {
  fill(0, 255,0);
  for (let i = 0; i < blobdata.length; i++) {
    ellipse(blobdata[i].x, blobdata[i].y, blobdata[i].r *2); 
  }
}

function SpisB(){
  if (dist(pos1.x, pos1.y,i,u) < 40)  {
      textSize(30);
      text("Collision", x - 50, y - 50, u, i);
      i = 0;
      u = random(0, 600);
      console.log("YAY GOTCHA");
}
}





