"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function textColorStyle(style, attributes) {
    var color = attributes['w:val'];
    if (color && color !== 'auto') {
        style += 'color:#' + color + ';';
    }
    return style;
}
exports.default = textColorStyle;
