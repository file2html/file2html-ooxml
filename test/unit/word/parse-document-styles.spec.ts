import * as fs from 'fs';
import * as path from 'path';
import parseDocumentStyles from '../../../src/word/parse-document-styles';

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
    describe('Wordprocessing', () => {
        describe('parseDocumentStyles()', () => {
            it('should parse OOXML styles.xml', (done) => {
                return readFile(path.resolve(__dirname, './styles.xml')).then((originContent) => {
                    const css: string = parseDocumentStyles(originContent);

                    expect(css.length).toBeGreaterThan(0);

                    validateCss(css, (error: Error, data: any) => {
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