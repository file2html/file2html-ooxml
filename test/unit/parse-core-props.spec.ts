import parseCoreProps from '../../src/parse-core-props';

describe('OOXML', () => {
    describe('parseCoreProps()', () => {
        it('should parse OOXML document.xml content', () => {
            const fileContent: string = `
                <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
                                   xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"
                                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                    <dc:title>DOCX Demo</dc:title>
                    <dc:creator>Kovid Goyal</dc:creator>
                    <cp:keywords>calibre, docs, ebook, conversion</cp:keywords>
                    <dc:description>Demonstration of DOCX support in calibre</dc:description>
                    <cp:lastModifiedBy>kovid</cp:lastModifiedBy>
                    <cp:revision>79</cp:revision>
                    <dcterms:created xsi:type="dcterms:W3CDTF">2013-06-05T07:56:00Z</dcterms:created>
                    <dcterms:modified xsi:type="dcterms:W3CDTF">2013-06-20T06:14:00Z</dcterms:modified>
                </cp:coreProperties>
            `;
            const fileMetaInformation: {[key: string]: any;} = {};

            parseCoreProps(fileContent, fileMetaInformation as any);

            expect(fileMetaInformation).toEqual({
                creator: 'Kovid Goyal',
                createdAt: '2013-06-05T07:56:00Z',
                modifiedAt: '2013-06-20T06:14:00Z'
            });
        });
    });
});