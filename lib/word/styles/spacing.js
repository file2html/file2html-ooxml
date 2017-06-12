"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pt_to_px_1 = require("../../pt-to-px");
function spacingStyle(style, attributes) {
    var beforeAutospacing = attributes['w:beforeAutospacing'];
    var afterAutospacing = attributes['w:afterAutospacing'];
    var before = attributes['w:before'];
    var after = attributes['w:after'];
    var line = attributes['w:line'];
    if (line) {
        style += 'line-height:' + (Number(line) / 240) + ';';
    }
    if (before && beforeAutospacing !== '1' && beforeAutospacing !== 'true') {
        style += 'margin-top:' + pt_to_px_1.default(before, 20) + 'px;';
    }
    if (after && afterAutospacing !== '1' && afterAutospacing !== 'true') {
        style += 'margin-bottom:' + pt_to_px_1.default(after, 20) + 'px;';
    }
    return style;
}
exports.default = spacingStyle;
