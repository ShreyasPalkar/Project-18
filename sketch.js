var player,PlayerImg,ground,banana,BananaImage;
var obstacles,stone;
var backimage,Backimage;
var survivalTime;
var bananaGroup,obstacleGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  backimage = loadImage("jungle.jpg"); PlayerImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png", "Monkey_08.png","Monkey_09.png","Monkey_10.png");

  BananaImage = loadImage( "banana.png");

  stone = loadImage("stone.png");
}

function setup() {
  
  createCanvas(400, 400);

  var survivalTime=0;
  
  Backimage = createSprite(200,200,20,20);
  Backimage.addImage("image",backimage);
  Backimage.velocityX=-4;
  
 

  
  player = createSprite(100,340,20,50);
  player.addAnimation("running",PlayerImg); 
  player.scale=0.1;
  
  ground = createSprite(400,395,800,50);
  ground.x = ground.width /2;
  ground.velocityX=-4;
  ground.visible=false;
  
  
  
 
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

}

function draw() {
  background(220);
 
  
 player.collide(ground); 
  
  if(gameState === PLAY){
  if(keyDown("space") && player.y >= 300){
    player.velocityY = -15; 
  }
  
  if (Backimage.x<0) {
    Backimage.x=400;
}
  
  player.velocityY = player.velocityY + 0.8;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(obstacleGroup.isTouching(player)){
    player.scale=0.2;
  }else {
    gamestate = END;
  }
    
  if(bananaGroup.isTouching(player)){
   banana.visible=false;
     }
    
  

  food();
  
  Obstacles();
  
  stroke ("black") ;
  textSize (20) ;
  fill ("black") ;
  survivalTime=Math.ceil(frameCount/ frameRate());
  text ( "SurvivalTime:"+ survivalTime, 100,50) ;
    
    switch(survivalTime){
case 10: player . scale=0.12;
break;
case 20: player . scale=0.14;
break;   
case 30: player . scale=0.16;

break;
case 40: player . scale=0.18;
break;
default: break;
    }
  }else if(gameSate===END){
  
    
    backImage.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
    drawSprites();
   

}

function food(){
  if (World.frameCount % 80 == 0){
    banana = createSprite(400,random(190,350),20,20);
    banana.addImage("BananaImage",BananaImage);
    banana.scale=0.05;
    banana.velocityX=-4;  
    banana.lifetime=500;
     bananaGroup.add(banana);
}
  
}

function Obstacles(){
  if (World.frameCount % 300 == 0){
    obstacles = createSprite(400,350,20,20);
    obstacles.addImage("stone",stone);
    obstacles.velocityX=-4;
    obstacles.scale=0.2;
    obstacles.lifetime=500;
    obstacleGroup.add(obstacles);
}
}
  