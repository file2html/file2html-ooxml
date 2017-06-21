import {parseXML} from 'file2html-xml-tools/lib/sax';
import matchStyleTag from './match-style-tag';
import twipToPx from '../twip-to-px';
import stringifyStylesheet from './stringify-stylesheet';

interface HTMLTags {
    [key: string]: string;
}

interface ElementInfo {
    tagNameEnding: number;
    className: string;
}

export interface DocumentContentParsingOptions {
    prettify?: boolean;
}

export default function parseDocumentContent (
    fileContent: string,
    options?: DocumentContentParsingOptions
): {styles: string; content: string;} {
    const prettify: boolean = Boolean(options && options.prettify);
    const prettifyTagStart: (tag: string) => string = (tag: string) => prettify ? `\n${ tag }` : tag;
    const openedHTMLTags: HTMLTags = {
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
    const closedHTMLTags: HTMLTags = {
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
    const newLineTag: string = '<br/>';
    const unfinishedTagEnding: string = '>';
    const stylesheet: {[key: string]: string;} = {};
    let content: string = '';
    let isTextTag: boolean;
    let isUnfinishedTag: boolean;
    let isTextContentEnabled: boolean;

    // stylesheet
    const elementsInfo: {[key: string]: ElementInfo} = {};
    let elementIndex: number = -1;
    let elementsCount: number = 0;
    let selector: string = '';

    function endTag (textContent?: string) {
        if (isUnfinishedTag) {
            content += unfinishedTagEnding;
        }

        if (textContent && isTextContentEnabled) {
            content += textContent;
        }

        isTextContentEnabled = false;
        isUnfinishedTag = false;
    }

    parseXML(fileContent, {
        onopentag (tagName: string, attributes: {[key: string]: string}) {
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
                    const className: string = `element-${ elementsCount }`;

                    elementIndex++;
                    elementsCount++;
                    selector = `.${ className }`;
                    elementsInfo[elementIndex] = {
                        tagNameEnding: content.length,
                        className: `${ tagName.slice(2) } ${ className }`
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
                    const elClassName: string = attributes['w:val'];

                    if (elClassName) {
                        elementsInfo[elementIndex].className += ` ${ elClassName }`;
                    }
                    break;
                case 'w:bookmarkStart':
                    const name: string = attributes['w:name'];

                    if (name) {
                        content += (
                            openedHTMLTags.bookmark +
                            name +
                            '">' +
                            closedHTMLTags.bookmark
                        );
                    }
                    break;
                case 'w:gridSpan':
                    const colSpan: string = attributes['w:val'];

                    if (colSpan && elementIndex >= 0) {
                        const {tagNameEnding} = elementsInfo[elementIndex];

                        content = (
                            content.slice(0, tagNameEnding) + ` colspan="${ colSpan }"` + content.slice(tagNameEnding)
                        );
                    }
                    break;
                case 'w:tblCaption':
                    content += `${ openedHTMLTags.caption }>${ attributes['w:val'] || '' }${ closedHTMLTags.caption }`;
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
                    const anchor: string = attributes['w:anchor'];

                    if (anchor) {
                        content += ` href="#${ anchor }"`;
                    }
                    break;
                case 'w:gridCol':
                    isUnfinishedTag = true;
                    content += openedHTMLTags[tagName];

                    const colWidth: string = attributes['w:w'];

                    if (colWidth) {
                        content += ` width="${ twipToPx(colWidth) }px"`;
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
            endTag();

            switch (tagName) {
                case 'w:p':
                case 'w:r':
                case 'w:tbl':
                case 'w:tr':
                case 'w:tc':
                    if (elementIndex >= 0) {
                        const {tagNameEnding, className} = elementsInfo[elementIndex];

                        content = (
                            content.slice(0, tagNameEnding) + ` class="${ className }"` + content.slice(tagNameEnding)
                        );
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
                //
            }
        },
        ontext (textContent: string) {
            endTag(textContent);
        }
    });

    return {
        styles: stringifyStylesheet(stylesheet),
        content: `<div>${ content }</div>`
    };
}