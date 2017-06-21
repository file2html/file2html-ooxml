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
                        .tbl{border-collapse:collapse;}
                        .r{font-size:14px;}
                        .p{line-height:1.15;}
                        .Normal{text-indent:28px;}
                        .Normal .r{font-family:Ubuntu;font-size:16px;}
                        .Heading1{margin-top:32px;text-indent:0px;text-align:center;}
                        .Heading1 .r{font-weight:bold;color:#365F91;font-size:18px;}
                        .Heading2{margin-top:13px;text-indent:0px;}
                        .Heading2 .r{font-weight:bold;color:#4F81BD;font-size:17px;}
                        .TableNormal{margin-left:0px;}
                        .Heading1Char{font-family:Ubuntu;font-weight:bold;color:#365F91;font-size:18px;}
                        .Title{border-bottom:1px solid #4F81BD;line-height:1;margin-bottom:20px;text-indent:0px;}
                        .Title .r{color:#17365D;font-size:34px;}
                        .TitleChar{font-family:Ubuntu;color:#17365D;font-size:34px;}
                        .SubtleEmphasis{font-style:italic;color:#808080;}
                        .Strong{font-weight:bold;}
                        .IntenseEmphasis{font-weight:bold;font-style:italic;color:#4F81BD;}
                        .Heading2Char{font-family:Ubuntu;font-weight:bold;color:#4F81BD;font-size:17px;}
                        .LightList-Accent3{line-height:1;}
                        .LightList-Accent3 .r{margin-left:0px;border-top:1px solid #9BBB59;border-left:1px solid #9BBB59;border-bottom:1px solid #9BBB59;border-right:1px solid #9BBB59;line-height:1;margin-top:0px;margin-bottom:0px;}
                        .LightList-Accent3 .r .r{font-weight:bold;color:#FFFFFF;background-color:#9BBB59;line-height:1;margin-top:0px;margin-bottom:0px;}
                        .LightList-Accent3 .r .r .r{font-weight:bold;border-top:1px double #9BBB59;border-left:1px solid #9BBB59;border-bottom:1px solid #9BBB59;border-right:1px solid #9BBB59;}
                        .LightList-Accent3 .r .r .r .r{font-weight:bold;}
                        .LightList-Accent3 .r .r .r .r .r{font-weight:bold;border-top:1px solid #9BBB59;border-left:1px solid #9BBB59;border-bottom:1px solid #9BBB59;border-right:1px solid #9BBB59;border-top:1px solid #9BBB59;border-left:1px solid #9BBB59;border-bottom:1px solid #9BBB59;border-right:1px solid #9BBB59;}
                        .MediumList2-Accent1{line-height:1;}
                        .MediumList2-Accent1 .r{color:#000000;margin-left:0px;border-top:1px solid #4F81BD;border-left:1px solid #4F81BD;border-bottom:1px solid #4F81BD;border-right:1px solid #4F81BD;}
                        .MediumList2-Accent1 .r .r{font-size:16px;border-bottom:4px solid #4F81BD;background-color:#FFFFFF;border-top:1px solid #4F81BD;background-color:#FFFFFF;border-right:1px solid #4F81BD;background-color:#FFFFFF;border-left:1px solid #4F81BD;background-color:#FFFFFF;background-color:#D3DFEE;background-color:#D3DFEE;background-color:#FFFFFF;}
                        .DecimalAligned{margin-bottom:13px;text-indent:0px;}
                        .DecimalAligned .r{font-size:14px;}
                        .FootnoteText{line-height:1;text-indent:0px;}
                        .FootnoteText .r{font-size:13px;}
                        .FootnoteTextChar{font-size:13px;}
                        .MediumShading2-Accent5{line-height:1;}
                        .MediumShading2-Accent5 .r{margin-left:0px;border-top:3px solid currentColor;border-bottom:3px solid currentColor;line-height:1;margin-top:0px;margin-bottom:0px;}
                        .MediumShading2-Accent5 .r .r{font-weight:bold;color:#FFFFFF;border-top:3px solid currentColor;border-bottom:3px solid currentColor;background-color:#4BACC6;line-height:1;margin-top:0px;margin-bottom:0px;border-top:1px double currentColor;border-bottom:3px solid currentColor;background-color:#FFFFFF;}
                        .MediumShading2-Accent5 .r .r .r{font-weight:bold;color:#FFFFFF;border-bottom:3px solid currentColor;background-color:#4BACC6;}
                        .MediumShading2-Accent5 .r .r .r .r{font-weight:bold;color:#FFFFFF;background-color:#4BACC6;background-color:#D8D8D8;background-color:#D8D8D8;border-top:3px solid currentColor;border-bottom:3px solid currentColor;}
                        .MediumShading2-Accent5 .r .r .r .r .r{color:#FFFFFF;border-top:3px solid currentColor;border-bottom:3px solid currentColor;}
                        .TableGrid{line-height:1;margin-left:0px;border-top:0px solid #000000;border-left:0px solid #000000;border-bottom:0px solid #000000;border-right:0px solid #000000;}
                        .NoSpacing{line-height:1;}
                        .BalloonText{line-height:1;}
                        .BalloonText .r{font-family:Tahoma;font-size:10px;}
                        .BalloonTextChar{font-family:Tahoma;font-size:10px;}
                        .Calendar2{line-height:1;text-align:center;}
                        .Calendar2 .r{font-size:18px;margin-left:0px;}
                        .Calendar2 .r .r{text-transform:uppercase;color:#4F81BD;font-size:21px;}
                        .Calendar3{line-height:1;text-align:right;}
                        .Calendar3 .r{color:#7F7F7F;margin-left:0px;text-align:right;}
                        .Calendar3 .r .r{color:#365F91;font-size:29px;}
                        .Calendar3 .r .r .r{color:#365F91;}
                        .Calendar3 .r .r .r .r{color:#365F91;}
                        .FootnoteReference{vertical-align:super;}
                        .EndnoteText{line-height:1;}
                        .EndnoteText .r{font-size:13px;}
                        .EndnoteTextChar{font-family:Ubuntu;font-size:13px;}
                        .EndnoteReference{vertical-align:super;}
                        .Hyperlink{color:#0000FF;text-decoration:underline;}
                        .ListParagraph{margin-left:48px;}
                        .TOC1{margin-top:16px;margin-bottom:8px;}
                        .TOC1 .r{font-weight:bold;font-size:13px;}
                        .TOC2{margin-top:8px;margin-left:16px;}
                        .TOC2 .r{font-style:italic;font-size:13px;}
                        .TOC3{margin-left:32px;}
                        .TOC3 .r{font-size:13px;}
                        .TOC4{margin-left:48px;}
                        .TOC4 .r{font-size:13px;}
                        .TOC5{margin-left:64px;}
                        .TOC5 .r{font-size:13px;}
                        .TOC6{margin-left:80px;}
                        .TOC6 .r{font-size:13px;}
                        .TOC7{margin-left:96px;}
                        .TOC7 .r{font-size:13px;}
                        .TOC8{margin-left:112px;}
                        .TOC8 .r{font-size:13px;}
                        .TOC9{margin-left:128px;}
                        .TOC9 .r{font-size:13px;}
                        .TOCHeading{text-align:left;}
                    `.trim().replace(/[ ]{2,}/g, '') + '\n');
                    /* tslint:enable */
                });
            });
        });
    });
});