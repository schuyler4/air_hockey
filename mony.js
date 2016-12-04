/* this file is to manage the buying of player skins */

/* get the mony or set */
var mony = localStorage.getItem("mony")
if(mony == null) {
  localStorage.setItem("mony", "0")
}

/* get all the buttons */
var yellowButton = document.getElementById("yellowButton")
var greenButton = document.getElementById("greenButton")
var blueButton = document.getElementById("blueButton")

/* a function to buy the one of the player skins */
function buy(mony) {
  console.log("buying something")
}

/* click listeners */
yellowButton.addEventListener('click', function(event) {
  console.log("yellow button clicked")
})

greenButton.addEventListener('click', function(event) {
  console.log("green button clicked")
})

blueButton.addEventListener('click', function(event) {
  console.log("blue button clicked")
})
