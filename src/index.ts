import * as file2html from 'file2html';
import {readArchive, Archive, ArchiveEntrySerialization, ArchiveEntry} from 'file2html-archive-tools';
import parseCoreProps from './parse-core-props';
import parseDocumentContent from './word/parse-document-content';
import parseDocumentStyles from './word/parse-document-styles';

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

            if (archive.files['word/document.xml']) {
                meta.fileType = file2html.FileTypes.document;
                meta.mimeType = documentMimeType;
            } else {
                // TODO: support Presentations and Spreadsheets
                return Promise.reject(new Error('Invalid file format')) as any;
            }

            archive.forEach((relativePath: string, entry: ArchiveEntry) => {
                switch (relativePath) {
                    case 'docProps/core.xml':
                        queue.push(entry.async(dataType).then((data: string) => parseCoreProps(data, meta)));
                        break;
                    case 'word/styles.xml':
                        queue.push(entry.async(dataType).then((data: string) => {
                            return parseDocumentStyles(data);
                        }).then((documentStyles: string) => {
                            styles += '\n' + documentStyles;
                        }));
                        break;
                    case 'word/document.xml':
                        queue.push(entry.async(dataType).then((data: string) => {
                            return parseDocumentContent(data);
                        }).then((data: {styles: string; content: string;}) => {
                            styles += '\n' + data.styles;
                            content = data.content;
                        }));
                        break;
                    default:
                    //
                }
            });

            return Promise.all(queue).then(() => new file2html.File({
                meta,
                styles: `<style>${ styles }</style>`,
                content
            }));
        });
    }

    static testFileMimeType (mimeType: string) {
        return supportedMimeTypes.indexOf(mimeType) >= 0;
    }
}