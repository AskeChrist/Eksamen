let pos1, vel1, acc1; //  Spiller 1 - WASD-taster
let pos2, vel2, acc2; // Spiller 2 - Arrow-taster

let maxS = 2.6; // Maksimal hastighed
let fri = 0.87; // Friktionsfaktor


function setup() {
  createCanvas(600, 600); // Canvas størrelse
  background(240); // Baggrundsfarve

 
  pos1 = createVector(random(width - 570, width - 450), random(height - 570, height - 450)); // Vektor der bestemmer startposition for spiller 1
  vel1 = createVector(0, 0); // Vektor der bestemmer hastighed for spiller 1
  acc1 = createVector(0, 0); // Vektor der bestemmer acceleration for spiller 1


  pos2 = createVector(random(width - 30, width - 150), random(height - 30, width - 150)); // Vektor der bestemmer startposition for spiller 1
  vel2 = createVector(0, 0); // Vektor der bestemmer hastighed for spiller 1
  acc2 = createVector(0, 0); // Vektor der bestemmer acceleration for spiller 1

  cirkD = 30; // Diameter af cirkel

JSONCirkel();
   
  }



function draw() {
  background(240); // Baggrundsfarve

 // console.log(keyCode);

  WASD();
  PIL();
  
}



function WASD() { // Kontrol af spiller 1
  acc1.set(0,0);
  
  if (keyIsDown(87)) {
    acc1.y = -0.7;
  }
  if (keyIsDown(83)) {
    acc1.y = 0.7;
  }
  if (keyIsDown(65)) {
    acc1.x = -0.7;
  }
  if (keyIsDown(68)) {
    acc1.x = 0.7;
  }

  vel1.add(acc1); // Tilføjer acceleration til hastighed
  vel1.mult(fri); // Ganger hastigheden med en friktionsfaktor (fri)
  vel1.limit(maxS); // Hastighed overstiger ikke maksimal hastighed (maxS)
  pos1.add(vel1); // Opdaterer spiller posistion

  pos1.x = constrain(pos1.x, cirkD/2, width - cirkD/2);
  pos1.y = constrain(pos1.y, cirkD/2, height - cirkD/2);

  fill(255, 0, 0); // Blå farve til spiller 1
  ellipse(pos1.x, pos1.y, cirkD, cirkD); // Position og størrelse af spiller 1
}


function PIL() { // Kontrol af spiller 2
  acc2.set(0,0);
  
  if (keyIsDown(38)) {
    acc2.y = -0.7;
  }
  if (keyIsDown(40)) {
    acc2.y = 0.7;
  }
  if (keyIsDown(37)) {
    acc2.x = -0.7;
  }
  if (keyIsDown(39)) {
    acc2.x = 0.7;
  }
   vel2.add(acc2); // Tilføjer acceleration til hastighed
  vel2.mult(fri); // Ganger hastigheden med en friktionsfaktor (fri)
  vel2.limit(maxS); // Hastighed overstiger ikke maksimal hastighed (maxS)
  pos2.add(vel2); // Opdaterer spiller posistion

  pos2.x = constrain(pos2.x, cirkD/2, width - cirkD/2);
  pos2.y = constrain(pos2.y, cirkD/2, height - cirkD/2);

  fill(0, 0, 255); // Blå farve til spiller 2
  ellipse(pos2.x, pos2.y, cirkD, cirkD); // Position og størrelse af spiller 2
}

function JSONCirkel(){
  
}
