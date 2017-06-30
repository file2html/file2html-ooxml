import * as fs from 'fs';
import * as path from 'path';
import {TextDecoder} from 'text-encoding';
import parseDocumentContent from '../../../src/word/parse-document-content';

const validateCss = require('css-validator');

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

describe('OOXML', () => {
    beforeAll(() => {
        (window as any).TextDecoder = TextDecoder;
    });

    describe('Wordprocessing', () => {
        describe('parseDocumentContent()', () => {
            it('should parse OOXML document.xml', (done) => {
                return readFile(path.resolve(__dirname, './document.xml')).then((originContent: string) => {
                    const {content, styles} = parseDocumentContent(originContent, {
                        relations: {},
                        prettify: true
                    });

                    function getTagsQuantity (content: string, pattern: RegExp) {
                        const tagNames: {[key: string]: number} = {};
                        let parseResult: string[] = [];

                        while (parseResult) {
                            const tagName: string = parseResult[1];

                            if (tagName) {
                                tagNames[tagName] = tagNames[tagName] || 0;
                                tagNames[tagName]++;
                            }

                            parseResult = pattern.exec(content);
                        }

                        return tagNames;
                    }

                    const openedTags: {[key: string]: number} = getTagsQuantity(content, /<([a-zA-Z0-9]+)/g);

                    expect(openedTags).toEqual({
                        a: 39,
                        col: 30,
                        colgroup: 6,
                        div: 1,
                        p: 334,
                        span: 408,
                        table: 6,
                        td: 243,
                        tr: 36
                    });

                    expect(styles.length).toBeGreaterThan(0);

                    validateCss(styles, (error: Error, data: any) => {
                        if (error) {
                            return done(error);
                        }

                        expect(data.errors).toEqual([]);
                        expect(data.validity).toBeTruthy();
                        done();
                    });
                });
            });
        });
    });
});