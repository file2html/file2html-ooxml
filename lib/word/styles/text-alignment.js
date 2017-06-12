"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function textAlignmentStyle(style, attributes) {
    var verticalAlign = attributes['w:val'];
    switch (verticalAlign) {
        case 'baseline':
        case 'bottom':
        case 'top':
            break;
        case 'center':
            verticalAlign = 'middle';
            break;
        case 'subscript':
            verticalAlign = 'sub';
            break;
        case 'superscript':
            verticalAlign = 'super';
            break;
        default:
            verticalAlign = '';
    }
    if (verticalAlign) {
        style += 'vertical-align:' + verticalAlign + ';';
    }
    return style;
}
exports.default = textAlignmentStyle;
