"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sax_1 = require("file2html-xml-tools/lib/sax");
var match_style_tag_1 = require("./match-style-tag");
function parseDocumentStyles(fileContent) {
    var stylesheet = {
        // reset default browser styles
        '.tbl': 'border-collapse:collapse;'
    };
    var selector = '';
    var isTextTag = false;
    sax_1.parseXML(fileContent, {
        onopentag: function (tagName, attributes) {
            switch (tagName) {
                case 'w:pPrDefault':
                case 'w:rPrDefault':
                    if (tagName === 'w:pPrDefault') {
                        selector = '.p';
                    }
                    else {
                        selector = '.r';
                        isTextTag = true;
                    }
                    break;
                case 'w:rPr':
                    if (!isTextTag) {
                        selector += ' .r';
                    }
                    break;
                case 'w:style':
                    var styleId = attributes['w:styleId'];
                    if (attributes['w:type'] === 'character') {
                        isTextTag = true;
                    }
                    if (styleId) {
                        selector += "." + styleId;
                    }
                    break;
                default:
                    if (selector) {
                        stylesheet[selector] = match_style_tag_1.default({
                            tagName: tagName,
                            attributes: attributes,
                            styles: stylesheet[selector] || ''
                        });
                    }
            }
        },
        onclosetag: function (tagName) {
            switch (tagName) {
                case 'w:pPrDefault':
                case 'w:rPrDefault':
                case 'w:style':
                    selector = '';
                    isTextTag = false;
                    break;
                default:
            }
        }
    });
    var styles = '';
    for (var selector_1 in stylesheet) {
        if (stylesheet.hasOwnProperty(selector_1)) {
            styles += selector_1 + "{" + stylesheet[selector_1] + "}\n";
        }
    }
    return styles;
}
exports.default = parseDocumentStyles;
