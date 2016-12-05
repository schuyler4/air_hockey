/* this file is to manage the buying of player skins */
var mony = localStorage.getItem("mony")
if(mony == null) {
  localStorage.setItem("mony", "0")
}

/* get all the buttons */
var yellowButton = document.getElementById("yellowButton")
var greenButton = document.getElementById("greenButton")
var blueButton = document.getElementById("blueButton")
var readButton = document.getElementById("readButton")
var warningHeader = document.getElementById("warningHeader")
var money = document.getElementById("mony")

money.innerHTML = "money: " + localStorage.getItem("mony")

/* set all the buttons to there correct text */
if(localStorage.getItem("yellowPurchased") == null) {
  yellowButton.innerHTML = "buy"
} else {
  yellowButton.innerHTML = "youse"
}

if(localStorage.getItem("greenPurchased") == null) {
  greenButton.innerHTML = "buy"
} else {
  greenButton.innerHTML = "youse"
}

if(localStorage.getItem("bluePurchased") == null) {
  blueButton.innerHTML = "buy"
} else {
  blueButton.innerHTML = "youse"
}

/* get the mony or set */
var mony = localStorage.getItem("mony")
if(mony == null) {
  localStorage.setItem("mony", "0")
}

/* a function to tell the player if they don't have enuf money */
function not_enogh_mony() {
  console.log("you dont have enuogh mony to buy that")
  warningHeader.innerHTML = "you dont have enuogh to buy that"
}

/* a function to buy the one of the player skins */
function buy(money, color) {
  if(color == "green") {
    if(money >= 5) {
      localStorage.setItem("greenPurchased", "true")
      localStorage.setItem("mony", parseInt(mony) - 5)
      return true
    } else {
      not_enogh_mony()
      return false
    }
  }

  else if(color == "blue") {
    if(money >= 10) {
      localStorage.setItem("bluePurchased", "true")
      localStorage.setItem("mony", parseInt(mony) - 10)
      return true
    } else {
      not_enogh_mony()
      return false
    }
  }

  else if(color == "yellow") {
    if(money >= 30) {
      localStorage.setItem("yellowPurchased", "true")
      localStorage.setItem("mony", parseInt(mony) - 15)
      return true
    } else {
      not_enogh_mony()
      return false
    }
  }
}

/* click listeners */
redButton.addEventListener('click', function(event) {
  localStorage.setItem("currentColor", "red")
})

yellowButton.addEventListener('click', function(event) {
  if(localStorage.getItem("yellowPurchased") == null) {
    buy(parseInt(localStorage.getItem("mony")), "yellow")
    if(buy(parseInt(localStorage.getItem("mony")), "yellow")) {
      yellowButton.innerHTML = "youse"
      localStorage.setItem("currentColor", "yellow")
    } else {
      warningHeader.innerHTML = "you dont have enough mony"
    }
  } else {
    localStorage.setItem("currentColor", "yellow")
  }
})

greenButton.addEventListener('click', function(event) {
  if(localStorage.getItem("greenPurchased") == null) {
    buy(parseInt(localStorage.getItem("mony")), "green")
    if(buy(parseInt(localStorage.getItem("mony")), "green")) {
      greenButton.innerHTML = "youse"
      localStorage.setItem("currentColor", "green")
    } else {
      warningHeader.innerHTML = "you dont have enough mony"
    }
  } else {
    localStorage.setItem("currentColor", "green")
  }
})

blueButton.addEventListener('click', function(event) {
  if(localStorage.getItem("bluePurchased") == null) {
    buy(parseInt(localStorage.getItem("mony")), "blue")
    if(buy(parseInt(localStorage.getItem("mony")), "blue")) {
      blueButton.innerHTML = "youse"
        localStorage.setItem("currentColor", "blue")
    } else {
      warningHeader.innerHTML = "you dont have enough mony"
    }
  } else {
    localStorage.setItem("currentColor", "blue")
  }
})

/* a function to reset all the local storage not for production */
//localStorage.clear();
