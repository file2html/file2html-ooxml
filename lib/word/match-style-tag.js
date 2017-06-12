"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jc_1 = require("./styles/jc");
var ind_1 = require("./styles/ind");
var spacing_1 = require("./styles/spacing");
var table_cell_spacing_1 = require("./styles/table-cell-spacing");
var tblw_1 = require("./styles/tblw");
var table_layout_1 = require("./styles/table-layout");
var tblind_1 = require("./styles/tblind");
var border_1 = require("./styles/border");
var shd_1 = require("./styles/shd");
var highlight_1 = require("./styles/highlight");
var r_fonts_1 = require("./styles/r-fonts");
var frame_pr_1 = require("./styles/frame-pr");
var b_1 = require("./styles/b");
var i_1 = require("./styles/i");
var vanish_1 = require("./styles/vanish");
var text_decoration_1 = require("./styles/text-decoration");
var uppercase_1 = require("./styles/uppercase");
var color_1 = require("./styles/color");
var text_shadow_1 = require("./styles/text-shadow");
var sz_1 = require("./styles/sz");
var text_alignment_1 = require("./styles/text-alignment");
function matchStyleTag(_a) {
    var tagName = _a.tagName, attributes = _a.attributes, styles = _a.styles;
    switch (tagName) {
        case 'w:spacing':
            return spacing_1.default(styles, attributes);
        case 'w:tblLayout':
            return table_layout_1.default(styles, attributes);
        case 'w:tblW':
            return tblw_1.default(styles, attributes);
        case 'w:tblCellSpacing':
            return table_cell_spacing_1.default(styles, attributes);
        case 'w:tblInd':
            return tblind_1.default(styles, attributes);
        case 'w:shd':
            return shd_1.default(styles, attributes);
        case 'w:textAlignment':
            return text_alignment_1.default(styles, attributes);
        case 'w:vertAlign':
            return text_alignment_1.default(styles, attributes);
        case 'w:jc':
            return jc_1.default(styles, attributes);
        case 'w:top':
        case 'w:bottom':
        case 'w:left':
        case 'w:right':
            return border_1.default(styles, attributes, tagName);
        case 'w:ind':
            return ind_1.default(styles, attributes);
        case 'w:framePr':
            return frame_pr_1.default(styles, attributes);
        case 'w:b':
            return b_1.default(styles);
        case 'w:i':
            return i_1.default(styles, attributes);
        case 'w:vanish':
            return vanish_1.default(styles, attributes);
        case 'w:rFonts':
            return r_fonts_1.default(styles, attributes);
        case 'w:highlight':
            return highlight_1.default(styles, attributes);
        case 'w:color':
            return color_1.default(styles, attributes);
        case 'w:dstrike':
        case 'w:strike':
        case 'w:u':
            return text_decoration_1.default(styles, attributes, tagName);
        case 'w:caps':
        case 'w:smallCaps':
            return uppercase_1.default(styles, attributes);
        case 'w:emboss':
        case 'w:imprint':
        case 'w:shadow':
            return text_shadow_1.default(styles, attributes, tagName);
        case 'w:sz':
            return sz_1.default(styles, attributes);
        default:
    }
    return styles;
}
exports.default = matchStyleTag;
