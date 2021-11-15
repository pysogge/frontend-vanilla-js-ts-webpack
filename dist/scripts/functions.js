"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padLeadingZeros = void 0;
function padLeadingZeros(num, size) {
    let s = num.toString(10) + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}
exports.padLeadingZeros = padLeadingZeros;
