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

    car1 = createSprite(100,200);
    car1.addImage(car1Image)
    car2 = createSprite(300,200);
    car2.addImage(car2Image)
    car3 = createSprite(500,200);
    car3.addImage(car3Image)
    car4 = createSprite(700,200);
    car4.addImage(car4Image)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers()
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(66,66,66)
      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 215;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 225;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red")
          ellipse(x,y,60,60)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
        textAlign(CENTER)
        textSize(15);
        text(allPlayers[plr].name, cars[index-1].x, cars[index-1].y-75)
        
      }
    

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance = player.distance + Math.round(random(20,70))
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=50
      player.update();
    }

    if(player.distance > 4210) {
      gameState = 2
      player.rank +=1
      Player.updateFinishedPlayers(player.rank)
      console.log("End")
      player.update()
      textSize(25)
      text("your rank:"+player.rank,displayWidth/2,y-120)
    }
    if(player.distance > 4210 && player.rank === 1){
      console.log("1st Place")


    }
   
    drawSprites();
  }
  displayRanks(){
    camera.position.x = 0
    camera.position.y = 0
    Player.getPlayerInfo()
    for(var plr in allPlayers){
      if(allPlayers[plr].rank ===1){
        fill("yellow")
        textSize(30)
        text("first:"+allPlayers[plr].name,0,100)
      } else if(allPlayers[plr].rank ===2){
        fill("gray")
        textSize(30)
        text("Second:"+allPlayers[plr].name,0,150)

      } else if(allPlayers[plr].rank ===3){
        fill("orange")
        textSize(30)
        text("Third:"+allPlayers[plr].name,0,200)

      } else{
        fill("red")
        textSize(30)
        text("Fourth:"+allPlayers[plr].name,0,250)

      }

    }
  }
}
