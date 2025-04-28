let posRød, velRød, accRød; // WASD-tasternes attributter
let posBlå, velBlå, accBlå; // Arrow-tasternes attributter
let velMax = 2.4;             // Maksimal hastighed
let fri = 0.87;             // Friktionskoefficient
let blobdata = [];          // Opbevaring af attributter for blobs
let radiusRød = 15;         // Radius af rød spiller på 15 i starten
let radiusBlå = 15;         // Radius af blå spiller på 15 i starten
let pointRød = 0;           // Point for rød spiller
let pointBlå = 0;           // Point for blå spiller
let win = false;            // Variabel til at holde styr på vinderen - i starten er der ingen vinder
let genstartKnap;           // Knappen til at starte spillet igen

function preload() {                                      // Indlæs lydfiler til brug som lydeffekter
  lyd_spisB = loadSound("lyd_spisB.mp3");                 // 1. Lyd når en spiller spiser en blob
  lyd_displayWinner = loadSound("lyd_displayWinner.mp3"); // 2. Lyd når der vises en vinder
  lyd_startGame = loadSound("lyd_startGame.mp3");         // 3. Lyd når spillet starter igen
}

function setup() {        // Setup-funktion til at initialisere spillet
  createCanvas(600, 600); // Størrelsen af spillerfladen
  StartPos();             // Placér spillerne og blobs på skærmen 
}

function StartPos() {                                       // Generér attributter for spillerne og blobs
  background(220);                                          // Baggrundsfarve sættes til lys grå
  posRød = createVector(random(30, 150), random(30, 150));  // Rød spillers startposition øveste til venstre
  velRød = createVector(0, 0);                              // Rød spillers hastighed er 0 i starten
  accRød = createVector(0, 0);                              // Rød spillers acceleration er 0 i starten
  
  posBlå = createVector(random(width - 150, width - 30), random(height - 150, height - 30)); // Blå spillers startposition nederst til højre
  velBlå = createVector(0, 0);                              // Blå spillers hastighed er 0 i starten
  accBlå = createVector(0, 0);                              // Blå spillers acceleration er 0 i starten

  blobdata = [];                    // Generér et tomt array til at opbevare blobs
  for (let i = 0; i < 59; i++) {    // Generér 59 blobs med tilfældige positioner og farver
    let newblob = {
      x: random(12, width - 12),    // Random position på x-aksen, men 12 pixels fra kanten
      y: random(12, height - 12),   // Random position på y-aksen, men 12 pixels fra kanten
      r: Math.floor(random(7, 10)), // Random heltal radius mellem 7 og 10 pixels
      color: { r: random(0, 255), g: random(0, 255), b: random(0, 255) }  // Random RGB-farve mellem 0 og 255 for hver farvekanal
    };
    blobdata.push(newblob);         // Tilføj den nye blob til arrayet
  }  
}


function draw() {
  background(220);                // Baggrundsfarve sættes til lys grå for at opdatere skærmen

  if (!win) {                     // Hvis ingen har vundet, så gentag spil-loopet
    TegnBlobs();                  // Tegn blobs på skærmen
    SpisBlobs();                  // Tjek om spillerne spiser blobs
    SpisSpillere();               // Tjek om spillerne spiser hinanden

    if (radiusRød < radiusBlå) {  // Z-index
      RødWASD();                  // Hvis blå spiller er størst, så tegn den først
      BlåPILE();
    } else {
      BlåPILE();                  // Hvis rød spiller er størst, så tegn den først
      RødWASD();
    }
  } else {
    DisplayWinner();              // Hvis der er en vinder, så vis vinderen
  }
}

function DrawPlayer(x, y, r, col, points) { // Tegner spillerne og deres point
  stroke(20);                               // Kantlinje-farve sættes til mørk grå
  fill(col);                                // Spillernes farve sættes til hhv. rød og blå
  ellipse(x, y, r * 2, r * 2);              // Tegner spilleren som en cirkel (d = 2r)

  fill(255);                  // Point-tekstfarve sættes til hvid
  textAlign(CENTER, CENTER);  // Centrer teksten i forhold til spilleren
  textSize(16);               // Størrelse på teksten
  text(points, x, y);         // Vis point inde i spilleren
}


function RødWASD() {  // RØD SPILLERS CONTROLS vha. WASD-tasterne
  accRød.set(0, 0);   // Nulstil accelerationen for rød spiller

  if (keyIsDown(87)) accRød.y = -0.7; // W-tast
  if (keyIsDown(83)) accRød.y = 0.7;  // S-tast
  if (keyIsDown(65)) accRød.x = -0.7; // A-tast
  if (keyIsDown(68)) accRød.x = 0.7;  // D-tast

  velRød.add(accRød);                                   // Tilføj rød spillers acceleration til hastighed
  velRød.mult(fri);                                     // Anvend rød spillers friktion på hastigheden
  velRød.limit((velMax / (2 * sqrt(radiusRød))) * 10);  // Begræns rød spillers hastighed til velMax
  posRød.add(velRød);                                   // Tilføj rød spillers hastighed til positionen

  posRød.x = constrain(posRød.x, radiusRød, width - radiusRød);   // Begræns rød spiller til at være inden for skærmens x-akse
  posRød.y = constrain(posRød.y, radiusRød, height - radiusRød);  // Begræns rød spiller til at være inden for skærmen y-akse

  DrawPlayer(posRød.x, posRød.y, radiusRød, color(255, 0, 0), pointRød);  // Tegn rød spiller på skærmen
}


function BlåPILE() {  // BLÅ SPILLERS CONTROLS vha. piletasterne
  accBlå.set(0, 0);   // Nulstil accelerationen for blå spiller

  if (keyIsDown(UP_ARROW)) accBlå.y = -0.7;   // Pil op
  if (keyIsDown(DOWN_ARROW)) accBlå.y = 0.7;  // Pil ned
  if (keyIsDown(LEFT_ARROW)) accBlå.x = -0.7; // Pil venstre
  if (keyIsDown(RIGHT_ARROW)) accBlå.x = 0.7; // Pil højre

  velBlå.add(accBlå);                                   // Tilføj blå spillers acceleration til hastighed
  velBlå.mult(fri);                                     // Anvend blå spillers friktion på hastigheden
  velBlå.limit((2.6 / (2 * sqrt(radiusBlå))) * 10);     // Begræns blå spillers hastighed til velMax
  posBlå.add(velBlå);

  posBlå.x = constrain(posBlå.x, radiusBlå, width - radiusBlå);  // Begræns blå spiller til at være inden for skærmens x-akse
  posBlå.y = constrain(posBlå.y, radiusBlå, height - radiusBlå); // Begræns blå spiller til at være inden for skærmens y-akse

  DrawPlayer(posBlå.x, posBlå.y, radiusBlå, color(0, 0, 255), pointBlå);  // Tegn blå spiller på skærmen
}


function TegnBlobs() {  // Tegner blobs på skærmen
  noStroke();           // Ingen kantlinje på blobs, så spillere og blobs ikke forveksles
  for (let i = 0; i < blobdata.length; i++) {                             // Gennemgå alle blobs i arrayet fra bund til top.
    fill(blobdata[i].color.r, blobdata[i].color.g, blobdata[i].color.b);  // Farve på blobs ud fra tilfældige RGB-værdier
    ellipse(blobdata[i].x, blobdata[i].y, blobdata[i].r * 2);             // Tegn blobben som en cirkel ud fra dens data.
  }
}


function SpisBlobs() {  // Tjekker om spillerne spiser de små blobs
  for (let i = blobdata.length - 1; i >= 0; i--) {
    // Tjekker om rød spiller spiser blobben:
    if (dist(posRød.x, posRød.y, blobdata[i].x, blobdata[i].y) < Math.abs(radiusRød - blobdata[i].r / 2) / 1.02) {
      blobdata.splice(i, 1);    // Fjern blobben fra arrayet
      pointRød++;               // Øg rød spillers point med 1
      radiusRød += 1;           // Øg rød spillers radius med 1
      lyd_spisB.setVolume(0.3); // Sænk lydstyrken
      lyd_spisB.play();         // Spil spis-lyd
    }
    // Tjekker om blå spiller spiser blobben:
    else if (dist(posBlå.x, posBlå.y, blobdata[i].x, blobdata[i].y) < Math.abs(radiusBlå - blobdata[i].r / 2) / 1.02) {
      blobdata.splice(i, 1);    // Blobben fjernes fra arrayet
      pointBlå++;               // Øg blå spillers point med 1
      radiusBlå += 1;           // Øg blå spillers radius med 1 
      lyd_spisB.setVolume(0.3); // Sænk lydstyrken
      lyd_spisB.play();         // Spil spis-lyd
    }
  }
}  

function SpisSpillere() {   // Tjekker om spillerne spiser hinanden
  if (dist(posRød.x, posRød.y, posBlå.x, posBlå.y) < Math.abs((radiusBlå - radiusRød)/0.5)) {  // Hvis de er tættere end 0.5x radius-forskellen, så spis
    CheckWinner(); // Så opsluges den mindre spiller, og der tjekkes hvem der er størst, og vinderen afgøres
  }
  
  if (radiusRød > 20 && radiusBlå > 20) { // Hvis begge spillerne er større end 20, gør det lettere at spise hinanden
    if (dist(posRød.x, posRød.y, posBlå.x, posBlå.y) < Math.abs((radiusBlå - radiusRød)/0.20)) {  // Hvis de er tættere end 0.2x radius-forskellen
      CheckWinner(); // Så opsluges den mindre spiller, og der tjekkes hvem der er størst, og vinderen afgøres
    }
  }

  if (ErIHjørne(posRød.x, posRød.y, radiusRød)) {
    if (ErIHjørne(posBlå.x, posBlå.y, radiusBlå)) { // Hvis blå og rød er i hjørnet
      CheckWinner(); // Så opsluges den mindre spiller, og der tjekkes hvem der er størst, og vinderen afgøres
    }
  }
} // Hverken blå eller rød er i hjørnet - vend tilbage til draw

function ErIHjørne(x, y, r) {
  return (
    dist(x, y, 0, 0) <= r ||       // Top-left corner
    dist(x, y, 600, 0) <= r ||    // Top-right corner
    dist(x, y, 0, 600) <= r ||    // Bottom-left corner
    dist(x, y, 600, 600) <= r     // Bottom-right corner
  );
}


function CheckWinner() {        // Tjekker hvem der har opslugt den anden spiller
  if (radiusRød > radiusBlå) {  // 1: Hvis rød spiller er større end blå spiller
    win = "Red wins!";          //    Sæt vinderen til rød spiller
  }
  else if (radiusBlå > radiusRød) { // 2: Hvis blå spiller er større end rød spiller
    win = "Blue wins!";             //    Sæt vinderen til blå spiller
  }
}


function DisplayWinner() {          // Viser vinderen på skærmen
  lyd_displayWinner.setVolume(0.1); // Sænk lydstyrken
  lyd_displayWinner.play();         // Spil resultat-lyd
  background(50);                   // Baggrundsfarve sættes til mørk grå
  fill(255);                        // Tekstfarve sættes til hvid
  textSize(50);                     // Størrelse på teksten
  textAlign(CENTER, CENTER);        // Centrer teksten i forhold til vinduet
  text(win, width / 2, height / 2); // Vis vinderen i midten af skærmen
  noLoop();                         // Stop mildertidigt spillet fra at loope
  genstartKnap = createButton("Play again");  // Opret knappen til at starte spillet igen
  genstartKnap.size(100, 30);                 // Størrelse på knappen
  genstartKnap.position(width / 2 - 50, height / 2 + 50); // Placer knappen i midten, lige under teksten
  genstartKnap.mousePressed(StartSpil);       // Når knappen trykkes, startes spillet igen
}

function StartSpil() {  // Funktion til at starte spillet igen
  genstartKnap.hide();  // Fjern genstart-knappen

  lyd_startGame.setVolume(0.3); // Sænk lydstyrken
  lyd_startGame.play(); // Spil start-lyd

  pointRød = 0;         // Reset point for rød spiller
  pointBlå = 0;         // Reset point for blå spiller
  win = false;          // Reset så ingen har vundet
  radiusRød = 15;       // Reset radius af rød spiller
  radiusBlå = 15;       // Reset radius af blå spiller
  StartPos();           // Start spillet igen
  loop();               // Start spillets loop igen
}
