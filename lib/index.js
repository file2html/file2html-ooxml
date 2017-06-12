"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var file2html = require("file2html");
var file2html_archive_tools_1 = require("file2html-archive-tools");
var parse_core_props_1 = require("./parse-core-props");
var parse_document_content_1 = require("./word/parse-document-content");
var parse_document_styles_1 = require("./word/parse-document-styles");
var documentMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
var supportedMimeTypes = [documentMimeType];
var OOXMLReader = (function (_super) {
    __extends(OOXMLReader, _super);
    function OOXMLReader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OOXMLReader.prototype.read = function (_a) {
        var fileInfo = _a.fileInfo;
        var content = fileInfo.content;
        var byteLength = content.byteLength;
        return file2html_archive_tools_1.readArchive(content).then(function (archive) {
            var meta = Object.assign({
                fileType: file2html.FileTypes.document,
                mimeType: '',
                name: '',
                size: byteLength,
                creator: '',
                createdAt: '',
                modifiedAt: ''
            }, fileInfo.meta);
            var queue = [];
            var dataType = 'string';
            var styles = '';
            var content = '<div></div>';
            if (archive.files['word/document.xml']) {
                meta.fileType = file2html.FileTypes.document;
                meta.mimeType = documentMimeType;
            }
            else {
                // TODO: support Presentations and Spreadsheets
                return Promise.reject(new Error('Invalid file format'));
            }
            archive.forEach(function (relativePath, entry) {
                switch (relativePath) {
                    case 'docProps/core.xml':
                        queue.push(entry.async(dataType).then(function (data) { return parse_core_props_1.default(data, meta); }));
                        break;
                    case 'word/styles.xml':
                        queue.push(entry.async(dataType).then(function (data) {
                            return parse_document_styles_1.default(data);
                        }).then(function (documentStyles) {
                            styles += '\n' + documentStyles;
                        }));
                        break;
                    case 'word/document.xml':
                        queue.push(entry.async(dataType).then(function (data) {
                            return parse_document_content_1.default(data);
                        }).then(function (data) {
                            styles += '\n' + data.styles;
                            content = data.content;
                        }));
                        break;
                    default:
                }
            });
            return Promise.all(queue).then(function () { return new file2html.File({
                meta: meta,
                styles: "<style>" + styles + "</style>",
                content: content
            }); });
        });
    };
    OOXMLReader.testFileMimeType = function (mimeType) {
        return supportedMimeTypes.indexOf(mimeType) >= 0;
    };
    return OOXMLReader;
}(file2html.Reader));
exports.default = OOXMLReader;
