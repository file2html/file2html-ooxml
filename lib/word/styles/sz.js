"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pt_to_px_1 = require("../../pt-to-px");
function textSizeStyle(style, attributes) {
    var size = attributes['w:val'];
    if (size) {
        style += 'font-size:' + pt_to_px_1.default(size, 2) + 'px;';
    }
    return style;
}
exports.default = textSizeStyle;
