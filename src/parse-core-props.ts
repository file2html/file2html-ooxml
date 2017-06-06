import {parseXML} from 'file2html-xml-tools/lib/sax';
import {FileMetaInformation} from 'file2html';

export default function parseCoreProps (fileContent: string, fileMetaInformation: FileMetaInformation) {
    let metaInfoProp: string;

    parseXML(fileContent, {
        onopentag (tagName: string) {
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
        onclosetag () {
            metaInfoProp = undefined;
        },
        ontext (textContent: string) {
            if (metaInfoProp) {
                fileMetaInformation[metaInfoProp] = textContent;
            }
        }
    });
}