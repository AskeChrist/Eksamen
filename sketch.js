let pos1, vel1, acc1; // (WASD)
let pos2, vel2, acc2; // (Arrow)

let maxS; // maxSpeed
let fri = 0.87; // friction

let blobdata = []; // opbevare blobs

let r = 15;//radius af blob
let rr = 15;
let rb = 15;
redPlayerPoint = 0;
bluePlayerPoint = 0;



function setup() {
  createCanvas(600, 600);

  pos1 = createVector(random(width - 570, width - 450), random(height - 570, height - 450)); // Vektor der bestemmer startposition for spiller 1
  vel1 = createVector(0, 0);
  acc1 = createVector(0, 0);

  pos2 = createVector(random(width - 30, width - 150), random(height - 150, width - 30)); // Vektor der bestemmer startposition for spiller 1
  vel2 = createVector(0, 0);
  acc2 = createVector(0, 0);

  for (let i = 0; i < 60; i++) {
    let newblob = {
      x: random(0, 600),
      y: random(0, 600),
      r,
    };
    blobdata.push(newblob);
  }
}

function draw() {
  background(220);
  WASD();
  PIL();
  BlobG();
}

function WASD(redPlayerPoint) {
  acc1.set(0, 0);

  if (keyIsDown(87)) acc1.y = -0.7;
  if (keyIsDown(83)) acc1.y = 0.7;
  if (keyIsDown(65)) acc1.x = -0.7;
  if (keyIsDown(68)) acc1.x = 0.7;

  vel1.add(acc1);
  vel1.mult(fri);
  vel1.limit((maxS = 2.6/(2*sqrt(rr))*10));
  pos1.add(vel1);

  pos1.x = constrain(pos1.x, rr, width - rr);
  pos1.y = constrain(pos1.y, rr, height - rr);

  fill(255, 0, 0);
 let redsize = ellipse(pos1.x, pos1.y, rr*2, rr*2);

}

function PIL() {
  acc2.set(0, 0);

  if (keyIsDown(38)) acc2.y = -0.7;
  if (keyIsDown(40)) acc2.y = 0.7;
  if (keyIsDown(37)) acc2.x = -0.7;
  if (keyIsDown(39)) acc2.x = 0.7;

  vel2.add(acc2);
  vel2.mult(fri);
  vel2.limit((maxS= 2.6/(2*sqrt(rb))*10));
  pos2.add(vel2);
  pos2.x = constrain(pos2.x, rb, width - rb);
  pos2.y = constrain(pos2.y, rb, height - rb);

  fill(0, 0, 255);
  let bluesize = ellipse(pos2.x, pos2.y, rb*2, rb*2);
  
}

function BlobG() {
  fill(0, 255, 0);
  for (let i = blobdata.length - 1; i >= 0; i--) {
    let blob = blobdata[i];

    ellipse(blob.x, blob.y, blob.r * 2);
    if (dist(pos1.x, pos1.y, blob.x, blob.y) < rr) {
      blobdata.splice(i, 1);
      redPlayerPoint ++
      console.log(redPlayerPoint);
      rr += 1
    
    }
    if (dist(pos2.x, pos2.y, blob.x, blob.y) < rb) {
      blobdata.splice(i, 1);
      bluePlayerPoint ++
      console.log(bluePlayerPoint);
      rb += 1
      
    }
    if(dist(pos1.x,pos1.y,pos2.x,pos2.y) < rb + rr){
      if(rr>rb){
        rr += rb;
        rb=0;
      }
      if(rb>rr){
        rb +=rr;
        rr=0;
      }
    }
  }
      textSize(32);
      fill(255,255,255);
      text(redPlayerPoint,100,100); 
      text(bluePlayerPoint,400,100); 
}
