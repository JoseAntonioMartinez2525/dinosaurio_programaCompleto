class Bg{
  constructor(bgImg,x){
      this.bgImg = bgImg;
      this.x = x;
      this.y = 0;
      this.w = width; 
      this.h = height; 
      this.SCROLL_SPEED = 1;
  }

  draw(){
      image(this.bgImg,this.x,this.y,this.w,this.h);

  }

  scroll(){
      this.x -= this.SCROLL_SPEED

      if(this.x <= -width){
          this.x = width;
      }
  }
}