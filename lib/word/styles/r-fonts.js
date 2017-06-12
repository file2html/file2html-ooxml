"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rFontsStyle(style, attributes) {
    var fontFamily = attributes['w:ascii'];
    if (fontFamily) {
        style += 'font-family:' + fontFamily + ';';
    }
    return style;
}
exports.default = rFontsStyle;
