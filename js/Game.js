class Game {
  constructor(){}

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

    car1=createSprite(100,200);
    car1.addImage("car1",car1image);
    car2=createSprite(300,200);
    car2.addImage("car2",car2image);
    car3=createSprite(500,200);
    car3.addImage("car3",car3image);
    car4=createSprite(700,200);
    car4.addImage("car4",car4image);
    cars=[car1,car2,car3,car4]

  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background("#C68767");
      image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
      var carIndex=0;
      var x=175;
      var y=0;
      
      for(var plr in allPlayers){
        carIndex=carIndex+1;
        x=x+200;
        y=displayHeight-allPlayers[plr].distance;
        cars[carIndex-1].x=x;
        cars[carIndex-1].y=y;

        if(carIndex===player.index){
         // cars[carIndex-1].="red";
         stroke(10);
         fill("red");
         ellipse(x,y,60,60);
          camera.position.x=displayWidth/2;
          camera.position.y=cars[carIndex-1].y;
          

        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance>3450){
      gameState=2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
  }

  end(){
    console.log("game Over");
    alert(" PLAYER RANK :   "+player.rank);

  }
}
