
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var forest, forestImage;
var girl, girl_running;

var zombie, zombie_running;
var rocksGroup, rockImage;
var powersGroup, power1, power2, power3;
var score;


function preload(){

  girl_running = loadImage("girl.png");
  zombie_running = loadImage("zombie.png");
  forestImage = loadImage("background.png");
  
  
  
  rockImage = loadImage("rock.png");
  
  power1 = loadImage("power1.png");
  power2 = loadImage("power2.png");
  power3 = loadImage("power3.png");

  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
 
  
  
  
}

function setup() {
    createCanvas(500,200);
 
 
    girl = createSprite(70,160,20,50);
    girl.addImage("running" ,girl_running);
   girl.scale = 0.2;

   zombie = createSprite(50,160,20,50)
   zombie.addImage("running" ,zombie_running);
   zombie.scale = 0.4;
  

  
    forest = createSprite(0,0,600,700);
   forest.addImage("forest",forestImage);
  forest.x = forest.width /2;


 gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  

  powersGroup = createGroup();
  rocksGroup = createGroup();
  
  console.log("Hello" + 5);
  
  girl.setCollider("circle",0,0,40);
  girl.debug = false
  
  score = 0;
  
}

 

function draw() {
  background(180);
   //displaying score
   text("Score: "+ score, 500,50);
   console.log("this is ",gameState)
   
   
   if(gameState === PLAY){
    
     gameOver.visible = false;
     restart.visible = false;
     
     forest.velocityX = -(4 + 2* score/100)
     //scoring
     zombie.velocityX= -(2 + 2* score/100)
     score = score + Math.round(frameCount/60);

     if (forest.x <0){
      forest.x = forest.width/2;
     }
     if(keyDown("space")&& girl.y >= 100) {
      girl.velocityY = -12;

     
  }
  
  //add gravity
  girl.velocityY = girl.velocityY + 0.8

 
  spawnRocks();

  
  spawnPowers();
  
  if(rocksGroup.isTouching(girl)||zombie.isTouching(girl)){
      gameState = END;

      
  }
  if(powersGroup.isTouching(girl))
 {
   score=score+1;
  

 }
}
 else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   
    forest.velocityX = 0;
    girl.velocityY = 0
    zombie.velocityX=0

    powersGroup.setLifetimeEach(-1);
    rocksGroup.setLifetimeEach(-1);
     
     powersGroup.setVelocityXEach(0);
     rocksGroup.setVelocityXEach(0);
 }
girl.collide(invisibleGround);
  
     if(mousePressedOver(restart)){
   reset();
     }
     
     drawSprites();
   
 }

function reset(){
  gameState=PLAY;
  powersGroup.destroyEach();
  rocksGroup.destroyEach();
  score=0;
}
function spawnPowers(){
 if (frameCount % 60 === 0){
   var power = createSprite(400,185,10,40);
   power.velocityX = -(6 + score/100);
   
 
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: power.addImage(power1);
              break;
      case 2: power.addImage(power2);
              break;
      case 3: power.addImage(power3);
              break;
      default: break;
    }
   
     
   power.scale = 0.05;
    power.lifetime = 300;
   

    powersGroup.add(power);
 }
}

function spawnRocks() {

  if (frameCount % 60 === 0) {
     rock = createSprite(450,170,40,10);
    rock.y = Math.round(random(450,190));
    rock.addImage(rockImage);
   rock.scale = 0.05;
    rock.velocityX = -3;
    
     //assign lifetime to the variable
    rock.lifetime = 200;
    
    //adjust the depth
   rock.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
   
   rocksGroup.add(rock);
    }
  }

