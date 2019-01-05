const pixelPainter = (function() {
  const pix = document.getElementById("pixelPainter");
  const grid = document.createElement("div");
  const swatch = document.createElement("div");
  const eraserButton = document.createElement("div");
  const clearButton = document.createElement("div");
  const gridCells = grid.getElementsByClassName("cell");
  const swatchCells = swatch.getElementsByClassName("cell");
  const controlPanel = document.createElement("div");
  const colorPicker = document.createElement("input");
  const fillButton = document.createElement("div");
  let activeColor = "";
  let mouseDown = false;
  let fill = false;

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
    if (fill) {
      return;
    }
    this.style.backgroundColor = activeColor;
  }

  function paintDrag() {
    if (fill) {
      return;
    } else if (mouseDown) {
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

  function getCell(x, y) {
    for (let i = 0; i < gridCells.length; i++) {
      let cell = gridCells[i];
      if (
        cell.getAttribute("data-x") == x &&
        cell.getAttribute("data-y") == y
      ) {
        return cell;
      }
    }
  }

  function fillSwitch() {
    fill = !fill;
  }

  function initiateFill() {
    if (fill) {
      const node = this;
      const targetColor = this.style.backgroundColor;
      const replacementColor = activeColor;
      floodFill(node, targetColor, replacementColor);
    }
  }

  function floodFill(node, targetColor, replacementColor) {
    let cellColor = node.style.backgroundColor;
    let x = Number(node.getAttribute("data-x"));
    let y = Number(node.getAttribute("data-y"));
    if (cellColor === replacementColor) {
      return;
    } else if (cellColor !== targetColor) {
      return;
    }
    node.style.backgroundColor = replacementColor;
    floodFill(getCell(x, y - 1), targetColor, replacementColor);
    floodFill(getCell(x, y + 1), targetColor, replacementColor);
    floodFill(getCell(x - 1, y), targetColor, replacementColor);
    floodFill(getCell(x + 1, y), targetColor, replacementColor);
  }

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

  gridMaker(100, 100, grid);
  gridMaker(2, 11, swatch);

  grid.className = "grid";
  swatch.className = "swatch";
  clearButton.className = "clear";
  eraserButton.className = "erase";
  controlPanel.className = "controlPanel";
  colorPicker.className = "color";
  colorPicker.type = "color";
  fillButton.className = "fillButton";

  pix.appendChild(grid);
  pix.appendChild(controlPanel);
  controlPanel.appendChild(swatch);
  controlPanel.appendChild(colorPicker);
  controlPanel.appendChild(eraserButton);
  controlPanel.appendChild(fillButton);
  controlPanel.appendChild(clearButton);

  eraserButton.innerHTML = "Eraser";
  clearButton.innerHTML = "Clear";
  fillButton.innerHTML = "fill";

  //event listeners to track if mouse is down
  document.body.addEventListener("mousedown", function() {
    mouseDown = true;
  });
  document.body.addEventListener("mouseup", function() {
    mouseDown = false;
  });

  //add paint event listeners to grid cells
  for (let i = 0; i < gridCells.length; i++) {
    gridCells[i].style.backgroundColor = "transparent";
    gridCells[i].addEventListener("click", paintClick);
    gridCells[i].addEventListener("mouseover", paintDrag);
    gridCells[i].addEventListener("click", initiateFill);
  }

  //add select color event listeners and background colors to swatch cells
  for (let i = 0; i < swatchCells.length; i++) {
    swatchCells[i].addEventListener("click", selectColor);
    swatchCells[i].style.backgroundColor = palette[i];
  }

  clearButton.addEventListener("click", clear);

  eraserButton.addEventListener("click", erase);

  colorPicker.addEventListener("input", inputColor);

  fillButton.addEventListener("click", fillSwitch);
})();
