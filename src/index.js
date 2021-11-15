"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./scripts/functions");
var lodash_1 = __importDefault(require("lodash"));
var DEBUG = true;
DEBUG ? console.log("DEBUG: ", DEBUG) : null;
document.title = "Pysogge Canvas";
DEBUG ? console.log("document.title: ", document.title) : null;
// const canvasState = [];
//** Header */
//** Navigation */
//** Application */
var divApp = document.querySelector("#app");
DEBUG ? console.info(divApp) : null;
var numCanvasTables = 1;
var numLeadingZeros = 3;
function makeCanvasTables(parentDiv, numTables) {
    if (numTables === void 0) { numTables = 1; }
    var returnTables = [];
    for (var i = 0; i < numTables; i++) {
        if (parentDiv !== null) {
            var appTable = (document.createElement("table"));
            appTable.setAttribute("id", "table-" + (0, functions_1.padLeadingZeros)(i, numLeadingZeros));
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
function makeCanvasElements(table, rows, cols) {
    if (rows === void 0) { rows = 100; }
    if (cols === void 0) { cols = 100; }
    // table > tr > td
    for (var i = 0; i < rows; i++) {
        var row = (document.createElement("tr"));
        row.setAttribute("id", "row-" + (0, functions_1.padLeadingZeros)(i, numLeadingZeros));
        table.appendChild(row);
    }
    Array.from(table.children).forEach(function (tr, rowIndex) {
        for (var i = 0; i < cols; i++) {
            var cell = (document.createElement("td"));
            cell.setAttribute("id", "cell-" +
                (0, functions_1.padLeadingZeros)(rowIndex, numLeadingZeros) +
                "-" +
                (0, functions_1.padLeadingZeros)(i, numLeadingZeros));
            tr.appendChild(cell);
        }
    });
}
// let tables : HTMLTableElement[] = makeCanvasTables(divApp,1);
var mainTable = (makeCanvasTables(divApp, numCanvasTables)[0]);
DEBUG ? console.info(mainTable) : null;
makeCanvasElements(mainTable, 100, 100);
function component() {
    var element = document.createElement("div");
    element.innerHTML = lodash_1.default.join(["Hello", "webpack"], " ");
    return element;
}
document.body.appendChild(component());
// let colorSelector: HTMLSelectElement = <HTMLSelectElement>(
//   document.querySelector("#color-selector")
// );
// colorSelector.value = "NotEraser";
/* PAINT ELEMENTS */
/* Color Selector */
var aside2 = document.querySelector(".aside-2");
var defaultColors = [
    "Black",
    "White",
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Erase",
];
var colorSelector = document.createElement("select");
colorSelector.setAttribute("id", "color-selector");
aside2.appendChild(colorSelector);
//Create and append the options
for (var i = 0; i < defaultColors.length; i++) {
    var option = document.createElement("option");
    option.value = defaultColors[i].toLowerCase();
    option.text = defaultColors[i];
    colorSelector.appendChild(option);
}
function changeColor(cell) {
    if (!(cell instanceof HTMLTableCellElement)) {
        return;
    }
    else {
        // Color it
        if (colorSelector.value !== "eraser") {
            cell.setAttribute("class", colorSelector.value);
        }
        else if (colorSelector.value == "eraser") {
            cell.removeAttribute("class");
        }
    }
}
var isDown = false;
mainTable.addEventListener("mousedown", function (event) {
    if (event.target !== null && event.target instanceof HTMLTableCellElement) {
        var mousedowncell = (event.target);
        changeColor(mousedowncell);
    }
    isDown = true;
});
mainTable.addEventListener("mouseover", function (event) {
    if (isDown) {
        if (event.target !== null && event.target instanceof HTMLTableCellElement) {
            var cell = event.target;
            changeColor(cell);
        }
    }
});
document.addEventListener("mouseup", function (e) {
    isDown = false;
});
