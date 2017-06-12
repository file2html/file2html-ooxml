"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function framePrStyle(style, attributes) {
    if (attributes['w:dropCap']) {
        style += 'float:left;';
    }
    return style;
}
exports.default = framePrStyle;
