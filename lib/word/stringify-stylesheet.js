"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringifyStylesheet(stylesheet) {
    var styles = '';
    for (var selector in stylesheet) {
        if (stylesheet.hasOwnProperty(selector)) {
            var rules = stylesheet[selector];
            if (rules) {
                styles += selector + "{" + rules + "}\n";
            }
        }
    }
    return styles;
}
exports.default = stringifyStylesheet;
