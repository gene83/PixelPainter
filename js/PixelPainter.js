function gridMaker(width, height, location) {
  for (let y = 0; y < height; y++) {
    let row = document.createElement("div");
    row.className = "row";
    location.appendChild(row);
    for (let x = 0; x < width; x++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      row.appendChild(cell);
    }
  }
}

const pix = document.getElementById("pixelPainter");
const grid = document.createElement("div");
grid.className = "grid";
const swatch = document.createElement("div");
swatch.className = "swatch";

pix.appendChild(grid);
pix.appendChild(swatch);

gridMaker(25, 25, grid);
gridMaker(5, 2, swatch);

let selectedColor = "";

function selectColor() {
  selectedColor = this.style.backgroundColor;
}

function paint() {
  this.style.backgroundColor = selectedColor;
}

function paint2() {
  this.style.backgroundColor = selectedColor;
  console.log("hit");
}

//adding paint event listeners to grid cells
let gridCells = grid.getElementsByClassName("cell");
for (let i = 0; i < gridCells.length; i++) {
  gridCells[i].addEventListener("click", paint);
  gridCells[i].addEventListener("mouseover", paint2);
  gridCells[i].style.backgroundColor = "white";
}

//add select color event listeners to swatch cells
let swatchCells = swatch.getElementsByClassName("cell");
for (let i = 0; i < swatchCells.length; i++) {
  swatchCells[i].addEventListener("click", selectColor);
  swatchCells[i].style.backgroundColor = "blue";
}

// let mouseDown = 0;
// document.body.addEventListener("mousedown", function() {
//   mouseDown++;
//   console.log(mouseDown);
// });
// document.body.addEventListener("mouseup", function() {
//   mouseDown--;
//   console.log(mouseDown);
// });
