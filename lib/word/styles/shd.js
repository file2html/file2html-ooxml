"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shadingStyle(style, attributes) {
    var backgroundColor = attributes['w:fill'];
    if (backgroundColor && backgroundColor !== 'auto') {
        style += 'background-color:#' + backgroundColor + ';';
    }
    return style;
}
exports.default = shadingStyle;
