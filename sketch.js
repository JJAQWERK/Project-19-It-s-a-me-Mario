//All sound effects and sprites used in this game are the property of Nintendo.
//I do not own any of the sounds or sprites used in this game.
//Enjoy!!

//variables for images and sounds
var Mario, MarioRunning;
var ground,groundImg,invbleGround;
var PLAY=1;
var END=0;
var gameState = PLAY;
var score=0;
var vector, vectorImg;
var turtle, turtleImg;
var monsterGroup
var gameOver,gameOverImg, restart, restartImg, death, deathImg
let jumpSound,theme,checkpointSnd,deathSnd;

function preload(){

//for loading images
  MarioRunning = loadAnimation("Mario1.png","Mario2.png","Mario3.png","Mario4.png","Mario5.png");
  groundImg = loadImage("BackGround.jpg");
  vectorImg = loadImage("vector goomba.png");
  turtleImg = loadImage("turtle.png");
  deathImg = loadAnimation("death.png");
  restartImg = loadImage("reset.png");
  gameOverImg = loadImage("gameover.png");

//for loading sound effects
  theme = loadSound("01-main-theme-overworld.mp3");
  jumpSound = loadSound("maro-jump-sound-effect_1.mp3");
  checkpointSnd = loadSound("smb_1-up.wav");
  deathSnd = loadSound("smb_mariodie.wav");



  
  

  
}

function setup() {

  //playing theme music
  theme.play();
  theme.loop();

  //for creating canvas
  createCanvas(600,200);

  //for creating sprites
  ground = createSprite(300,50)
  ground.addImage("ground",groundImg);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/170);

  invbleGround = createSprite(300,190,600,20);
  invbleGround.visible=false;

  Mario = createSprite(60,190,20,50);
  Mario.addAnimation("running", MarioRunning);
  Mario.addAnimation("collided",deathImg);
  Mario.scale = 0.25;

  gameOver = createSprite(300,70);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.09

  restart = createSprite(300,110)
  restart.addImage(restartImg);
  restart.scale = 0.1; 

  //setting score
  score = 0;
 
  //for new group
  monsterGroup = new Group()


}

function draw() {
  //setting background colour
  background(255);
  
  //set to play state
  if (gameState===PLAY){

   

 //fpr hiding gameover and restart sprites
 gameOver.visible=false;
 restart.visible=false;



 
 //for increasing score and velocity of ground
 score = score + Math.round(getFrameRate()/60);
 ground.velocityX = -(6 + 3*score/500);
  
 //for jumping
 if(keyDown("space") && Mario.y >= 130) {
  Mario.velocityY = -12;
  }
 if(keyWentDown("space") && Mario.y >= 130) {
  Mario.velocityY = -12;
  jumpSound.play();
  }

  //playing sound if reaching 100 score
 if(score>0 && score%100 === 0){
  checkpointSnd.play() 
  }

 //for gravity
 Mario.velocityY = Mario.velocityY + 0.7;

 //for infinite background
 if (ground.x < 300){
  ground.x = ground.width/2;
  }

 //for mario to land in ground 
 Mario.collide(invbleGround);

 //for spawning monsters
 spawnMonsters();

  //for making gamestate to end after touching monsters
  if(Mario.isTouching(monsterGroup)){
  deathSnd.play();
  gameState=END;
  Mario.changeAnimation("collided",deathImg);
  }
   
}

//gamestate is end
else if (gameState === END){

  //for showing the restart and gameover sprites
  gameOver.visible = true;
  restart.visible = true;
  
  //for stopping theme after gameover
  theme.stop();
  
  //stopping all moving items
  ground.velocityX = 0;
  Mario.velocityY = 0;
  monsterGroup.setVelocityXEach(0);
  
  //for setting lifetime for monsters to prevent memory eak
  monsterGroup.setLifetimeEach(-1);
 
  //when mouse is pressed over restart sprite game state goes to play 
  if(mousePressedOver(restart)) {
    reset();
  }
      
}

  //for drawing sprites
  drawSprites();
  
  //for displaying score
  text("Score: "+ score, 500,50);

}

//function for spawning monsters
function spawnMonsters(){

  if (frameCount % 60 === 0 ){
  var monsters = createSprite(600,170,10,40);

  monsters.velocityX = -12


  var rand = Math.round(random(1,2));
  switch(rand) {
    case 1: monsters.addImage(turtleImg);
            break;
    case 2: monsters.addImage(vectorImg);
            break;
   default: break
          }

   monsters.lifetime = 300;

   monsterGroup.add(monsters)

   monsters.scale=1.5
   
  }
}

// function for restting game
function reset(){

  theme.play();

  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  monsterGroup.destroyEach();
  
  Mario.changeAnimation("running",MarioRunning);

  score=0;

  monsterGroup.destroyEach();

  
}

