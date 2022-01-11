var trex, trex_running, edges,trex_collided;
var groundImage;
var ground; 
var invisibleGround;
var cloud;
var ob1, ob2,ob3,ob4,ob5,ob6;
var group1 , group2;
var PLAY = 1 
var END = 0 
var gamestate = 1


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloud = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);
  
  group1 = new Group();
  group2 = new Group(); 
 


  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  

  trex.scale = 0.5;

  ground = createSprite(300,180,600,20);
  ground.addImage("Ground",groundImage);
  
  invisibleGround = createSprite(50,195,20,10)
  invisibleGround.visible = false;
}


function draw(){
  
  background("black ");
  
   trex.setCollider("rectangle",0,0,100,90);
   trex.debug = false;


  console.log(Math.round(getFrameRate()))
  if(gamestate == PLAY) {
    if(keyDown("space")&& trex.y >= 166.5){
      trex.velocityY = -10;
    }
    
    if(ground.x < 0) {
      ground.x = ground.width/2;
    }
  
    trex.velocityY = trex.velocityY + 0.5;
    
    ground.velocityX =  -4;

    spawnClouds();
    cactos();
    
    if(group1.isTouching(trex)) {
      gamestate = END;
      



    }
     
    



  }
  else if(gamestate == END){
    group2.setLifetimeEach(-1);
    group1.setLifetimeEach(-1);
    ground.velocityX = 0;
    group1.setVelocityXEach(0);
    group2.setVelocityXEach(0);
    trex.velocityY = 0;    
    trex.changeAnimation("a",trex_collided);
  }
 
  trex.collide(invisibleGround);


  
  drawSprites();
}

function spawnClouds() {
  
 if(frameCount%60 == 0){
  var clouds = createSprite(600,50,20,20);
  clouds.velocityX = -6;
  group2.add(clouds);
  clouds.depth = trex.depth -1
  clouds.addImage(cloud);
  clouds.scale = 0.5
  clouds.y = Math.round(random(20,70))
  clouds.lifetime = 100;
 }
  
}

function cactos(){
 if(frameCount%70 ==0){
   var cacto = createSprite(600,170,20,30)
   cacto.velocityX = -4;
   group1.add(cacto);
   var numimg = Math.round(random(1,6));
   switch(numimg){
   case 1: cacto.addImage(ob1);
   break;
   
   case 2: cacto.addImage(ob2);
   break;


   case 3: cacto.addImage(ob3);
   break;


   case 4: cacto.addImage(ob4);
   break;



   case 5: cacto.addImage(ob5);
   break;


   case 6: cacto.addImage(ob6);
   break;


   default:
   break;
   
   }
   cacto.lifetime = 200;
   cacto.scale = 0.5

   }
}

