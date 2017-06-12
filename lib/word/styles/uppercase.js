"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uppercaseStyle(style, attributes) {
    var value = attributes['w:val'];
    if (!value || value === 'true' || value === '1') {
        style += 'text-transform:uppercase;';
    }
    return style;
}
exports.default = uppercaseStyle;
