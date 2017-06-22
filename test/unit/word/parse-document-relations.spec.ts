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
                                expect(dataType).toBe('base64');

                                return Promise.resolve('base64Data');
                            }
                        };
                    }
                };

                return parseDocumentRelations(fileContent, archive).then((documentRelations) => {
                    expect(documentRelations).toEqual({
                        rId10: 'data:image/png;base64,base64Data',
                        rId11: 'data:image/png;base64,base64Data',
                        rId12: 'data:image/png;base64,base64Data'
                    });
                });
            });
        });
    });
});