var manImg, man;
var background_jungleImg, background_jungle;
var monkeyImg, monkey;
var rock, rockImg;
var iv1;
var rockGroup;
var play = 1, end = 0;
var gameState = play;

function preload(){
    manImg = loadAnimation("man_1.png", "man_2.png", "man_3.png", "man_4.png");
    background_jungleImg = loadImage("jungle background.png");
    monkeyImg = loadAnimation("monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png");
    rockImg = loadImage("rockImg.png");
    manCollided = loadAnimation("man_2.png");
    monkeyCollided = loadAnimation("monkey_1.png")
}

function setup() {
    createCanvas(1000, 600);

    background_jungle = createSprite(0, 0, 1000, 600);
    background_jungle.addImage(background_jungleImg);
    background_jungle.scale = 2.5;
    background_jungle.velocityX = -5;

    man = createSprite(400, 400, 30, 30);
    man.addAnimation("running", manImg);
    man.scale = 0.5;
    man.addAnimation("collided", manCollided)

    monkey = createSprite(50, 400, 100, 100);
    monkey.addAnimation("chasing", monkeyImg);
    monkey.addAnimation("collided", monkeyCollided)
    monkey.scale = 1.5
    

    iv1 = createSprite(400, 460, 100, 10);
    iv1.visible = false;

   

    rockGroup = createGroup()

}

function draw() {
    background(255);
    if(gameState == play){
    if(background_jungle.x < 0){
        background_jungle.x = background_jungle.width/2;
    }

    if(keyDown(UP_ARROW) && man.y >= 350){
        man.velocityY = -19;
    }
    man.velocityY = man.velocityY + 0.8;

    if(rockGroup.isTouching(man)){
        gameState = end;
    }
    


    spawn_rocks();
}
    if(gameState == end){
        background_jungle.velocityX = 0;
        rockGroup.setVelocityXEach(0);
        man.changeAnimation("collided")
        monkey.changeAnimation("collided")
    }
    man.collide(iv1);
    
    drawSprites();
}

function spawn_rocks(){
    if(frameCount % 350 == 0){
        rock = createSprite(1000, 450, 2, 2);
        rock.scale = 0.20;
        rock.addImage(rockImg);
        rock.velocityX = -5.4;
        rockGroup.add(rock);
        rock.lifetime = 400;
        rock.setCollider("circle", 0, 0, 70);
        rock.debug = false;
        rock.depth = monkey.depth;
        monkey.depth = monkey.depth + 1;
    }
}

