import * as fs from 'fs';
import * as path from 'path';
import parseDocumentRelations from '../../../src/word/parse-document-relations';

describe('OOXML', () => {
    describe('Wordprocessing', () => {
        describe('parseDocumentRelations()', () => {
            it('should parse OOXML _rels/document.xml.rels', () => {
                const fileContent = fs.readFileSync(path.resolve(__dirname, './document.xml.rels')).toString();
                const archive: any = {
                    file (path: string) {
                        expect(path.indexOf('word')).toBe(0);

                        return {
                            async (dataType: string) {
                                return Promise.resolve(dataType);
                            }
                        };
                    }
                };

                return parseDocumentRelations(fileContent, archive).then((documentRelations) => {
                    expect(documentRelations).toEqual({
                        rId10: 'base64',
                        rId11: 'base64',
                        rId12: 'base64'
                    });
                });
            });
        });
    });
});