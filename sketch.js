let bgImg;
let x = 0;
let y = 0;
let bg1; 
let bg2;
let rapidashImg;
let rapidash;
let eggImg;
let exeggutor;
let birdImg;
let bird;
let score = 0;

const SPACE_KEY = 32;

function preload(){
    bgImg = loadImage('assets/bg.png');
    rapidashImg = loadImage('assets/rapidash.png');
    eggImg = loadImage('assets/exeggutor.png');
    birdImg = loadImage('assets/lugia 1.png');
    birdWingImgs = [loadImage('assets/lugia 2.png'), loadImage('assets/lugia 2.png')];

}

function setup(){
    createCanvas(windowWidth, windowHeight);
    bg1 = new Bg(bgImg, 0);
    bg2 = new Bg(bgImg, width);
    rapidash = new Rapidash(rapidashImg);
    exeggutor = new Exeggutor(eggImg);
    bird = new Bird(random(width), random(height), birdImg);
}

function draw(){
    background("white");
    bg1.draw();
    bg2.draw();
    rapidash.draw();
    exeggutor.draw();
    bird.draw();

    bg1.scroll();
    bg2.scroll();
    rapidash.update();
    exeggutor.update();
    bird.update();

    checkCollision(rapidash, bird); // Verificar colisión con ave
    checkCollision(rapidash, exeggutor); // Verificar colisión con planta

    textSize(32);
    fill(255);
    text("Score: " + score, 10, 30);
    
}

function keyPressed(){
    if(key === ' ' || key === 'w' || keyCode === UP_ARROW) { // si se presiona la tecla espacio o w
        rapidash.jump(); // saltar
    }

    if(key === 'd' || keyCode === RIGHT_ARROW) { // si se presiona la tecla d o la flecha derecha
        rapidash.moveRight(); // mover a la derecha
    }

    if(key === 'a' || keyCode === LEFT_ARROW) { // si se presiona la tecla a o la flecha izquierda
        rapidash.moveLeft(); // mover a la izquierda
    }
}

function keyReleased(){
    if(key === 'd' || keyCode === RIGHT_ARROW || key === 'a' || keyCode === LEFT_ARROW) {
        rapidash.vx = 0; // reiniciar la velocidad en x al soltar las teclas
    }
}

function checkCollision(rapidash, enemy) {
    if (collideRectRect(rapidash.x, rapidash.y, rapidash.width, rapidash.height, 
        enemy.x, enemy.y, enemy.width, enemy.height)) {
            
            noLoop();
            textSize(32);
            fill(255);
            text("Game Over", width/2, height/2);
          } else if (rapidash.x > enemy.x + enemy.width) {
            // Dinosaurio supera el enemigo
            score += 10;
          }
  }
