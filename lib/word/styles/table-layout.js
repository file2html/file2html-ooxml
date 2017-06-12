"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tableWidthStyle(style, attributes) {
    var type = attributes['w:type'];
    style += "table-layout:" + (type === 'fixed' ? 'fixed' : 'auto') + ";";
    return style;
}
exports.default = tableWidthStyle;
