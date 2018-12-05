var dimension = 10;
var gameOn = false;
var direction = null;
var positions;
var currentFood;
var didIEat = false;

createTable(dimension);
initialize(dimension);

document.onkeydown = function(e) {
  if (!((e.key === "ArrowUp" && direction === "ArrowDown")
    || (e.key === "ArrowDown" && direction === "ArrowUp")
    || (e.key === "ArrowRight" && direction === "ArrowLeft")
    || (e.key === "ArrowLeft" && direction === "ArrowRight"))) {

    direction = e.key;

    if (gameOn === false) {
      gameOn = true;
      timer = setInterval(timeFunction, 500)
    }
  }
}

function grow() {


  console.log("grow");
}

function placeFood() {
  var randomX =  Math.floor((Math.random() * dimension))
  var randomY =  Math.floor((Math.random() * dimension))
  var food = document.getElementById("cell" + randomX + randomY);
  food.innerHTML = " O "
  currentFood = {x: randomX, y: randomY}
}

function checkIfEat() {
  if (positions[0].x === currentFood.x && positions[0].y === currentFood.y) {
    didIEat = true;
    placeFood()
  }
}

function checkIfLose() {
  if (positions[0].x < 0 || positions[0].x >= dimension || positions[0].y < 0 || positions[0].y >= dimension){
    console.log("you lose");
    clearInterval(timer);
    gameOn = false;
    var food = document.getElementById("cell" + currentFood.x + currentFood.y);
    food.innerHTML = ""
    initialize(dimension)
  } else {
    document.getElementById("cell" + positions[0].x + positions[0].y).innerHTML = " X ";
  }
}

function createTable(dimension) {
  var tbl = document.createElement("table");
  document.getElementById("tableContainer").append(tbl);

  for(var i = 0; i < dimension; i++) {
    var row = document.createElement("tr");
    row.id = "row" + i;
    tbl.append(row);

    for(var j = 0; j < dimension; j++) {
      var cell = document.createElement("td");
      cell.id = "cell" + i+j;
      row.append(cell);
    }
  }
}

function initialize(dimension) {
  var start = document.getElementById("cell" + Math.floor((dimension-1)/2) + Math.floor((dimension-1)/2));
  start.innerHTML = " X "
  positions = [{x: Math.floor((dimension-1)/2), y: Math.floor((dimension-1)/2)}];

  placeFood()
}


function timeFunction() {
  if (didIEat === true) {
    didIEat = false
    grow()
  } else {
      document.getElementById("cell" + positions[0].x + positions[0].y).innerHTML = "";
    }

  switch(direction) {
    case "ArrowUp":
      positions[0].x--;
      break;
    case "ArrowDown":
      positions[0].x++;
      break;
    case "ArrowRight":
      positions[0].y++;
      break;
    case "ArrowLeft":
      positions[0].y--;
      break;
  }
  console.log(positions[0]);

  checkIfEat()
  checkIfLose()
}
