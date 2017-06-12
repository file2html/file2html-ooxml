"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var twip_to_px_1 = require("../../twip-to-px");
function tableIndentStyle(style, attributes) {
    var width = attributes['w:w'];
    var type = attributes['w:type'];
    switch (type) {
        case 'nil':
            style += 'margin-left:0;';
            break;
        case 'dxa':
            style += "margin-left:" + twip_to_px_1.default(width) + "px;";
            break;
        default:
    }
    return style;
}
exports.default = tableIndentStyle;
