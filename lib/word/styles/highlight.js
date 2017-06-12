"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function highlightStyle(style, attributes) {
    var backgroundColor = attributes['w:val'];
    if (backgroundColor) {
        style += 'background-color:' + backgroundColor + ';';
    }
    return style;
}
exports.default = highlightStyle;
