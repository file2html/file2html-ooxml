import * as fs from 'fs';
import * as path from 'path';
import parseDocumentContent from '../../../src/word/parse-document-content';

function readFile (filePath): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (error: Error, data: Buffer) => {
            if (error) {
                return reject(error);
            }

            resolve(data.toString('utf-8'));
        });
    });
}

xdescribe('OOXML', () => {
    describe('Wordprocessing', () => {
        describe('parseDocumentContent()', () => {
            it('should parse OOXML document.xml', () => {
                return Promise.all([
                    readFile(path.resolve(__dirname, './document.xml')),
                    readFile(path.resolve(__dirname, './document.html'))
                ]).then(([originContent, parsedContent]) => {
                    const {content, styles} = parseDocumentContent(originContent, {prettify: true});

                    // expect(content).toBe(parsedContent);
                    let openedTagsCount: number = 0;
                    let closedTagsCount: number = 0;
                    const openedTagsPattern: RegExp = /<[a-zA-Z]+/g;
                    const closedTagsPattern: RegExp = /<\/[a-zA-Z]+/g;

                    while (openedTagsPattern.exec(parsedContent)) {
                        openedTagsCount++;
                    }

                    while (closedTagsPattern.exec(parsedContent)) {
                        closedTagsCount++;
                    }

                    expect(openedTagsCount).toBe(closedTagsCount);
                    expect(styles).toBe(`
                        .element-style-1{font-weight:bold;}
                        .element-style-1{font-weight:bold;}
                        .element-style-1{font-weight:bold;}
                        .element-style-1{font-weight:bold;}
                        .element-style-1{font-style:italic;}
                        .element-style-1{font-weight:bold;font-style:italic;}
                        .element-style-1{text-decoration:underline;}
                        .element-style-1{text-decoration:line-through;}
                        .element-style-1{font-weight:bold;font-style:italic;}
                        .element-style-0{font-weight:bold;font-style:italic;}
                        .element-style-0{border-right:1px solid currentColor;background-color:#DDDDDD;text-align:right;}
                        .element-style-0{margin-top:22.5px;margin-left:48px;}
                        .element-style-1{font-size:43.875px;}
                        .element-style-0{line-height:3.9625;font-size:43.875px;}
                    `.trim().replace(/[ ]{2,}/g, '') + '\n');
                });
            });
        });
    });
});