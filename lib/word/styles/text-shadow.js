"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function textShadowStyle(style, attributes, tagName) {
    var value = attributes['w:val'];
    if (!value || value === 'true' || value === '1') {
        var emboss = tagName.indexOf('emboss') >= 0;
        if (emboss) {
            style += 'color:#FFFFFF;';
        }
        style += 'text-shadow:0 1px 0 rgba(255,255,255,0.5);';
    }
    return style;
}
exports.default = textShadowStyle;
