var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
//image varibles
var cortLines = new Image()
cortLines.src = "hockeyLine.png"

//sound varibles
var puckSound = new Audio("puckHit.wav")
var yaySound = new Audio("yay.wav")
var booSound = new Audio("boo.wav")
//enemy shooting var
var readyToShoot = false

ctx.canvas.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX - ctx.canvas.offsetLeft
    var mouseY = event.clientY - ctx.canvas.offsetTop
    if(mouseX >= 0 && mouseX > 300) {
        player.x = mouseX;
    }
    if(mouseY >= 0 && mouseY <= canvas.height) {
        player.y = mouseY
    }
})

var goalWidth = 10;
var goalHeight = 50;

function goal(x,y) {
    this.x = x
    this.y = y
}

var playerGoal = new goal(590,canvas.height / 2 - 25)
var enemyGoal = new goal(0,canvas.height / 2 - 25)

function drawLines() {
    ctx.beginPath()
    ctx.drawImage(cortLines,10, 0)
    ctx.closePath()
}

function drawGoals() {
    ctx.beginPath()
    ctx.rect(playerGoal.x,playerGoal.y,goalWidth,goalHeight)
    ctx.rect(enemyGoal.x,enemyGoal.y,goalWidth,goalHeight)
    ctx.fillStyle = "white";
    ctx.fill()
    ctx.closePath()
}
var score = {
    playerScore: 0,
    enemyScore: 0,
    draw: function() {
        ctx.font="20px Arial";
        ctx.fillText(this.enemyScore,275,20);
        ctx.fillText(this.playerScore,325,20)
    },
    win: function() {
        if(this.playerScore == 10) {
            clearInterval(loop)
            console.log('you won')
        }
        else if(this.enemyScore == 10) {
            clearInterval(loop)
            console.log('my porly programed ai beet you')
        }
    }
}

var playerScored = false
var enemyScored = false

var player = {
    x: 550,
    y: canvas.height / 2,
    size: 20,
    draw: function() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    },
    collide: function() {
        var dx = this.x - puck.x;
        var dy = this.y - puck.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + puck.size) {
            //x moving
            if(puck.x > this.x) {
                puck.Xdirection = "right"
                puck.speed = 500
                puckSound.play()
                readyToShoot = false
            }
            else if(puck.x < this.x) {
                puck.Xdirection = "left"
                puck.speed = 500
                puckSound.play()
                readyToShoot = false
            }
            //y moving
            if(puck.y > this.y) {
                puck.Ydirection = "down"
                puck.speed = 500
                puckSound.play()
                readyToShoot = false
            }
            else if(puck.y < this.y) {
                puck.Ydirection = "up"
                puck.speed = 500
                puckSound.play()
                readyToShoot = false
            }
        }
    },
}

var enemyShoot = false
var enemy = {
    x: 50,
    y: canvas.height / 2,
    size: 20,
    speed: 0,
    draw: function() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
        ctx.fillStyle = "blue"
        ctx.fill()
        ctx.closePath()
    },
    move: function() {
        //moving on y
        var moveDecider = Math.floor(Math.random() *  2)
            if(puck.y > this.y) {
                if(moveDecider == 1) {
                    this.y += this.speed
                }      
            }
            else if(puck.y < this.y) {
                if(moveDecider == 1) { 
                    this.y -= this.speed
                }
            }
        //moving on x  
        if(this.x < puck.x && this.x <  canvas.width / 2) {
            this.x += this.speed
        }
        //why is it moving on the other side 
        else if(this.x > puck.x && this.x > 0) { //<-- why 
            this.x -= this.speed  
        }
        //make it slow down as it gets closer to the puck
        var dx = this.x - puck.x;
        var dy = this.y - puck.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < 50) {
            this.speed = 2
        }
        else {
           this.speed = 4
        }
    },
    //makes the puck collide with the enemy
    collide: function() {
        var dx = this.x - puck.x;
        var dy = this.y - puck.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + puck.size) {
            //x moving
            if(puck.x > this.x) {
                puck.Xdirection = "right"
                puck.speed = 500
                puckSound.play()
                readyToShoot = true
            }
            else if(puck.x < this.x) {
                puck.Xdirection = "left"
                puck.speed = 500
                puckSound.play()
                readyToShoot = true
            }
            //y moving
            if(puck.y > this.y) {
                puck.Ydirection = "down"
                puck.speed = 500
                puckSound.play()
                readyToShoot = true
            }
            else if(puck.y < this.y) {
                puck.Ydirection = "up"
                puck.speed = 500
                puckSound.play()
                readyToShoot = true
            }
        }
        if(readyToShoot == true /*&& this.x > canvas.width / 2 - 40*/) {
            if(puck.y > playerGoal.y + 25) {
                puck.y -= 1
            }
            else if(puck.y < playerGoal.y + 25) {
                puck.y += 1
            }
            else if(puck.y == playerGoal.y + 25) {
                puck.x += 10
            }
        }
    }
}
//puck below
var puck = {
    x:canvas.width / 2,
    y:canvas.height /  2,
    size: 10,
    draw: function() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
        ctx.fillStyle = "yellow"
        ctx.fill()
        ctx.closePath()
    },
    Xdirection: false,
    Ydirection: false,
    speed: 500,
    move: function() {
        //speed slowdown
        this.speed -= 1
        //directional varibles for x
        if(this.Xdirection == "left") {
            this.x -= this.speed / 100
        }
        else if(this.Xdirection == "right") {
            this.x += this.speed / 100
        }
        //directional varibles for y
        if(this.Ydirection == "up" && this.y > 0) {
            this.y -= this.speed / 100
        }
        else if(this.Ydirection == "down") {
            this.y += this.speed / 100
        }
    },
    collide: function() {
        
        if(this.x + 10 >= canvas.width) {
            this.Xdirection = "left"
            puckSound.play()
            readyToShoot = false
        }
        else if(this.x - 10 <= 0) {
            this.Xdirection = "right"
            puckSound.play()
            readyToShoot = false
        }
            //y collition with walls
        if(this.y + 10 >= canvas.height) {
            this.Ydirection = "up"
            puckSound.play()
            readyToShoot = false
        }
        else if(this.y - 10 <= 0) {
            this.Ydirection = "down"
            puckSound.play()
            readyToShoot = false
        }
        //colitions with player goal
        var distX = Math.abs(puck.x - playerGoal.x-10/2);
        var distY = Math.abs(puck.y - playerGoal.y-50/2);
        
        var outSideOfPlayerGoal = ((distX > (10/2 + puck.size))
                    || distY > (50/2 + puck.size)) 
        
        if (!outSideOfPlayerGoal) {
            enemyScored = true
            booSound.play()
            reset()  
        } 
        //enemy goal collitions
        var PdistX = Math.abs(puck.x - enemyGoal.x-10/2);
        var PdistY = Math.abs(puck.y - enemyGoal.y-50/2);

        if (PdistX > (10/2 + puck.size)) { return false; }
        if (PdistY > (50/2 + puck.size)) { return false; }

        if (PdistX <= (10/2)) {
            console.log('scored')
            playerScored = true
            yaySound.play()
            reset()  
        } 
        if (PdistY <= (50/2)) { 
            console.log('scored')
            playerScored = true
            yaySound.play()
            reset()  
        }
    }
}
/*this resets the players and puck after a goal
is scored*/
function reset() {
    if(playerScored == true) {
        score.playerScore += 1
        playerScored = false
    }
    else if(enemyScored == true) {
        score.enemyScore += 1
        enemyScored = false
    }
    //player resets
    player.x = 550;
    player.y = canvas.height / 2
    //puck recets
    puck.x = canvas.width / 2
    puck.y = canvas.height / 2 
    //enemy recets
    enemy.x = 50
    enemy.y = canvas.height / 2
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
    //lines
    drawLines()
    //goalFuncitons
    drawGoals()
    //score
    score.draw()
    //playerFunciton
    player.draw()
    player.collide()
    //enimyFunctions
    enemy.draw()
    enemy.move()
    enemy.collide()
    //puckFuncitons
    puck.draw()
    puck.move()
    puck.collide()
}

var loop = setInterval(draw,10)