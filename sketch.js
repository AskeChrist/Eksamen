let pos1, vel1, acc1; //  (WASD)
let pos2, vel2, acc2; // (Arrow)


let maxS = 7; //maxSpeed
let fri = 0.9; //friction



function setup() {
  createCanvas(600, 600);

 
  pos1 = createVector(width / 20, height / 20); 
  vel1 = createVector(0, 0);
  acc1 = createVector(0, 0);


  pos2 = createVector(width - 30 , height - 30); 
  vel2 = createVector(0, 0);
  acc2 = createVector(0, 0);

JSONCirkel();
   
  }


function draw() {
  

 // console.log(keyCode);

  WASD();
  PIL();
  
  
  
  
  
  
}
function WASD() {
  acc1.set(0,0);
  
  if (keyIsDown(87)) {
    acc1.y = -0.3;
  }
  if (keyIsDown(83)) {
    acc1.y = 0.3;
  }
  if (keyIsDown(65)) {
    acc1.x = -0.3;
  }
  if (keyIsDown(68)) {
    acc1.x = 0.3;
  }

  vel1.add(acc1); //tilføje acceleration til hastighed
  vel1.mult(fri); //ganges hastigheden med en friktionsfaktor(0.9) 
  vel1.limit(maxS); //hastighed overstiger ik maxS
  pos1.add(vel1); //opdater spilelr posistion

  pos1.x = constrain(pos1.x, 10, width - 10);
  pos1.y = constrain(pos1.y, 10, height - 10);

  fill(255, 0, 0);
  ellipse(pos1.x, pos1.y, 20, 20);
}
function PIL() {
  acc2.set(0,0);
  
  if (keyIsDown(38)) {
    acc2.y = -0.3;
  }
  if (keyIsDown(40)) {
    acc2.y = 0.3;
  }
  if (keyIsDown(37)) {
    acc2.x = -0.3;
  }
  if (keyIsDown(39)) {
    acc2.x = 0.3;
  }
   vel2.add(acc2);
  vel2.mult(fri);
  vel2.limit(maxS);
  pos2.add(vel2);

  pos2.x = constrain(pos2.x, 10, width - 10);
  pos2.y = constrain(pos2.y, 10, height - 10);

  fill(0, 0, 255);
  ellipse(pos2.x, pos2.y, 20, 20);
}

function JSONCirkel(){
  
}



