"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sax_1 = require("file2html-xml-tools/lib/sax");
function parseCoreProps(fileContent, fileMetaInformation) {
    var metaInfoProp;
    sax_1.parseXML(fileContent, {
        onopentag: function (tagName) {
            switch (tagName) {
                case 'dc:creator':
                    metaInfoProp = 'creator';
                    break;
                case 'dcterms:created':
                    metaInfoProp = 'createdAt';
                    break;
                case 'dcterms:modified':
                    metaInfoProp = 'modifiedAt';
                    break;
                default:
                    metaInfoProp = undefined;
            }
        },
        onclosetag: function () {
            metaInfoProp = undefined;
        },
        ontext: function (textContent) {
            if (metaInfoProp) {
                fileMetaInformation[metaInfoProp] = textContent;
            }
        }
    });
}
exports.default = parseCoreProps;
