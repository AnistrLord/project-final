var waitbgimg
var gameState = "wait"
var enemystate = 0
// var gameState = "roundClear"


function preload() {
    waitbgimg = loadImage("assets/splashscreen4.gif")
    playerimg = loadImage("assets/player1.png")
    player2img = loadImage("assets/player2.png")
    playerSelectionBg = loadImage("assets/playerSelect.gif")
    level1player1arena = loadImage("assets/arena/animated-gifs-of-fighting-game-backgrounds-8.gif")
    level1player2arena = loadImage("assets/arena/level1player2arena.gif")



    // player2 actions
    player2standingimg = loadImage("assets/ryu/ryu-cvs2-stance.gif");
    player2runimg = loadImage("assets/ryu/ryu-cfe-walkf.gif");
    player2kickimg = loadImage("assets/ryu/eruy-cfe-a3.gif");
    player2punchimg = loadImage("assets/ryu/SharedScreenshot-removebg-preview.png");
    player2walkbimg = loadImage("assets/ryu/ryu-cfe-walkb.gif")

    player1standingimg = loadImage("assets/ken/ken-ts-stance.gif");
    player1runimg = loadImage("assets/ken/ken-cvs-run.gif");
    player1kickimg = loadImage("assets/ken/ken-sfa-mk.gif");
    player1punchimg = loadImage("assets/ken/ken-sfa-hp.gif");
    player1walkbimg = loadImage("assets/ken/ken-walkb.gif")

    enemystandingimg = loadImage("assets/bision/stand.gif");
    enemywalkfimg = loadImage("assets/bision/walkf.gif");
    enemywalkbimg = loadImage("assets/bision/walkb.gif");
    enemykickimg = loadImage("assets/bision/kick.gif");
    enemypunchimg = loadImage("assets/bision/punch.gif");

    

    bgSound = loadSound("assets/bg.mp3");
    punch1 = loadSound("assets/PUNCH.mp3");
    punch2 = loadSound("assets/punch2.mp3");
    scr = loadSound("assets/scr.mp3")
    jumpS = loadSound("assets/jump.mp3");
    gameOverS = loadSound("assets/gameOver.mp3");
    YouWin = loadSound("assets/win.wav");
    buttonSound = loadSound("assets/button.mp3");





}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playButton = createImg("assets/startbutton2.png")
    playButton.position(width / 2 - width / 10, height / 5 * 3)
    playButton.size(width / 4, height / 4)


    nextButton = createImg("assets/button.png")
    nextButton.position(width / 2 - 300, height - 400)
    nextButton.size(500, 300)
    nextButton.hide()


    helpButton = createImg("assets/help.png")
    helpButton.position(width / 2 - width/18, height / 5 * 4.1)
    helpButton.size(width / 6, height / 5.5)
    helpButton.hide()



    // p1width=width/2
    // p1height=windowHeight/2

    // p2width=width/4
    // p2height=height/2
    enemyH = width / 3
    playerH = width / 3

    // player select buttons
    player1button = createImg("assets/player2.png")
    player1button.position(width / 6, height / 4)
    player1button.size(windowWidth / 4, windowHeight / 1.3)
    player1button.hide()

    // player1.debug=true


    player2button = createImg("assets/player1.png")
    player2button.position(width / 6 * 3, height / 4)
    player2button.size(windowWidth / 2, windowHeight / 1.3)
    player2button.hide()


    player = createSprite(width / 4, height / 4 * 2.4)
    enemy = createSprite(width / 4 * 3, height / 4 * 2.4)
    // player.addImage("player1standing", playerimg)
    // player.addImage("player1jump", playerimg)
    // player.addImage("player1run", playerimg)

    player.addImage("player2standing", player2standingimg);
    player.addImage("player2kick", player2kickimg);
    player.addImage("player2run", player2runimg);
    player.addImage("player2punch", player2punchimg);
    player.addImage("player1standing", player1standingimg);
    player.addImage("player1kick", player1kickimg);
    player.addImage("player1run", player1runimg);
    player.addImage("player1punch", player1punchimg);
    player.addImage("player2walkb", player2walkbimg);
    player.addImage("player1walkb", player1walkbimg);

    enemy.addImage("enemystand", enemystandingimg)
    enemy.addImage("enemywalkf", enemywalkfimg)
    enemy.addImage("enemywalkb", enemywalkbimg)
    enemy.addImage("enemypunch", enemypunchimg)
    enemy.addImage("enemykick", enemykickimg)
    // player.scale=windowHeight/1503.3333333333335
    // player.visible = false
    // player2=createSprite(width/3 *2,height/4 *2.4)
    // player2.addImage(player2img)
    // player2.scale=windowHeight/902
    // player2.visible=false

    nextButton = createImg("assets/button.png")

    // invisible ground
    invisibleground = createSprite(width / 2, height - 100, width, 40)
    invisibleground.visible = false
    player.collide(invisibleground)
    player.visible = false
    player.velocityY = 0
    enemy.velocityY = 10
    enemy.visible = false
    enemy.collide(invisibleground)


}


function draw() {
    //console.log(windowHeight)
    enemy.collide(invisibleground)

    if (gameState === "wait") {
        background(waitbgimg)
        player.visible = false
        helpButton.show()


    }

    playButton.mousePressed(() => {
        gameState = "playerSelect"
        playButton.hide()
        buttonSound.play()
        helpButton.hide()

    })


    helpButton.mousePressed(() => {
        gameState = "about"
        playButton.hide()
        buttonSound.play()
        helpButton.hide()
    })

    if (gameState == "about") {
        aboutgame()
    }

    if (gameState === "playerSelect") {
        background(playerSelectionBg)
        player1button.show()
        player2button.show()


        player1button.mousePressed(() => {
            buttonSound.play()
            gameState = "level1player1"
            player1button.hide()
            player2button.hide()
            background(level1player1arena)
            player.changeImage("player1standing")
            bgSound.loop()
        })


        player2button.mousePressed(() => {
            buttonSound.play()
            gameState = "level1player2"
            player1button.hide()
            player2button.hide()
            background(level1player2arena)
            player.changeImage("player2standing")
            bgSound.loop()

        })

    }


    if (gameState === "level1player1") {
        background(level1player1arena)
        player1button.hide()
        player2button.hide()
        player.visible = true
        enemy.visible = true
        enemy.scale = height / 250
        player.scale = height / 250
        if (player.velocityY < height / 9) {
            player.velocityY = player.velocityY + height / 100
        }
        if (enemy.velocityY < height / 9) {
            enemy.velocityY = enemy.velocityY + height / 100
        }

        stroke("black")
        strokeWeight(height / 200)
        fill("white")
        backgroundstriprect = rect(width / 45, height / 22, width / 3, height / 30)
        fill("red")
        playerLife = rect(width / 45, height / 22, playerH, height / 30)
        fill("blue")
        strokeWeight(height / 100)
        rect(width / 2 - width / 35 - width / 10, 10, width / 10, height / 6)

        player1CloseUp = createImg("assets/player1CloseUp.png")
        player1CloseUp.size(width / 10, height / 6)
        player1CloseUp.position(width / 2 - width / 35 - width / 10, 10)

        stroke("black")
        strokeWeight(height / 200)
        fill("white")
        backgroundstriprect = rect(width - width / 45 - width / 3, height / 22, width / 3, height / 30)
        fill("red")
        enemyLife = rect(width - width / 45 - width / 3, height / 22, enemyH, height / 30)
        fill("red")
        strokeWeight(height / 100)
        rect(width / 2 + width / 35, 10, width / 10, height / 6)

        enemy1CloseUp = createImg("assets/level1/bisionCloseUppng.png")
        enemy1CloseUp.size(width / 10, height / 6)
        enemy1CloseUp.position(width / 2 + width / 35, 10)
        vs = createImg("assets/vs.png")
        vs.size(width / 5, height / 6)
        vs.position(width / 2 - width / 10, 0)



        player.collide(invisibleground)
        enemy.collide(invisibleground)



        if (keyWentDown("w") && player.y > height / 4 * 2.4) {

            player.velocityY = -height / 10
            jumpS.play()

        }
        if (keyDown("d")) {

            player.x = player.x + width / 80
            enemy.x = enemy.x + width / 150
            enemy.changeImage("enemywalkb")
            player.changeImage("player1run")
        }
        else if (keyWentUp("d")) {

            enemy.changeImage("enemystand")

            player.changeImage("player1standing")
        }
        if (keyDown("a")) {

            player.x = player.x - width / 80
            enemy.x = enemy.x - width / 50
            enemy.changeImage("enemywalkf")
            player.changeImage("player1walkb")
        }
        else if (keyWentUp("a")) {

            enemy.changeImage("enemystand")
            player.changeImage("player1standing")
        }
        if (keyWentDown(" ")) {
            punch1.play()
            player.changeImage("player1punch")
            if (player.isTouching(enemy)) {
                enemy.x = enemy.x + width / 5
                enemyH = enemyH - width / 24

            }


        }
        else if (keyWentUp(" ")) {


            player.changeImage("player1standing")
        }
        if (keyWentDown(16)) {
            punch2.play()
            player.changeImage("player1kick")
            if (player.isTouching(enemy)) {
                enemy.x = enemy.x + width / 5
                enemyH = enemyH - width / 16

            }


        }
        else if (keyWentUp(16)) {


            player.changeImage("player1standing")
        }
    }

    if (gameState === "level1player2") {
        background(level1player2arena)
        player1button.hide()
        player2button.hide()
        player.visible = true
        enemy.visible = true
        enemy.scale = height / 250
        player.scale = height / 220
        // player.debug=true

        if (player.velocityY < height / 9) {
            player.velocityY = player.velocityY + height / 100
        }
        if (enemy.velocityY < height / 9) {
            enemy.velocityY = enemy.velocityY + height / 100
        }

        stroke("black")
        strokeWeight(height / 200)
        fill("white")
        backgroundstriprect = rect(width / 45, height / 22, width / 3, height / 30)
        fill("red")
        playerLife = rect(width / 45, height / 22, playerH, height / 30)
        fill("blue")
        strokeWeight(height / 100)
        rect(width / 2 - width / 35 - width / 10, 10, width / 10, height / 6)


        player1CloseUp = createImg("assets/player2CloseUp.png")
        player1CloseUp.size(width / 10, height / 6)
        player1CloseUp.position(width / 2 - width / 35 - width / 10, 10)


        stroke("black")
        strokeWeight(height / 200)
        fill("white")
        backgroundstriprect = rect(width - width / 45 - width / 3, height / 22, width / 3, height / 30)
        fill("red")
        enemyLife = rect(width - width / 45 - width / 3, height / 22, enemyH, height / 30)
        fill("red")
        strokeWeight(height / 100)
        rect(width / 2 + width / 35, 10, width / 10, height / 6)




        enemy1CloseUp = createImg("assets/level1/bisionCloseUppng.png")
        enemy1CloseUp.size(width / 10, height / 6)
        enemy1CloseUp.position(width / 2 + width / 35, 10)



        vs = createImg("assets/vs.png")
        vs.size(width / 5, height / 6)
        vs.position(width / 2 - width / 10, 0)


        player.collide(invisibleground)
        enemy.collide(invisibleground)

        if (keyWentDown("w") && player.y > height / 4 * 2.4) {

            player.velocityY = -height / 10
            jumpS.play()

        }
        if (keyDown("d")) {

            player.x = player.x + width / 80
            enemy.x = enemy.x + width / 150
            enemy.changeImage("enemywalkb")
            player.changeImage("player2run")
        }
        else if (keyWentUp("d")) {

            enemy.changeImage("enemystand")
            player.changeImage("player2standing")

        }
        if (keyDown("a")) {

            player.x = player.x - width / 80
            enemy.x = enemy.x - width / 50
            enemy.changeImage("enemywalkf")
            player.changeImage("player2walkb")
        }
        else if (keyWentUp("a")) {

            enemy.changeImage("enemystand")
            player.changeImage("player2standing")

        }
        if (keyWentDown(" ")) {
            punch1.play()
            player.changeImage("player2punch")
            if (player.isTouching(enemy)) {
                enemy.x = enemy.x + width / 5
                enemyH = enemyH - width / 16

            }

        }
        else if (keyWentUp(" ")) {


            player.changeImage("player2standing")
            if (player.isTouching(enemy)) {
                enemy.x = enemy.x + width / 5
            }

        }
        if (keyWentDown(16)) {
            punch2.play()
            player.changeImage("player2kick")
            if (player.isTouching(enemy)) {
                enemy.x = enemy.x + width / 5
                enemyH = enemyH - width / 24

            }


        }
        else if (keyWentUp(16)) {


            player.changeImage("player2standing")
        }
    }



    aiforenemy();

    if (playerH <= 0) {
        if (gameState === "level1player1") {
            player.changeImage("player1standing")
            gameOverS.play()
        } else if (gameState === "level1player2") {
            player.changeImage("player2standing")
            gameOverS.play()
        }
        enemy.velocityY = 0
        player.velocityY = 0
        enemy.changeImage("enemystand")
        gameState = "gameover"
        // gameover = createImg("assets/gameover.png")
        // gameover.position(0,0)
        // gameover.size(width,height)

        // replay = createSprite(windowWidth/2-50,height/3 *2);


    } else if (enemyH <= 0) {

        if (gameState === "level1player1") {
            player.changeImage("player1standing")
            YouWin.play()
        } else if (gameState === "level1player2") {
            player.changeImage("player2standing")
            YouWin.play()
        }
        enemy.velocityY = 0
        player.velocityY = 0
        enemy.changeImage("enemystand")
        gameState = "roundClear"
        // gameover = createImg("assets/1PW.png")
        // gameover.position(width/2 - width/4,height/2-height/4)
        // gameover.size(width/2,height/2)

    }

    if (gameState == "roundClear") {
        bgSound.pause()
        level2alert()
    }

    if (gameState == "gameover") {

        bgSound.pause()
        end()

    }


    drawSprites()



}



function aiforenemy() {

    if (player.x < width / 12) {
        player.x = width / 4
        enemy.x = width / 4 * 3
    }
    if (enemy.x > width / 12 * 11) {
        player.x = width / 4
        enemy.x = width / 4 * 3
    }

    if (player.x + width / 9 > enemy.x - width / 10) {
        enemystate = round(random(1, 3));


        console.log(enemystate);
    }

    if (enemystate === 1) {
        enemy.changeImage("enemypunch")
        myInterval = setInterval(changeNormal, 1200);
        if (player.isTouching(enemy)) {
            player.x = player.x - width / 5
            playerH = playerH - width / 18
            punch1.play()
        }

    }
    if (enemystate === 2) {
        enemy.changeImage("enemykick")
        myInterval = setInterval(changeNormal, 800);
        if (player.isTouching(enemy)) {
            player.x = player.x - width / 5
            playerH = playerH - width / 15
            punch2.play()
        }

    }
    if (enemystate === 3) {
        enemy.changeImage("enemypunch")
        myInterval = setInterval(changeNormal, 800);
        enemy.velocityY = -height / 10
        jumpS.play()

    }


    // player.debug=true
    // enemy.debug=true




}



function changeNormal() {
    enemy.changeImage("enemystand")
    clearInterval(myInterval);


    enemystate = 0


}


function end() {
    swal({
        title: "You have LOST it!! ",
        text: " Better Luck Next Time!!",
        imageUrl: "assets/gameover.png",
        imageSize: '400x100',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'REPLAY!!!',
    },
        function (isConfirm) {
            location.reload()
        })

}


function level2alert() {
    swal({

        title: "You have Won !!",
        //the Level!! \n Enter Level 2!! ",
        // text: "Enter Level 2!!",
        imageUrl: "assets/winnew.jpg",
        imageSize: '400x300',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'RESTART',
    },
        function (isConfirm) {
            location.reload()
        })

}

function aboutgame() {
    swal({

        title: "HOW TO PLAY  !!",
        imageUrl: "assets/helpbox.jpg",
        imageSize: '400x300',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'START',
    },
        function (isConfirm) {
            location.reload()
        })

}