import {parseXML} from 'file2html-xml-tools/lib/sax';
import matchStyleTag from './match-style-tag';
import stringifyStylesheet from './stringify-stylesheet';

export default function parseDocumentStyles (fileContent: string): string {
    const stylesheet: {[key: string]: string} = {
        // reset default browser styles
        '.tbl': 'border-collapse:collapse;'
    };
    let selector: string = '';
    let isTextTag: boolean = false;

    parseXML(fileContent, {
        onopentag (tagName: string, attributes: {[key: string]: string}) {
            switch (tagName) {
                case 'w:pPrDefault':
                case 'w:rPrDefault':
                    if (tagName === 'w:pPrDefault') {
                        selector = '.p';
                    } else {
                        selector = '.r';
                        isTextTag = true;
                    }
                    break;
                case 'w:rPr':
                    if (!isTextTag) {
                        selector += ' .r';
                    }
                    break;
                case 'w:style':
                    const styleId: string = attributes['w:styleId'];

                    if (attributes['w:type'] === 'character') {
                        isTextTag = true;
                    }

                    if (styleId) {
                        selector += `.${ styleId }`;
                    }
                    break;
                default:
                    if (selector) {
                        stylesheet[selector] = matchStyleTag({
                            tagName,
                            attributes,
                            styles: stylesheet[selector] || ''
                        });
                    }
            }
        },
        onclosetag (tagName: string) {
            switch (tagName) {
                case 'w:pPrDefault':
                case 'w:rPrDefault':
                case 'w:style':
                    selector = '';
                    isTextTag = false;
                    break;
                default:

            }
        }
    });

    return stringifyStylesheet(stylesheet);
}