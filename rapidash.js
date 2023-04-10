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

        this.width = img.width;
        this.height = img.height;
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
 //Agregar método isCollidingWith
        isCollidingWith(other) {
        const x1 = this.x;
        const y1 = this.y;
        const w1 = this.width;
        const h1 = this.height;
        const x2 = other.x;
        const y2 = other.y;
        const w2 = other.width;
        const h2 = other.height;

        if (
        x1 + w1 >= x2 &&
        x1 <= x2 + w2 &&
        y1 + h1 >= y2 &&
        y1 <= y2 + h2
        ) {
        return true;
        } else {
        return false;
        }
    }



collision(other){
    return this.circleCollision(other);
}

rectCollision(other){
    let left = this.x;
    let right = this.x + this.s;
    let top = this.y;
    let bottom = this.y + this.s;

    let eLeft = other.x;
    let eRight = other.x + other.s;
    let eTop = other.y;
    let eBottom = other.y + other.s;

    return !(left >= eRight || right <= eLeft || top >= eBottom || bottom <= eTop);

}

circleCollision(other){
  
    let x1 = this.x + this.s * 0.5;
    let y1 = this.y + this.s * 0.5;

    let x2 = other.x + other.s * 0.5;
    let y2 = other.y + other.s * 0.5;

    return(this.s * 0.5 + other.s * 0.5) >= this.distance(x1,y1,x2,y2);


}

distance(x1,y1,x2,y2){
    const dx = abs(this.x2 - this.x1);
    const dy = abs(this.y2 - this.y1);

    return sqrt(pow(dx,2)+ pow(dy,2));
}

}
