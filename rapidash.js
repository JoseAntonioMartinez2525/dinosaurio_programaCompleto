const jumpHeight = 20;

class Rapidash{
    constructor(img){
        this.img = img;
        this.x = 0;
        this.s = 100;
        this.y = height - this.s;
        this.vy = 0;
        this.vx = 0;
        this.gravity = 2;
        this.jumping = false; // añadimos un atributo jumping para controlar el salto
    }

    draw(){
        image(this.img,this.x,this.y,this.s,this.s);
    }

    jump(){
        if(!this.jumping){ // si no está saltando
            this.vy = -35; // cambiamos la velocidad vertical
            this.jumping = true; // indicamos que está saltando
        }
    }

    moveRight(){
        this.vx = 5;
    }

    moveLeft(){
        this.vx = -5;
    }    

    update(){
        // controlamos el salto
        if(this.jumping){
            this.y += this.vy;
            this.vy += this.gravity;
            if(this.y > height - this.s){ // si cae al suelo
                this.y = height - this.s; // la posición es el suelo
                this.jumping = false; // ya no está saltando
            }
        }
        // actualizamos la posición en x
        this.x += this.vx;

        // limitamos la posición en x para que no se salga de la pantalla
        this.x = constrain(this.x, 0, width - this.s);

        // reiniciamos la velocidad en x si se llega al borde
        if(this.x === 0 || this.x === width - this.s){
            this.vx = 0;
        }

}
       //Colision
       collision(any) {
        // Comprobamos si colisiona con algo
        if (
          this.x + this.s * 2 >= any.x &&
          this.x <= any.x + any.width &&
          this.y + this.s * 2 >= any.y
        ) {
          
          return console.log("Has chocado");
        } else {
          return false;
        }
      }
}
