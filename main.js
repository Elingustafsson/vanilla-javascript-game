var dimension = 10;
var gameOn = false;
var direction = null;

createTable(dimension);
var currentPos = initialize(dimension);

document.onkeydown = function(e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowLeft") {
    direction = e.key;
    if (gameOn === false) {
      gameOn = true;
      timer = setInterval(timeFunction, 1000)
    }
  }
}

function checkIfLose() {
  if (currentPos.x < 0 || currentPos.x >= dimension || currentPos.y < 0 || currentPos.y >= dimension){
    console.log("you lose");
    clearInterval(timer);
    gameOn = false;
    currentPos = initialize(dimension)
  } else {
    document.getElementById("cell" + currentPos.x + currentPos.y).innerHTML = " X ";
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
  var startPos = {x: Math.floor((dimension-1)/2), y: Math.floor((dimension-1)/2)};
  return startPos;
}

function timeFunction() {
  document.getElementById("cell" + currentPos.x + currentPos.y).innerHTML = "";
  
  switch(direction) {
    case "ArrowUp":
      currentPos.x --;
      break;
    case "ArrowDown":
      currentPos.x ++;
      break;
    case "ArrowRight":
      currentPos.y ++;
      break;
    case "ArrowLeft":
      currentPos.y --;
      break;
  }
  checkIfLose()
}
