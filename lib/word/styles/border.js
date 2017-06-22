"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pt_to_px_1 = require("../../pt-to-px");
function textAlignmentStyle(style, attributes, tagName) {
    var size = attributes['w:sz'];
    var color = attributes['w:color'];
    var type = attributes['w:val'];
    if (size && color && type && type !== 'nil' && type !== 'none') {
        switch (type) {
            case 'dashed':
            case 'dotted':
            case 'double':
            case 'inset':
            case 'outset':
                break;
            default:
                type = 'solid';
        }
        var ruleName = void 0;
        if (tagName.indexOf('top') >= 0) {
            ruleName = 'border-top';
        }
        else if (tagName.indexOf('bottom') >= 0) {
            ruleName = 'border-bottom';
        }
        else if (tagName.indexOf('left') >= 0) {
            ruleName = 'border-left';
        }
        else if (tagName.indexOf('right') >= 0) {
            ruleName = 'border-right';
        }
        if (color === 'auto') {
            color = 'currentColor';
        }
        else {
            color = '#' + color;
        }
        var borderWidth = Math.ceil(pt_to_px_1.default(size, 8));
        // 1px is a minimal border width
        if (size && size !== '0' && !borderWidth) {
            borderWidth = 1;
        }
        style += ruleName + ":" + borderWidth + "px " + type + " " + color + ";";
    }
    return style;
}
exports.default = textAlignmentStyle;
