
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground, groundImg;
var invisibleg;
var score;
var go, goimg;
var rs, rsimg;
var js, ds;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImg = loadImage("ground2.png");
  goimg = loadImage("gameOver.png");
  rsimg = loadImage("restart.png");
  ds = loadSound("die.mp3");
  js = loadSound("jump.mp3");

}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50, 320, 10, 10);
  monkey.addAnimation("monrun", monkey_running);
  monkey.scale = 0.1;
  //monkey.debug = true;
  monkey.setCollider("circle", 10, 10, 200);
  ground = createSprite(200, 345, 400, 10);
  ground.addImage(groundImg);
  invisibleg = createSprite(200, 350, 400, 10);
  invisibleg.visible = false;
  go = createSprite(200, 200, 20, 20);
  go.addImage(goimg);
  go.scale = 0.5;
  rs = createSprite(200, 100, 20, 20);
  rs.addImage(rsimg);
  rs.scale = 0.5;
  bananaGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
  
  

  
}


function draw() {
 background(200);
 text("SCORE :" + score, 330, 20);
 //var survtime = 0;
// textSize(20);
 //fill("black");
 //survtime = Math.ceil(frameCount/frameRate());
 //text("Survival Time:" + survtime , 10, 10);
  if (gameState === PLAY)
  {
     go.visible = false;
     rs.visible = false;
     ground.velocityX = -(6 + score/5);
     monkey.velocityY = monkey.velocityY + 0.5;
     if (keyDown("space") && monkey.y >= 310)
     {
       monkey.velocityY = -13; 
       js.play();
     }  
     if (frameCount % 80 === 0)
     {
       spawnb();  
     }
     if (monkey.isTouching(bananaGroup))
     {
       score = score + 1;
       bananaGroup.destroyEach();
     }
     if (frameCount % 200 === 0)
     {
       spawnob();
     }
     if (monkey.isTouching(obstacleGroup))
     {
       gameState = END;
     }
     
  } else if (gameState === END)
    {
      ds.play();
      go.visible = true;
      rs.visible = true;
      ground.velocityX = 0;
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      
      
    }
    if (mousePressedOver(rs))
    {
      rst();
    }
  
   if (ground.x < 400)
   {
       ground.x = ground.width/2;
   }  
   monkey.collide(invisibleg);
  
  
  drawSprites();
  
}
function spawnb()
{
  banana = createSprite(370, Math.round(random(150, 330)),   10, 10);
  banana.addImage(bananaImage);
  banana.scale = 0.05;
  banana.velocityX = -(3 + score/3);
  banana.lifetime = 123;
  bananaGroup.add(banana);
}
function spawnob()
{
  obstacle = createSprite(300, 335 ,10, 10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -(4 + score/4);
  obstacle.lifetime = 85;
  obstacleGroup.add(obstacle);
  
}
function rst()
{
  gameState = PLAY;
  go.visible = false;
  rs.visible = false;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
}





