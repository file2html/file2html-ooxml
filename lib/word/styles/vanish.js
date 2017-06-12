"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vanishStyle(style, attributes) {
    var value = attributes['w:val'];
    if (value !== '0' && value !== 'false') {
        style += 'visibility:hidden;';
    }
    return style;
}
exports.default = vanishStyle;
