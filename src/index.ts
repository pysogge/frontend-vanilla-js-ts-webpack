import { padLeadingZeros } from "./scripts/functions";
import _ from "lodash";

const DEBUG: boolean = true;

DEBUG ? console.log("DEBUG: ", DEBUG) : null;

document.title = "Pysogge Canvas";

DEBUG ? console.log("document.title: ", document.title) : null;

// const canvasState = [];

//** Header */

//** Navigation */

//** Application */

const divApp: HTMLDivElement = <HTMLDivElement>document.querySelector("#app");

DEBUG ? console.info(divApp) : null;

const numCanvasTables: number = 1;
const numLeadingZeros: number = 3;

function makeCanvasTables(
  parentDiv: HTMLDivElement,
  numTables: number = 1
): HTMLTableElement[] {
  let returnTables: HTMLTableElement[] = [];

  for (let i: number = 0; i < numTables; i++) {
    if (parentDiv !== null) {
      let appTable: HTMLTableElement = <HTMLTableElement>(
        document.createElement("table")
      );
      appTable.setAttribute(
        "id",
        "table-" + padLeadingZeros(i, numLeadingZeros)
      );
      // append element to app div, only if div exists
      parentDiv !== null
        ? (parentDiv.appendChild(appTable), returnTables.push(appTable))
        : DEBUG
        ? console.info("parentDiv is null")
        : null;
      DEBUG ? console.info(appTable) : null;
    }
  }
  return returnTables;
}

function makeCanvasElements(
  table: HTMLTableElement,
  rows: number = 100,
  cols: number = 100
): void {
  // table > tr > td
  for (let i: number = 0; i < rows; i++) {
    let row: HTMLTableRowElement = <HTMLTableRowElement>(
      document.createElement("tr")
    );
    row.setAttribute("id", "row-" + padLeadingZeros(i, numLeadingZeros));
    table.appendChild(row);
  }

  Array.from(table.children).forEach((tr, rowIndex) => {
    for (let i: number = 0; i < cols; i++) {
      let cell: HTMLTableCellElement = <HTMLTableCellElement>(
        document.createElement("td")
      );
      cell.setAttribute(
        "id",
        "cell-" +
          padLeadingZeros(rowIndex, numLeadingZeros) +
          "-" +
          padLeadingZeros(i, numLeadingZeros)
      );
      tr.appendChild(cell);
    }
  });
}

// let tables : HTMLTableElement[] = makeCanvasTables(divApp,1);
let mainTable: HTMLTableElement = <HTMLTableElement>(
  makeCanvasTables(divApp, numCanvasTables)[0]
);
DEBUG ? console.info(mainTable) : null;
makeCanvasElements(mainTable, 100, 100);

function component(): HTMLDivElement {
  const element: HTMLDivElement = <HTMLDivElement>document.createElement("div");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
// let colorSelector: HTMLSelectElement = <HTMLSelectElement>(
//   document.querySelector("#color-selector")
// );
// colorSelector.value = "NotEraser";

/* PAINT ELEMENTS */

/* Color Selector */

const aside2: HTMLElement = <HTMLElement>document.querySelector(".aside-2");

const defaultColors: string[] = [
  "Black",
  "White",
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Erase",
];
const colorSelector: HTMLSelectElement = document.createElement("select");
colorSelector.setAttribute("id", "color-selector");
aside2.appendChild(colorSelector);

//Create and append the options
for (let i: number = 0; i < defaultColors.length; i++) {
  let option: HTMLOptionElement = document.createElement("option");
  option.value = defaultColors[i].toLowerCase();
  option.text = defaultColors[i];
  colorSelector.appendChild(option);
}

function changeColor(cell: HTMLElement): void {
  if (!(cell instanceof HTMLTableCellElement)) {
    return;
  } else {
    // Color it
    if (colorSelector.value !== "eraser") {
      cell.setAttribute("class", colorSelector.value);
    } else if (colorSelector.value == "eraser") {
      cell.removeAttribute("class");
    }
  }
}

let isDown = false;

mainTable.addEventListener("mousedown", (event) => {
  if (event.target !== null && event.target instanceof HTMLTableCellElement) {
    let mousedowncell: HTMLTableCellElement = <HTMLTableCellElement>(
      event.target!
    );
    changeColor(mousedowncell);
  }

  isDown = true;
});

mainTable.addEventListener("mouseover", (event) => {
  if (isDown) {
    if (event.target !== null && event.target instanceof HTMLTableCellElement) {
      let cell: HTMLTableCellElement = <HTMLTableCellElement>event.target!;
      changeColor(cell);
    }
  }
});

document.addEventListener("mouseup", (e) => {
  isDown = false;
});
