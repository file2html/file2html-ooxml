"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function textDecorationStyle(style, attributes, tagName) {
    var value = attributes['w:val'];
    var strike = tagName.indexOf('strike') >= 0 || value === 'words';
    if (strike) {
        if (!value || value === 'true' || value === '1') {
            style += 'text-decoration:line-through;';
        }
    }
    else if (value !== 'none') {
        switch (value) {
            case 'wave':
            case 'wavyDouble':
            case 'wavyHeavy':
                style += 'text-decoration:underline wavy;';
                break;
            case 'double':
                style += 'text-decoration:underline double;';
                break;
            case 'dashed':
            case 'dashDotDotHeavy':
            case 'dashDotHeavy':
            case 'dashedHeavy':
            case 'dashLong':
            case 'dashLongHeavy':
                style += 'text-decoration:underline dashed;';
                break;
            case 'dotDash':
            case 'dotDotDash':
            case 'dotted':
            case 'dottedHeavy':
                style += 'text-decoration:underline dotted;';
                break;
            default:
                style += 'text-decoration:underline;';
        }
    }
    return style;
}
exports.default = textDecorationStyle;
