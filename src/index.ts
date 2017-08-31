import * as file2html from 'file2html';
import * as mime from 'file2html/lib/mime';
import {errorsNamespace} from 'file2html/lib/errors';
import {parseXML} from 'file2html-xml-tools/lib/sax';
import {readArchive, Archive, ArchiveEntry, ArchiveEntrySerialization} from 'file2html-archive-tools';
import parseCoreProps from './parse-core-props';
import parseDocumentContent from './word/parse-document-content';
import parseDocumentStyles from './word/parse-document-styles';
import parseDocumentRelations from './word/parse-document-relations';

const documentMimeType: string = mime.lookup('.docx');

// TODO: support Presentations and Spreadsheets
const supportedMimeTypes: string[] = [documentMimeType];

export default class OOXMLReader extends file2html.Reader {
    read ({fileInfo}: file2html.ReaderParams) {
        const {content} = fileInfo;
        const {byteLength} = content;

        return readArchive(content).then((archive: Archive) => {
            function getInvalidFileError (message?: string) {
                const archiveTree: string = Object.keys(archive.files || {}).join(',\n');

                return Promise.reject(new Error(
                    `${ errorsNamespace }.invalidFile. Archive: [${ archiveTree }].${ message || ''}`
                )) as any;
            }

            const documentRelations: ArchiveEntry = archive.file('_rels/.rels');

            if (!documentRelations) {
                return getInvalidFileError();
            }

            return documentRelations.async('string').then((documentRelationsContent: string) => {
                let corePropertiesEntryPath: string;
                let documentEntryPath: string;

                parseXML(documentRelationsContent, {
                    onopentag (tagName: string, attrs: {[key: string]: string}) {
                        if (tagName === 'Relationship') {
                            const {Type, Target} = attrs;

                            if (!Target) {
                                return;
                            }

                            if (Type.indexOf('officeDocument') > 0) {
                                documentEntryPath = Target;
                            } else if (Type.indexOf('core-properties') > 0) {
                                corePropertiesEntryPath = Target;
                            }
                        }
                    }
                });

                const documentEntry: ArchiveEntry = documentEntryPath && archive.file(documentEntryPath);

                if (!documentEntry) {
                    return getInvalidFileError(`\ndocumentEntry not found,\n${ documentRelationsContent }`);
                }

                const documentFilename: string = documentEntryPath.split('/').pop();
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
                let relations: {[key: string]: string} = {};
                const relationsEntry: ArchiveEntry = archive.file(`word/_rels/${ documentFilename }.rels`);

                if (relationsEntry) {
                    queue.push(relationsEntry.async(dataType).then((data: string) => {
                        return parseDocumentRelations(data, archive).then((documentRelations) => {
                            relations = documentRelations;
                        });
                    }));
                }

                return Promise.all(queue).then(() => {
                    const queue: Promise<any>[] = [];
                    const coreProperties: ArchiveEntry = (
                        corePropertiesEntryPath &&
                        archive.file(corePropertiesEntryPath)
                    );

                    if (coreProperties) {
                        queue.push(coreProperties.async(dataType).then((data: string) => parseCoreProps(data, meta)));
                    }

                    // is WordProcessingML
                    if (meta.mimeType === documentMimeType) {
                        const stylesEntry = archive.file('word/styles.xml');

                        if (stylesEntry) {
                            queue.push(stylesEntry.async(dataType).then((data: string) => {
                                return parseDocumentStyles(data);
                            }).then((documentStyles: string) => {
                                styles += '\n' + documentStyles;
                            }));
                        }

                        queue.push(documentEntry.async(dataType).then((data: string) => {
                            return parseDocumentContent(data, {
                                relations
                            });
                        }).then((data: {styles: string; content: string}) => {
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
        });
    }

    static testFileMimeType (mimeType: string) {
        return supportedMimeTypes.indexOf(mimeType) >= 0;
    }
}