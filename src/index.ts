import * as file2html from 'file2html';
import {readArchive, Archive, ArchiveEntrySerialization} from 'file2html-archive-tools';
import parseCoreProps from './parse-core-props';
import parseDocumentContent from './word/parse-document-content';
import parseDocumentStyles from './word/parse-document-styles';
import parseDocumentRelations from './word/parse-document-relations';

const documentMimeType: string = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const supportedMimeTypes: string[] = [documentMimeType];

export default class OOXMLReader extends file2html.Reader {
    read ({fileInfo}: file2html.ReaderParams) {
        const {content} = fileInfo;
        const {byteLength} = content;

        return readArchive(content).then((archive: Archive) => {
            const meta: file2html.FileMetaInformation = Object.assign({
                fileType: file2html.FileTypes.document,
                mimeType: '',
                name: '',
                size: byteLength,
                creator: '',
                createdAt: '',
                modifiedAt: ''
            }, fileInfo.meta);
            const queue: Promise<any>[] = [];
            const dataType: ArchiveEntrySerialization = 'string';
            let styles: string = '';
            let content: string = '<div></div>';
            let isDocument: boolean = false;
            let relations: {[key: string]: string} = {};

            if (archive.files['word/document.xml']) {
                isDocument = true;
                meta.fileType = file2html.FileTypes.document;
                meta.mimeType = documentMimeType;
            } else {
                // TODO: support Presentations and Spreadsheets
                return Promise.reject(new Error('Invalid file format')) as any;
            }

            if (isDocument) {
                queue.push(archive.file('word/_rels/document.xml.rels').async(dataType).then((data: string) => {
                    return parseDocumentRelations(data, archive).then((documentRelations) => {
                        relations = documentRelations;
                    });
                }));
            }

            return Promise.all(queue).then(() => {
                const queue: Promise<any>[] = [];

                queue.push(archive.file('docProps/core.xml').async(dataType).then((data: string) => {
                    return parseCoreProps(data, meta);
                }));

                if (isDocument) {
                    queue.push(archive.file('word/styles.xml').async(dataType).then((data: string) => {
                        return parseDocumentStyles(data);
                    }).then((documentStyles: string) => {
                        styles += '\n' + documentStyles;
                    }));
                    queue.push(archive.file('word/document.xml').async(dataType).then((data: string) => {
                        return parseDocumentContent(data, {
                            relations
                        });
                    }).then((data: {styles: string; content: string;}) => {
                        styles += '\n' + data.styles;
                        content = data.content;
                    }));
                }

                return Promise.all(queue).then(() => new file2html.File({
                    meta,
                    styles: `<style>${ styles }</style>`,
                    content
                }));
            });
        });
    }

    static testFileMimeType (mimeType: string) {
        return supportedMimeTypes.indexOf(mimeType) >= 0;
    }
}