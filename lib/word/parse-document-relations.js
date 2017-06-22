"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sax_1 = require("file2html-xml-tools/lib/sax");
function parseDocumentRelations(fileContent, archive) {
    var relations = {};
    var queue = [];
    sax_1.parseXML(fileContent, {
        onopentag: function (tagName, attrs) {
            if (tagName === 'Relationship') {
                var id_1 = attrs.Id, path = attrs.Target;
                if (id_1 && path.includes('media/')) {
                    queue.push(archive.file(path).async('base64').then(function (data) {
                        relations[id_1] = data;
                    }));
                }
            }
        }
    });
    return Promise.all(queue).then(function () { return relations; });
}
exports.default = parseDocumentRelations;
