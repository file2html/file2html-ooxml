"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var twip_to_px_1 = require("../../twip-to-px");
function indentationStyle(style, attributes) {
    var leftIndent = attributes['w:left'] || attributes['w:start'];
    var rightIndent = attributes['w:right'] || attributes['w:end'];
    var hanging = attributes['w:hanging'];
    var firstLineIndent = attributes['w:firstLine'];
    if (leftIndent) {
        style += 'margin-left:' + twip_to_px_1.default(leftIndent) + 'px;';
    }
    if (rightIndent) {
        style += 'margin-right:' + twip_to_px_1.default(rightIndent) + 'px;';
    }
    if (firstLineIndent && !hanging) {
        style += 'text-indent:' + twip_to_px_1.default(firstLineIndent) + 'px;';
    }
    return style;
}
exports.default = indentationStyle;
