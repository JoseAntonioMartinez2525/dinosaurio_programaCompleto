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
// Declarar variable para llevar el puntaje
let score = 0;

// Declarar variable para llevar las vidas
let lives = 3;

// Declarar arreglo para almacenar los enemigos
let enemies = [];
let gameOver = false;

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

// Crear enemigos y agregarlos al arreglo
for (let i = 0; i < 3; i++) {
    let enemy = new Exeggutor(eggImg);
    enemies.push(enemy);
  }

  for (let i = 0; i < 2; i++) {
    let enemy = new Bird(random(width), random(height), birdImg);
    enemies.push(enemy);
  }
    
}

function draw(){
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

      // Dibujar puntos y vidas
  textSize(32);
  fill(255);
  text(`Score: ${score}   Lives: ${lives}`, 20, 40);

// Verificar colisión con enemigos
for (let i = 0; i < enemies.length; i++) {
    if (rapidash.isCollidingWith(enemies[i])) {
      // Restar puntos y eliminar enemigo en caso de colisión
      score -= 10;
      enemies.splice(i, 1);
      // Restar una vida al jugador en caso de quedarse sin puntos
      if (score == 0) {
        lives--;
        // Reiniciar el puntaje a 0
        score = 0;
        // Si el jugador se queda sin vidas, mostrar Game Over
        if (lives === 0) {
          gameOver = true;
        }
      }
      // Salir del ciclo for, ya que solo se permite una colisión por frame
      break;
    }
    
  }


  // Generar nuevos enemigos de forma aleatoria
  if (frameCount % 60 === 0) {
    const enemyType = random(['bird', 'exeggutor']);
    if (enemyType === 'bird') {
      enemies.push(new Bird(random(width), random(height), birdImg));
    } else if (enemyType === 'exeggutor') {
      enemies.push(new Exeggutor(eggImg));
    }
  }



  // Mostrar mensaje de Game Over si corresponde
  if (gameOver) {
    textAlign(CENTER);
    textSize(64);
    fill(255, 0, 0);
    text('GAME OVER', width / 2, height / 2);
  }
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
    if (gameOver && key === "r") {
        score = 0;
        lives = 3;
        enemies = [];
        bird = new Bird(random(width), random(height), birdImg);
        loop();
        gameOver = false;
      }
}

function keyReleased(){
    if(key === 'd' || keyCode === RIGHT_ARROW || key === 'a' || keyCode === LEFT_ARROW) {
        rapidash.vx = 0; // reiniciar la velocidad en x al soltar las teclas
    }
}

