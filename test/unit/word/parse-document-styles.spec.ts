import * as fs from 'fs';
import * as path from 'path';
import parseDocumentStyles from '../../../src/word/parse-document-styles';

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
            it('should parse OOXML styles.xml', () => {
                return readFile(path.resolve(__dirname, './styles.xml')).then((originContent) => {
                    const styles: string = parseDocumentStyles(originContent);

                    /* tslint:disable:max-line-length */
                    expect(styles).toBe(`
                        .r{font-size:8.25px;}
                        .p{line-height:1.15;}
                        .Normal{text-indent:28.8px;font-size:9px;}
                        .Heading1{margin-top:18px;text-indent:0px;text-align:center;font-weight:bold;font-size:10.5px;}
                        .Heading2{margin-top:7.5px;text-indent:0px;font-weight:bold;font-size:9.75px;}
                        .DefaultParagraphFont{}
                        .TableNormal{}
                        .NoList{}
                        .Heading1Char{font-weight:bold;font-size:10.5px;}
                        .Title{border-bottom:1px solid #4F81BD;line-height:1;margin-bottom:11.25px;text-indent:0px;font-size:19.5px;}
                        .TitleChar{font-size:19.5px;}
                        .SubtleEmphasis{font-style:italic;}
                        .Strong{font-weight:bold;}
                        .IntenseEmphasis{font-weight:bold;font-style:italic;}
                        .Heading2Char{font-weight:bold;font-size:9.75px;}
                        .LightList-Accent3{line-height:1;border-top:1px solid #9BBB59;border-left:1px solid #9BBB59;border-bottom:1px solid #9BBB59;border-right:1px solid #9BBB59;line-height:1;margin-top:0px;margin-bottom:0px;font-weight:bold;line-height:1;margin-top:0px;margin-bottom:0px;font-weight:bold;border-top:1px double #9BBB59;border-left:1px solid #9BBB59;border-bottom:1px solid #9BBB59;border-right:1px solid #9BBB59;font-weight:bold;font-weight:bold;border-top:1px solid #9BBB59;border-left:1px solid #9BBB59;border-bottom:1px solid #9BBB59;border-right:1px solid #9BBB59;border-top:1px solid #9BBB59;border-left:1px solid #9BBB59;border-bottom:1px solid #9BBB59;border-right:1px solid #9BBB59;}
                        .MediumList2-Accent1{line-height:1;border-top:1px solid #4F81BD;border-left:1px solid #4F81BD;border-bottom:1px solid #4F81BD;border-right:1px solid #4F81BD;font-size:9px;border-bottom:3px solid #4F81BD;border-top:1px solid #4F81BD;border-right:1px solid #4F81BD;border-left:1px solid #4F81BD;}
                        .DecimalAligned{margin-bottom:7.5px;text-indent:0px;font-size:8.25px;}
                        .FootnoteText{line-height:1;text-indent:0px;font-size:7.5px;}
                        .FootnoteTextChar{font-size:7.5px;}
                        .MediumShading2-Accent5{line-height:1;border-top:2px solid currentColor;border-bottom:2px solid currentColor;line-height:1;margin-top:0px;margin-bottom:0px;font-weight:bold;border-top:2px solid currentColor;border-bottom:2px solid currentColor;line-height:1;margin-top:0px;margin-bottom:0px;border-top:1px double currentColor;border-bottom:2px solid currentColor;font-weight:bold;border-bottom:2px solid currentColor;font-weight:bold;border-top:2px solid currentColor;border-bottom:2px solid currentColor;border-top:2px solid currentColor;border-bottom:2px solid currentColor;}
                        .TableGrid{line-height:1;border-top:1px solid #000000;border-left:1px solid #000000;border-bottom:1px solid #000000;border-right:1px solid #000000;}
                        .NoSpacing{line-height:1;}
                        .NoSpacingChar{}
                        .BalloonText{line-height:1;font-size:6px;}
                        .BalloonTextChar{font-size:6px;}
                        .Calendar2{line-height:1;text-align:center;font-size:10.5px;text-transform:uppercase;font-size:12px;}
                        .Calendar3{line-height:1;text-align:right;text-align:right;font-size:16.5px;}
                        .FootnoteReference{}
                        .EndnoteText{line-height:1;font-size:7.5px;}
                        .EndnoteTextChar{font-size:7.5px;}
                        .EndnoteReference{}
                        .Hyperlink{text-decoration:underline;}
                        .ListParagraph{margin-left:48px;}
                        .TOC1{margin-top:9px;margin-bottom:4.5px;font-weight:bold;font-size:7.5px;}
                        .TOC2{margin-top:4.5px;margin-left:16px;font-style:italic;font-size:7.5px;}
                        .TOC3{margin-left:32px;font-size:7.5px;}
                        .TOC4{margin-left:48px;font-size:7.5px;}
                        .TOC5{margin-left:64px;font-size:7.5px;}
                        .TOC6{margin-left:80px;font-size:7.5px;}
                        .TOC7{margin-left:96px;font-size:7.5px;}
                        .TOC8{margin-left:112px;font-size:7.5px;}
                        .TOC9{margin-left:128px;font-size:7.5px;}
                        .TOCHeading{text-align:left;}
                    `.trim().replace(/[ ]{2,}/g, '') + '\n');
                    /* tslint:enable */
                });
            });
        });
    });
});