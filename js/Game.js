class Game {
          constructor(){
        
          }
        
          getState(){
            var gameStateRef  = database.ref('gameState');
            gameStateRef.on("value",function(data){
               gameState = data.val();
            })
        
          }
        
          update(state){
            database.ref('/').update({
              gameState: state
            });
          }
        
          async start(){
            if(gameState === 0){
              player = new Player();
              var playerCountRef = await database.ref('playerCount').once("value");
              if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
              }
              form = new Form()
              form.display();
            }
        
            B1 = createSprite(100,200);
            B1.addImage("bike1",B1_img);
            B1.scale = 0.3;
            B2 = createSprite(300,200);
            B2.addImage("bike2",B2_img);
            B2.scale = 0.5;
            B3 = createSprite(500,200);
            B3.addImage("bike3",B3_img);
            B3.scale = 0.5;
            B4 = createSprite(700,200);
            B4.addImage("bike4",B4_img);
            B4.scale = 1;
            bikes = [B1, B2, B3, B4];
            passedFinish = false;

          }
        
          play(){
            form.hide();
        
            Player.getPlayerInfo();
            player.getFinishedPlayers();

            if(allPlayers !== undefined){
              //var display_position = 100;
              image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
              //index of the array
              var index =0;
        
              //x and y position of the cars
              var x =200;
              var y;
        
              for(var plr in allPlayers){
                //add 1 to the index for every loop
                index = index + 1 ;
                x = 200 + (index * 200) + allPlayers[plr].xPos;
                y = displayHeight - allPlayers[plr].distance ;
               
                bikes[index-1].x = x;
                bikes[index-1].y = y;
                textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, bikes[index - 1].x, bikes[index - 1].y + 75);
                if (index === player.index){
                  bikes[index - 1].shapeColor = "red";
                  camera.position.x = displayWidth/2;
                  camera.position.y = bikes[index-1].y
                          
                }
               
              }
        
            }
        console.log(displayHeight)
        console.log(  player.distance  )
            if(player.distance < 3700){
              if(keyIsDown(38) && player.index !== null){
                  yVel += 0.9;
                  if(keyIsDown(37)){
                      xVel -= 0.2;
                  }
                  if(keyIsDown(39)){
                      xVel += 0.2;
                  }
              }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
                  yVel -= 0.1;
                  xVel *= 0.9;
              }else{
                  yVel *= 0.985;
                  xVel *= 0.985;
              }
            }else if(passedFinish === false){
              yVel *= 0.7;
              xVel *= 0.7;
              Player.updateFinishedPlayers();
              player.place = finishedPlayers;
  
              player.update();
              passedFinish = true;
          }else{
              yVel *= 0.8;
              xVel *= 0.8;
          }
  
        
          //move the car
          player.distance += yVel;
          yVel *= 0.98;
          player.xPos += xVel;
          xVel *= 0.985;
          player.update();
          //display sprites
          drawSprites();
        }
           
      
        displayRanks(){
          //display the medals
          camera.position.y = 0;
          camera.position.x = 0;
  
          imageMode(CENTER);
  
          Player.getPlayerInfo();
  
          image(bronze, displayWidth/-4, -100 + displayHeight/9, 200, 240);
          image(silver, displayWidth/4, -100 + displayHeight/10, 225, 270);
          image(gold, 0, -100, 250, 300);
  
          textAlign(CENTER);
          textSize(50);
          for(var plr in allPlayers){
              if(allPlayers[plr].place === 1){
                  text("1st: " + allPlayers[plr].name, 0, 85);
              }else if(allPlayers[plr].place === 2){
                  text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
              }else if(allPlayers[plr].place === 3){
                  text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
              }else{
                  textSize(30);
                  text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
              }
          }
      }
  }
