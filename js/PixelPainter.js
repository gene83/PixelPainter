const pixelPainter = (function() {
  function gridMaker(width, height, location) {
    for (let y = 0; y < height; y++) {
      let row = document.createElement("div");
      row.className = "row";
      location.appendChild(row);
      for (let x = 0; x < width; x++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("data-y", y);
        cell.setAttribute("data-x", x);
        row.appendChild(cell);
      }
    }
  }

  function selectColor() {
    activeColor = this.style.backgroundColor;
  }

  function inputColor() {
    activeColor = this.value;
  }

  function paintClick() {
    this.style.backgroundColor = activeColor;
  }

  function paintDrag() {
    if (mouseDown) {
      this.style.backgroundColor = activeColor;
    }
  }

  function clear() {
    for (let i = 0; i < gridCells.length; i++) {
      gridCells[i].style.backgroundColor = "transparent";
    }
  }

  function erase() {
    activeColor = "transparent";
  }

  return {
    gridMaker,
    selectColor,
    inputColor,
    paintClick,
    paintDrag,
    clear,
    erase
  };
})();

const palette = [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
  "#008080",
  "#e6beff",
  "#9a6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#808080",
  "#ffffff",
  "#000000"
];

const pix = document.getElementById("pixelPainter");
const grid = document.createElement("div");
const swatch = document.createElement("div");
const eraserButton = document.createElement("div");
const clearButton = document.createElement("div");
const gridCells = grid.getElementsByClassName("cell");
const swatchCells = swatch.getElementsByClassName("cell");
const controlPanel = document.createElement("div");
const colorPicker = document.createElement("input");

let activeColor = "";
let mouseDown = false;

pixelPainter.gridMaker(50, 50, grid);
pixelPainter.gridMaker(2, 11, swatch);

grid.className = "grid";
swatch.className = "swatch";
clearButton.className = "clear";
eraserButton.className = "erase";
controlPanel.className = "controlPanel";
colorPicker.type = "color";

pix.appendChild(grid);
pix.appendChild(controlPanel);
controlPanel.appendChild(swatch);
controlPanel.appendChild(colorPicker);
controlPanel.appendChild(eraserButton);
controlPanel.appendChild(clearButton);

eraserButton.innerHTML = "Eraser";
clearButton.innerHTML = "Clear";

//event listeners to track if mouse is down
document.body.addEventListener("mousedown", function() {
  mouseDown = true;
});
document.body.addEventListener("mouseup", function() {
  mouseDown = false;
});

//add paint event listeners to grid cells
for (let i = 0; i < gridCells.length; i++) {
  gridCells[i].addEventListener("click", pixelPainter.paintClick);
  gridCells[i].addEventListener("mouseover", pixelPainter.paintDrag);
  gridCells[i].style.backgroundColor = "white";
}

//add select color event listeners and background colors to swatch cells
for (let i = 0; i < swatchCells.length; i++) {
  swatchCells[i].addEventListener("click", pixelPainter.selectColor);
  swatchCells[i].style.backgroundColor = palette[i];
}

//add event listener for clear button
clearButton.addEventListener("click", pixelPainter.clear);

//add event listener for erase button
eraserButton.addEventListener("click", pixelPainter.erase);

//add event listener for color input
colorPicker.addEventListener("input", pixelPainter.inputColor);
