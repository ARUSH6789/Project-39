var player, player_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground,backImage;
var invisibleGround;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload() {


  player_running = loadAnimation("Monkey_01.png" ,"Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage = loadImage("jungle.jpg");
  

}



function setup() {
  createCanvas(600, 600);

  ground = createSprite(300, 150, 600, 10);
  ground.velocityX = -6;
  ground.addImage("img",backImage);
  //ground.x = ground.width /2;
  console.log(ground.width)
  ground.scale = 1.5;
  
  player = createSprite(50, 560, 20, 50);
  player.addAnimation("monkey", player_running);
  player.scale = 0.2;
  
  invisibleGround = createSprite(200,590,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();


}




function draw() {
  background(220);
  
  
  if(gameState === PLAY){
  if(ground.x<0) {
    ground.x = 500;
  }
  
  if(keyDown("space")) {
    player.velocityY = -12;
  }
  
  player.velocityY = player.velocityY + 0.8;

 
  
  
  
  switch(score){
    case 10 : player.scale = 0.12;
      break;
    case 20 : player.scale = 0.14;
      break;
    case 30 : player.scale = 0.16;
      break;
    case 40 : player.scale = 0.18;
      break;
    default : break;
  }
  
  if(obstacleGroup.isTouching(player)) {
    player.scale = 0.1;
   }
  
  
  
 food();
 spawnObstacles();
 
stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate())
  text("survival Time : " + survivalTime,100,50);

  


  camera.position.x = player.x;
  camera.position.y = player.y;

  if(player.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 2;
 }

 if(player.isTouching(obstacleGroup)){
      gameState = END;
 }

  drawSprites();
  //text("Score: "+ score, 200,camera.position.x +300);
}


 if(gameState === END){

  stroke("black");
  textSize(60);
  fill("black");
  text("Game Ends", 10,500)
  console.log("Game Ends");
}

player.collide(invisibleGround);
stroke("black");
textSize(30);
fill("black");
text("Score: "+ score, 200,camera.position.x +300);



}
function food() {
if(World.frameCount % 80 == 0){
  banana = createSprite(600,530,40,10);
  banana.addImage("banana",bananaImage);
  banana.y = Math.round(random(200,530));
  banana.velocityX = -3;
  banana.scale = 0.2;
  banana.lifetime = 200;
  bananaGroup.add(banana);
  
}
}

function spawnObstacles(){
//if(camera.position.y> 100){}
if(camera.position.x < 170 && frameCount % 300 === 0){
  obstacle = createSprite(600,550,10,40);
  obstacle.addImage("otry",obstacleImage);
  
 
  var rand = Math.round(random(1,6));
    obstacle.velocityX = -6;
    obstacle.scale = 0.2;
    obstacle.setLifetime = 50;
  
  obstacleGroup.add(obstacle);

  
 
}
}










  
    
