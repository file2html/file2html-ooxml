"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sax_1 = require("file2html-xml-tools/lib/sax");
var mime_1 = require("file2html/lib/mime");
function parseDocumentRelations(fileContent, archive) {
    var relations = {};
    var queue = [];
    sax_1.parseXML(fileContent, {
        onopentag: function (tagName, attrs) {
            if (tagName === 'Relationship') {
                var id_1 = attrs.Id, path_1 = attrs.Target;
                if (id_1 && path_1.includes('media/')) {
                    queue.push(archive.file("word/" + path_1).async('base64').then(function (base64) {
                        relations[id_1] = "data:" + mime_1.lookup(path_1) + ";base64," + base64;
                    }));
                }
            }
        }
    });
    return Promise.all(queue).then(function () { return relations; });
}
exports.default = parseDocumentRelations;
