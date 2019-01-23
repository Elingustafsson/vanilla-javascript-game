var dimension = 10;
var gameOn = false;
var direction = null;
var positions;
var currentFood;
var didIEat = false;

createTable(dimension);
initialize(dimension);

document.onkeydown = function(e) {
  console.log("elim",positions);
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
  // var start = document.getElementById("cell" + Math.floor((dimension-1)/2) + Math.floor((dimension-1)/2));
  // start.innerHTML = " X "
  // positions = [{x: Math.floor((dimension-1)/2), y: Math.floor((dimension-1)/2)}];
  positions = [{x:1, y:1},{x:1, y:2},{x:1, y:3}];
  for (var i = 1; i <= 3; i++) {
    var orm = document.getElementById("cell1"+i)
    orm.innerHTML = "X"
  }
  console.log("första",positions);
  placeFood()
}


function timeFunction() {
  console.log("inne i ",positions);
  if (didIEat === true) {
    didIEat = false
    grow()
  } else {
      document.getElementById("cell" + positions[0].x + positions[0].y).innerHTML = "";
    }
console.log("innan",positions);
var testX = positions[0].x;
var testY = positions[0].y;
  switch(direction) {
    case "ArrowUp":
      sista = positions.pop()
      positions.unshift({x:testX-1, y:testY})
      break;
    case "ArrowDown":
      sista = positions.pop()
      positions.unshift({x:positions[0].x+1, y:positions[0].y})
      break;
    case "ArrowRight":
      sista = positions.pop()
      positions.unshift({x:positions[0].x, y:positions[0].y+1})
      break;
    case "ArrowLeft":
      sista = positions.pop()
      positions.unshift({x:positions[0].x, y:positions[0].y-1})
      break;
  }
  console.log("efter",positions);

  checkIfEat()
  checkIfLose()
}
