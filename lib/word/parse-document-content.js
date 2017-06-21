"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sax_1 = require("file2html-xml-tools/lib/sax");
var match_style_tag_1 = require("./match-style-tag");
var twip_to_px_1 = require("../twip-to-px");
var stringify_stylesheet_1 = require("./stringify-stylesheet");
function parseDocumentContent(fileContent, options) {
    var prettify = Boolean(options && options.prettify);
    var prettifyTagStart = function (tag) { return prettify ? "\n" + tag : tag; };
    var openedHTMLTags = {
        'w:p': prettifyTagStart('<p'),
        'w:r': prettifyTagStart('<span'),
        'w:tbl': prettifyTagStart('<table'),
        'w:tblGrid': prettifyTagStart('<colgroup'),
        'w:gridCol': prettifyTagStart('<col'),
        'w:hyperlink': prettifyTagStart('<a'),
        'w:tr': prettifyTagStart('<tr'),
        'w:tc': prettifyTagStart('<td'),
        a: prettifyTagStart('<a'),
        caption: prettifyTagStart('<caption'),
        bookmark: prettifyTagStart('<a name="')
    };
    var closedHTMLTags = {
        'w:p': '</p>',
        'w:r': '</span>',
        'w:tbl': '</table>',
        'w:tblGrid': '</colgroup>',
        'w:gridCol': '</col>',
        'w:hyperlink': '</a>',
        'w:tr': '</tr>',
        'w:tc': '</td>',
        a: '</a>',
        caption: '</caption>',
        bookmark: '</a>'
    };
    var newLineTag = '<br/>';
    var unfinishedTagEnding = '>';
    var stylesheet = {};
    var content = '';
    var isTextTag;
    var isUnfinishedTag;
    var isTextContentEnabled;
    // stylesheet
    var elementsInfo = {};
    var elementIndex = -1;
    var elementsCount = 0;
    var selector = '';
    function endTag(textContent) {
        if (isUnfinishedTag) {
            content += unfinishedTagEnding;
        }
        if (textContent && isTextContentEnabled) {
            content += textContent;
        }
        isTextContentEnabled = false;
        isUnfinishedTag = false;
    }
    sax_1.parseXML(fileContent, {
        onopentag: function (tagName, attributes) {
            endTag();
            switch (tagName) {
                case 'w:p':
                case 'w:r':
                case 'w:tbl':
                case 'w:tr':
                case 'w:tc':
                    content += openedHTMLTags[tagName];
                    isUnfinishedTag = true;
                    isTextTag = tagName === 'w:r';
                    var className = "element-" + elementsCount;
                    elementIndex++;
                    elementsCount++;
                    selector = "." + className;
                    elementsInfo[elementIndex] = {
                        tagNameEnding: content.length,
                        className: tagName.slice(2) + " " + className
                    };
                    break;
                case 'w:t':
                    isTextContentEnabled = true;
                    break;
                case 'w:rPr':
                    if (!isTextTag) {
                        selector += ' .r';
                    }
                    break;
                case 'w:pStyle':
                case 'w:rStyle':
                case 'w:tblStyle':
                    var elClassName = attributes['w:val'];
                    if (elClassName) {
                        elementsInfo[elementIndex].className += " " + elClassName;
                    }
                    break;
                case 'w:bookmarkStart':
                    var name_1 = attributes['w:name'];
                    if (name_1) {
                        content += (openedHTMLTags.bookmark +
                            name_1 +
                            '">' +
                            closedHTMLTags.bookmark);
                    }
                    break;
                case 'w:gridSpan':
                    var colSpan = attributes['w:val'];
                    if (colSpan && elementIndex >= 0) {
                        var tagNameEnding = elementsInfo[elementIndex].tagNameEnding;
                        content = (content.slice(0, tagNameEnding) + (" colspan=\"" + colSpan + "\"") + content.slice(tagNameEnding));
                    }
                    break;
                case 'w:tblCaption':
                    content += openedHTMLTags.caption + ">" + (attributes['w:val'] || '') + closedHTMLTags.caption;
                    break;
                case 'w:tblGrid':
                    isUnfinishedTag = true;
                    content += openedHTMLTags[tagName];
                    break;
                case 'w:numPr':
                    stylesheet[selector] += 'display:list-item;list-style-type:disc;';
                    break;
                case 'w:hyperlink':
                    isUnfinishedTag = true;
                    content += openedHTMLTags[tagName];
                    var anchor = attributes['w:anchor'];
                    if (anchor) {
                        content += " href=\"#" + anchor + "\"";
                    }
                    break;
                case 'w:gridCol':
                    isUnfinishedTag = true;
                    content += openedHTMLTags[tagName];
                    var colWidth = attributes['w:w'];
                    if (colWidth) {
                        content += " width=\"" + twip_to_px_1.default(colWidth) + "px\"";
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
            endTag();
            switch (tagName) {
                case 'w:p':
                case 'w:r':
                case 'w:tbl':
                case 'w:tr':
                case 'w:tc':
                    if (elementIndex >= 0) {
                        var _a = elementsInfo[elementIndex], tagNameEnding = _a.tagNameEnding, className = _a.className;
                        content = (content.slice(0, tagNameEnding) + (" class=\"" + className + "\"") + content.slice(tagNameEnding));
                        delete elementsInfo[elementIndex];
                        elementIndex--;
                    }
                    isTextTag = false;
                    content += closedHTMLTags[tagName];
                    selector = '';
                    break;
                case 'w:br':
                case 'w:cr':
                    content += newLineTag;
                    break;
                case 'w:noBreakHyphen':
                    content += '&nbsp;';
                    break;
                case 'w:softHyphen':
                    content += '&shy;';
                    break;
                case 'w:hyperlink':
                case 'w:tblGrid':
                case 'w:gridCol':
                    content += closedHTMLTags[tagName];
                    break;
                default:
            }
        },
        ontext: function (textContent) {
            endTag(textContent);
        }
    });
    return {
        styles: stringify_stylesheet_1.default(stylesheet),
        content: "<div>" + content + "</div>"
    };
}
exports.default = parseDocumentContent;
