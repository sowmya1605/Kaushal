var canvas, backgroundImage;

var gameState = 0,finishedPlayers;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var passedFinish;
var obstacles;
var s,i;
var form, player, game;

var bikes,B1,B2,B3,B4;
var track, B1_img, B2_img, B3_img, B4_img;

function preload(){

  track = loadImage("images/track.jpg");
  B1_img = loadImage("images/B1.png");
  B2_img = loadImage("images/B2.png");
  B3_img = loadImage("images/B3.png");
  B4_img = loadImage("images/B4.png");
  
  bronze = loadImage("images/bronze.png");
  silver = loadImage("images/silver.png");
  gold = loadImage("images/gold.png");
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  gameState = 0;
  distance = 0;
  finishedPlayers = 0;
  yVel = 0;
  xVel = 0;
  obstacles=createGroup();

  //xSet = false;
  game = new Game();
  game.getState();
  game.start();
   
}


function draw(){
   //start the game
   background(200, 200, 255);

   //start the game
 
  //start the game
  if (playerCount === 4 && finishedPlayers === 0) {
    game.update(1);
  }

  //start the game for real
  if (gameState === 1) {
    game.play();
  }

  //end the game
  if (finishedPlayers === 4) {
    game.update(2);
    //gameState = 2;
  }

  //display ranking
  if (gameState === 2 && finishedPlayers === 4) {
    game.displayRanks();
  }
}

function keyPressed() {
  if (keyCode === 13 && gameState !== 1 && passedFinish === false) {
    form.enter();
    console.log("hai");
    passedFinish = true;
  }
}