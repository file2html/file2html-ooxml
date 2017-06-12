"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function italicStyle(style, attributes) {
    var value = attributes['w:val'];
    if (value !== '0' && value !== 'false') {
        style += 'font-style:italic;';
    }
    return style;
}
exports.default = italicStyle;
