class Exeggutor {
  constructor(img) {
    this.img = img;
    this.s = 100;
    this.x = width - this.s * 2;
    this.y = height - this.s;
    this.vy = 0;
    this.vx = 0;
    this.gravity = 2;
    this.isJumping = false;
  }

  draw() {
    image(this.img, this.x - this.s, this.y, this.s * 2, this.s * 2);
  }

  update() {
    // Actualizamos la posición en x
    this.x += this.vx;

    // Limitamos la posición en x para que no se salga de la pantalla
    this.x = constrain(this.x, 0, width - this.s);

    // Reiniciamos la velocidad en x si se llega al borde
    if (this.x === 0 || this.x === width - this.s) {
      this.vx = -50;
    }

    // Actualizamos la posición en y si el huevo está saltando
    if (this.isJumping) {
      this.y += this.vy;
      this.vy += this.gravity;
      if (this.y >= height - this.s) {
        this.isJumping = false;
        this.y = height - this.s;
      }
    }
  }

  jump() {
    if (!this.isJumping) {
      this.vy = -30;
      this.isJumping = true;
    }
  }

  collision(cactus) {
    // Comprobamos si el huevo colisiona con el cactus
    if (
      this.x + this.s * 2 >= cactus.x &&
      this.x <= cactus.x + cactus.width &&
      this.y + this.s * 2 >= cactus.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
