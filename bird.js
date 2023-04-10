class Bird {
  constructor(x, y, img, wingImages) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.img = img;
    this.wingImages = wingImages && wingImages.length ? wingImages : [img];
    this.currentWingIndex = 0;
    this.lastWingFlapTime = 0;
    this.wingFlapInterval = 200; // milisegundos
  }

  draw() {
    // Cambiar la imagen de aleteo de alas cada cierto tiempo
    if (millis() - this.lastWingFlapTime > this.wingFlapInterval) {
      this.currentWingIndex = (this.currentWingIndex + 1) % this.wingImages.length;
      this.lastWingFlapTime = millis();
    }

    // Dibujar la imagen del pájaro en la posición x y y
    image(this.wingImages[this.currentWingIndex], this.x, this.y);
  }

  update() {
    // Actualizar la posición x restando la velocidad en x
    this.x -= this.vx;

    // Limitar la posición x para que no se salga de la pantalla
    this.x = constrain(this.x, 0, width);

    // Cambiar la velocidad en x al presionar la tecla "izquierda"
    if (random(LEFT_ARROW)) {
      this.vx = 5;
    } else {
      this.vx = 0;
    }
  }

  moveLeftRandom() {
    // Establecer una velocidad en x negativa aleatoria
    this.vx = random(-5, -1);
  }
}