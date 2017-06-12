"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function justificationStyle(style, attributes) {
    var textAlign = attributes['w:val'];
    switch (textAlign) {
        case 'start':
        case 'left':
            textAlign = 'left';
            break;
        case 'end':
        case 'right':
            textAlign = 'right';
            break;
        case 'center':
            break;
        case 'both':
        case 'distribute':
            textAlign = 'justify';
            break;
        default:
            textAlign = '';
    }
    if (textAlign) {
        style += 'text-align:' + textAlign + ';';
    }
    return style;
}
exports.default = justificationStyle;
