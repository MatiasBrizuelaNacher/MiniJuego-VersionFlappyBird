//Objetos
class wall{
    constructor(x,h){
        this.x=x+400;
        this.y=0;
        this.w=25;
        this.h=h;        
    }

    mostrar(){
        rect(this.x,this.y,this.w,this.h);
        rect(this.x,this.h+hPuerta,this.w,width-this.h-hPuerta);
    }

    mover(){
        this.x-=1;
        if(this.x==-this.w){
            this.x=width;
            this.h=random(height-hPuerta);
        }
    }
}

class player{
    constructor(){
        this.x=30;
        this.y=height/2;
        this.vidas=3;
    }

    movimiento(cont){
        if(cont<=0){
            if(this.y<=height-10){
                this.y+=2;
                ellipse(this.x ,this.y , 20, 20);
                return 0; 
            }else {
                ellipse(this.x ,this.y , 20, 20);
                noLoop();
            }
        }else{
            if(this.y>=10){
                this.y-=2;
                cont--; 
                ellipse(this.x ,this.y , 20, 20);
                return cont;
            }else{
                ellipse(this.x ,this.y , 20, 20);
                noLoop();
            }
        }
    }

    colision(walls){
        if(this.x > walls[0].x-10  && this.x < walls[0].x+35){
            if(this.y > walls[0].h+10  && this.y <walls[0].h+hPuerta-10){
                return false;  
              }else return true;
        }

        if(this.x > walls[1].x-10  && this.x < walls[1].x+35){
            if(this.y > walls[1].h+10  && this.y <walls[1].h+hPuerta-10){
                return false;  
              }else return true;
        }

        if(this.x > walls[1].x-10  && this.x < walls[1].x+35){
            if(this.y > walls[2].h+10  && this.y <walls[2].h+hPuerta-10){
                return false;  
              }else return true;
        }
    }

    contadoDeVida(colision,cont){
        //Cuando colisiona se resta una vida y el contador -1;
        if(colision){
            this.vidas--;
            console.log(this.vidas)
            if(this.vidas==0){
                noLoop();
            }
            cont--;
        }
        return cont;
    }
}

//Variables y objetos
let width=575;
let height=400;
let hPuerta=70;
let myWalls;
let aPlayer=new player();
let contColision=0;
let framesInvul=50; //cantidad de frame de invulneravilidad

function setup() {
    createCanvas(width, height);
  }

  function draw() {
    //Fondo
    background(0);
    //Se instancian las paredes(hago aca porque el alcance de la funcion random)
    if(myWalls==null){
        myWalls=[new wall(0,random(height-hPuerta)),new wall(200,random(height-hPuerta)),new wall(400,random(height-hPuerta))];
    }

    //Movimiento de las paredes
    myWalls.forEach(myWall => {
        fill(174,167,160);
        myWall.mostrar();
        myWall.mover();
    });

    //Jugador
    fill(250);
    contColision=aPlayer.movimiento(contColision);
    //Si 50 frame dura la invunerabilidad, cuando colisiona empieza la cuenta regresiva de 50 frame hasta poder resivir daño de nuevo
    if(framesInvul==50){
        framesInvul=aPlayer.contadoDeVida(aPlayer.colision(myWalls),framesInvul);
        console.log(framesInvul)
    }else{
        console.log(framesInvul)
        if(framesInvul==0){
            framesInvul=50;
        }else{
            framesInvul--;
        } 
    }
  }

  function keyPressed() {
    if (key === ' ') {
        contColision=25;
    }else if(key === 'r'){
        window.location.reload();
    }
  }
