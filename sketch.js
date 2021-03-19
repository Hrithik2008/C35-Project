var balloon,balloon_img,bg,database,position;

function preload(){
  balloon_img = loadImage("images/hab.png");
  bg = loadImage("images/bg.jpg");
}

function setup() {
  createCanvas(1240,560);
  balloon = createSprite(200,400,50, 50);
  balloon.addImage(balloon_img);
  balloon.scale = 0.6;
  database = firebase.database();
  var nodes = database.ref("balloon/position");
  nodes.on("value", readData,()=>console.error("Error"));
}

function draw() {
  background(bg);
  textSize(32);
  fill(200,0,250);
  stroke(55,255,5);
  strokeWeight(5);
  text("**Use arrow keys to move the hot air balloon",10,40)  
  if (keyDown(LEFT_ARROW)) {
    writeData(-10, 0);
    balloon.scale += 0.002;
  } else if (keyDown(RIGHT_ARROW)) {
    writeData(10, 0);
    balloon.scale -= 0.002;
  } else if (keyDown(UP_ARROW)) {
    writeData(0, -10);
    balloon.scale -= 0.01;
  } else if (keyDown(DOWN_ARROW)) {
    writeData(0, +10);
    balloon.scale += 0.01;
  }
  drawSprites();
}

function writeData(x, y) {
  database.ref("balloon/position").set({
    x: position.x + x,
    y: position.y + y,
  });
}

function readData(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}