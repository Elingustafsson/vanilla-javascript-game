var dimension = 10;

createTable(dimension);
var currentPos = initialize(dimension);
console.log(currentPos);

document.onkeydown = function(e) {
  console.log(e.key);
  if (e.key === "ArrowUp") {
    document.getElementById("cell" + currentPos.x + currentPos.y).innerHTML = "";
    currentPos = {x: currentPos.x -1, y:currentPos.y};
    document.getElementById("cell" + currentPos.x + currentPos.y).innerHTML = " X ";
  }
  if (e.key === "ArrowDown") {
    document.getElementById("cell" + currentPos.x + currentPos.y).innerHTML = "";
    currentPos = {x: currentPos.x +1, y:currentPos.y};
    document.getElementById("cell" + currentPos.x + currentPos.y).innerHTML = " X ";
  }
  if (e.key === "ArrowLeft") {
    document.getElementById("cell" + currentPos.x + currentPos.y).innerHTML = "";
    currentPos = {x: currentPos.x, y:currentPos.y -1};
    document.getElementById("cell" + currentPos.x + currentPos.y).innerHTML = " X ";
  }
  if (e.key === "ArrowRight") {
    document.getElementById("cell" + currentPos.x + currentPos.y).innerHTML = "";
    currentPos = {x: currentPos.x, y:currentPos.y +1};
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
