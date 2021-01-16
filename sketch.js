var PLAY = 1;
var END=0;
var gameState=1;
var monkey , monkey_running;
var bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 300);

  
  monkey= createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,250,900,10);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  console.log(ground.x);
  score=0;
  
  FoodGroup = createGroup();   
 obstacleGroup = createGroup();
  
  
}


function draw() {
  background("lightblue");
  
  if (ground.x<0){
    
    ground.x = ground.width /2;
  }
  
    text("Score: "+ score, 500,50);
  
  if(keyDown("space")) {
        monkey.velocityY = -12;}
  
  monkey.velocityY=monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if(gameState === PLAY){
    
    if(monkey.isTouching(FoodGroup)){
      score=score+1;
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  
   // obstacle();
    
    if(obstacleGroup.isTouching(monkey)){
       //trex.velocityY = -12;
       gameState = END;
      
      
    }
  food();
  obstacle();
 drawSprites();
  
}
}


function food(){
  
  if (frameCount % 60 === 0) {
  var   banana = createSprite(600,120,40,10);
  banana.y = Math.round(random(80,120));
  banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth =monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
    
  }
}
  
function obstacle(){
  
  if (frameCount % 60 === 0){
  var obstacle = createSprite(600,165,10,40);
  // obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(6 + score/100);
   
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}