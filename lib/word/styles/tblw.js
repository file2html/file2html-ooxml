"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var twip_to_px_1 = require("../../twip-to-px");
function tableWidthStyle(style, attributes) {
    var width = attributes['w:w'];
    var type = attributes['w:type'];
    if (!width) {
        return style;
    }
    switch (type) {
        case 'nil':
            style += 'width:0;';
            break;
        case 'pct':
            style += "width:" + Number(width) / 50 + "%;";
            break;
        case 'dxa':
            style += "width:" + twip_to_px_1.default(width) + "px;";
            break;
        default:
    }
    return style;
}
exports.default = tableWidthStyle;
