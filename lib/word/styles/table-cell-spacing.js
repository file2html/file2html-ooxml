"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var twip_to_px_1 = require("../../twip-to-px");
function tableCellSpacingStyle(style, attributes) {
    var value = attributes['w:w'];
    var type = attributes['w:type'];
    if (!value) {
        return style;
    }
    switch (type) {
        case 'nil':
            style += 'border-collapse:collapse;border-spacing:0;';
            break;
        case 'pct':
            style += "border-collapse:separate;border-spacing:" + Number(value) / 50 + "%;";
            break;
        case 'dxa':
            style += "border-collapse:separate;border-spacing:" + twip_to_px_1.default(value) + "px;";
            break;
        default:
    }
    return style;
}
exports.default = tableCellSpacingStyle;
