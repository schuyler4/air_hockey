var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
//image varibles
var cortLines = new Image()
cortLines.src = "hockeyLine.png"

ctx.canvas.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX - ctx.canvas.offsetLeft
    var mouseY = event.clientY - ctx.canvas.offsetTop
    if(mouseX >= 0 && mouseX <= canvas.width) {
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
        ctx.fillText(this.playerScore,275,20);
        ctx.fillText(this.enemyScore,325,20)
    },
}

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
            }
            else if(puck.x < this.x) {
                puck.Xdirection = "left"
            }
            //y moving
            if(puck.y > this.y) {
                puck.Ydirection = "down"
            }
            else if(puck.y < this.y) {
                puck.Ydirection = "up"
            }
        }
    },
}

var enemy = {
    x: 50,
    y: canvas.height / 2,
    size: 20,
    draw: function() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
        ctx.fillStyle = "blue"
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
            }
            else if(puck.x < this.x) {
                puck.Xdirection = "left"
            }
            //y moving
            if(puck.y > this.y) {
                puck.Ydirection = "down"
            }
            else if(puck.y < this.y) {
                puck.Ydirection = "up"
            }
        }
    }
}

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
    speed: 2000,
    move: function() {
        this.speed = 100
        //speed slowdown
        if(this.speed > 50) {
            //this.speed -= 1
        }
        //make puck move coninulesly
        if(this.Xdirection == false) {
            this.x += this.speed / 100
        }
        //directional varibles for x
        if(this.Xdirection == "left") {
            this.x -= this.speed / 100
        }
        else if(this.Xdirection == "right") {
            this.x += this.speed / 100
        }
        //directional varibles for y
        if(this.Ydirection == "up") {
            this.y -= this.speed / 100
        }
        else if(this.Ydirection == "down") {
            this.y += this.speed / 100
        }
    },
    collide: function() {
        //x colition with walls
        if(this.y > playerGoal.y && playerGoal.y + 50 > this.y
          && this.x > canvas.width - goalWidth * 2) {
            if(this.x > 620) {
                score.enemyScore += 1
                clearInterval(loop)
            }
        }
        else if(this.y > enemyGoal.y && enemyGoal.y + 50 > this.y
               && this.x < 20) {
            if(this.x = -20 ) {
                score.playerScore += 1
                clearInterval(loop)
            }
        }
        else {
            if(this.x + 10 >= canvas.width) {
                this.Xdirection = "left"
            }
            else if(this.x - 10 <= 0) {
                this.Xdirection = "right"
            }
            //y collition with walls
            if(this.y + 10 >= canvas.height) {
                this.Ydirection = "up"
            }
            else if(this.y - 10 <= 0) {
                this.Ydirection = "down"
            }
        }
        
    }
}

function reset() {
    player.x = 550;
    player.y = canvas.height / 2;
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
    enemy.collide()
    //puckFuncitons
    puck.draw()
    puck.move()
    puck.collide()
}
var loop = setInterval(draw,10)