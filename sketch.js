//characters
var zombie,gun,road,bullet,coin

//images
var zombieImage,gunImage,bulletImage,coinImage

//sound
var gunshot

//background
var roadImage

//kill and scores
var kill = 0
var score = 0

//gameState
var gameState = 0

function preload()
{
  zombieImage = loadImage("./assets/zombie.png");
  //heroImage = loadImage("./assets/");
  roadImage = loadImage("./assets/road.png");
  gunImage = loadImage("./assets/gun.png");
  coinImage = loadImage("./assets/coin.png");
  bulletImage = loadImage("./assets/bullet.png");
  
}




function setup() {
  createCanvas(windowWidth,windowHeight);

 road = createSprite(windowWidth/2,600);
 road.addImage(roadImage)
 road.scale = 2
 road.velocityY = -5

 gun = createSprite(displayWidth/2,displayHeight-200)
 gun.addImage("left",gunImage)
 gun.scale = 0.1

 


zombieGroup = new Group()
bulletGroup = new Group()
coinGroup = new Group()
invisibleBottomBorder = createSprite(460,displayHeight-200)
invisibleBottomBorder.visible = false

invisibleBottomBorder2 = createSprite(823,displayHeight-200)
invisibleBottomBorder2.visible = false

}

function draw() {
  background("white")
  gun.collide(invisibleBottomBorder)
  gun.collide(invisibleBottomBorder2)
  

  if(gameState === 0)
  {
    //background loop
    if(road.y<175)
    {
      road.y = 550
    }

    

    //zombie create
    createZombies()

    //coin create
    createCoin()

//collide
if(gun.isTouching(zombieGroup))
{
 gameState = 1
}

if(bulletGroup.isTouching(zombieGroup))
{
  for(var i = 0;i<zombieGroup.length;i++)
  {
    if(bulletGroup.isTouching(zombieGroup))
    {
      zombieGroup[i].destroy()
      
      kill = kill+1
      
    }
  }
}

if(gun.isTouching(coinGroup))
{
  for(var i = 0;i<coinGroup.length;i++)
  {
if(gun.isTouching(coinGroup))
{
  coinGroup[i].destroy()
score = score + 1
}
  }
  
 
}



//controls
if(keyDown("RIGHT_ARROW"))
  {
      gun.x = gun.x + 5
      gun.changeImage("right")
  }

  

  if(keyDown("LEFT_ARROW"))
  {
      gun.x = gun.x - 5
      
  }

  if(keyDown("F"))
  {
    shootBullet()
  }
  textSize(20)
  text("KILLS:"+kill,900,20)
  text("SCORE:"+score,300,20)
  }

  

if(gameState === 1)
{
  gun.destroy()
  zombieGroup.destroyEach()
  bulletGroup.destroyEach()
  road.destroy()
  coinGroup.destroyEach()
  textSize(30)
 text("Game Over",windowWidth/2-50,windowHeight/2-200)
 text("You achived score:" +score,windowWidth/2-100,windowHeight/2-100)
 text("You achived kills:" +kill,windowWidth/2-100,windowHeight/2)
}
drawSprites();


}


function shootBullet()
{
  bullet = createSprite(gun.x-18,displayHeight-290)
  bullet.addImage(bulletImage)
  bullet.velocityY = -5
  bullet.scale = 0.1
  
  bulletGroup.add(bullet)
 // gunshot.play("gunshot.mp3")
}

function createZombies()
{
   if(frameCount%100===0)
    {
        zombie = createSprite(Math.round(random(gun.x-50,gun.x+50)),-20,50,50)
        zombie.addImage(zombieImage)
        zombie.scale = 0.09
        zombie.velocityY = 5
        zombie.lifetime = 500
        zombieGroup.add(zombie)
    
    }
}

function createCoin()
{
  if(frameCount%60===0)
    {
        coin = createSprite(Math.round(random(displayWidth/2,displayHeight-200)))
        coin.addImage(coinImage)
        coin.scale = 0.04
        coin.velocityY = 5
        coin.lifetime = 500
        coinGroup.add(coin)
    
    }
}
