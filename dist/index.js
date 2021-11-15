"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { padLeadingZeros } from "./scripts/functions";
const lodash_1 = __importDefault(require("lodash"));
const divApp = document.querySelector("#app");
console.info(divApp);
let namingZeros = 3;
for (let i = 0; i < 3; i++) {
    if (divApp !== null) {
        let appTable = (document.createElement("table"));
        // appTable.setAttribute("id", "table-" + padLeadingZeros(i, 2));
        appTable.setAttribute("id", "table-" + i.toString());
    }
    divApp !== null
        ? divApp.appendChild(document.createElement("table"))
        : console.log("divApp is null");
}
console.info(divApp);
function component() {
    const element = document.createElement("div");
    element.innerHTML = lodash_1.default.join(["Hello", "webpack"], " ");
    return element;
}
document.body.appendChild(component());
