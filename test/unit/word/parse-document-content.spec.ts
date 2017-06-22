import * as fs from 'fs';
import * as path from 'path';
import {TextDecoder} from 'text-encoding';
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

describe('OOXML', () => {
    beforeAll(() => {
        (window as any).TextDecoder = TextDecoder;
    });

    describe('Wordprocessing', () => {
        describe('parseDocumentContent()', () => {
            it('should parse OOXML document.xml', () => {
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
                    expect(styles).toBe(`
                        .element-11{font-weight:bold;}
                        .element-13{font-weight:bold;}
                        .element-15{font-weight:bold;}
                        .element-26{font-weight:bold;}
                        .element-27{font-style:italic;}
                        .element-28{font-weight:bold;font-style:italic;}
                        .element-29{text-decoration:underline;}
                        .element-31{text-decoration:line-through;}
                        .element-33{vertical-align:super;}
                        .element-35{vertical-align:sub;}
                        .element-37{color:#FF0000;}
                        .element-39{color:#92D050;}
                        .element-41{color:#0070C0;}
                        .element-43{background-color:yellow;}
                        .element-49{color:#FFFFFF;background-color:#000000;}
                        .element-69{font-family:Ubuntu Mono;}
                        .element-70{font-family:Ubuntu Mono;}
                        .element-73 .r{font-weight:bold;}
                        .element-74{font-weight:bold;}
                        .element-75{border-right:1px solid currentColor;background-color:#DDDDDD;text-align:right;}
                        .element-77{margin-top:40px;margin-left:48px;}
                        .element-132{width:100%;}
                        .element-135 .r{font-size:14px;}
                        .element-136{font-size:14px;}
                        .element-138{text-align:center;}
                        .element-138 .r{font-size:14px;}
                        .element-139{font-size:14px;}
                        .element-141{text-align:center;}
                        .element-141 .r{font-size:14px;}
                        .element-142{font-size:14px;}
                        .element-144{text-align:center;}
                        .element-144 .r{font-size:14px;}
                        .element-145{font-size:14px;}
                        .element-147{text-align:center;}
                        .element-147 .r{font-size:14px;}
                        .element-148{font-size:14px;}
                        .element-150{text-align:center;}
                        .element-150 .r{font-size:14px;}
                        .element-151{font-size:14px;}
                        .element-157{text-align:center;}
                        .element-160{text-align:center;}
                        .element-162{text-align:center;}
                        .element-164{text-align:center;}
                        .element-166{text-align:center;}
                        .element-172{text-align:center;}
                        .element-175{text-align:center;}
                        .element-178{text-align:center;}
                        .element-180{text-align:center;}
                        .element-182{text-align:center;}
                        .element-188{text-align:center;}
                        .element-191{text-align:center;}
                        .element-194{text-align:center;}
                        .element-197{text-align:center;}
                        .element-199{text-align:center;}
                        .element-205{text-align:center;}
                        .element-208{text-align:center;}
                        .element-211{text-align:center;}
                        .element-214{text-align:center;}
                        .element-217{text-align:center;}
                        .element-223{text-align:center;}
                        .element-226{text-align:center;}
                        .element-229{text-align:center;}
                        .element-232{text-align:center;}
                        .element-235{text-align:center;}
                        .element-238{margin-top:16px;margin-bottom:16px;}
                        .element-242{width:100%;}
                        .element-344{margin-top:16px;}
                        .element-348{width:70%;text-align:center;}
                        .element-349{text-align:center;}
                        .element-351{width:80%;text-align:center;}
                        .element-352{text-align:center;}
                        .element-354{margin-top:16px;text-indent:0px;}
                        .element-356{margin-top:16px;text-indent:0px;}
                        .element-359{margin-top:16px;text-indent:0px;}
                        .element-361{text-align:center;}
                        .element-363{margin-top:16px;text-indent:0px;}
                        .element-365{margin-top:16px;text-indent:0px;}
                        .element-367{margin-top:16px;text-indent:0px;}
                        .element-369{margin-top:16px;text-indent:0px;}
                        .element-371{margin-top:16px;}
                        .element-372{margin-top:16px;}
                        .element-380{text-align:center;}
                        .element-381{text-align:center;}
                        .element-385{text-align:center;}
                        .element-386{border-bottom:1px solid #365F91;}
                        .element-391{border-bottom:1px solid #7F7F7F;}
                        .element-396{border-bottom:1px solid #7F7F7F;}
                        .element-401{border-bottom:1px solid #7F7F7F;}
                        .element-406{border-bottom:1px solid #7F7F7F;}
                        .element-411{border-bottom:1px solid #7F7F7F;}
                        .element-416{border-bottom:1px solid #365F91;}
                        .element-419{text-align:center;}
                        .element-420{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-422{border-left:4px solid #365F91;}
                        .element-424{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-426{border-left:4px solid #7F7F7F;}
                        .element-428{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-430{border-left:4px solid #7F7F7F;}
                        .element-432{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-434{border-left:4px solid #7F7F7F;}
                        .element-436{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-438{border-left:4px solid #7F7F7F;}
                        .element-440{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-442{border-left:4px solid #7F7F7F;}
                        .element-444{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-447{text-align:center;}
                        .element-448{border-bottom:1px solid #365F91;}
                        .element-452{border-bottom:1px solid #7F7F7F;}
                        .element-456{border-bottom:1px solid #7F7F7F;}
                        .element-460{border-bottom:1px solid #7F7F7F;}
                        .element-464{border-bottom:1px solid #7F7F7F;}
                        .element-468{border-bottom:1px solid #7F7F7F;}
                        .element-472{border-bottom:1px solid #365F91;}
                        .element-474{text-align:center;}
                        .element-475{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-478{border-left:4px solid #365F91;}
                        .element-480{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-483{border-left:4px solid #7F7F7F;}
                        .element-485{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-488{border-left:4px solid #7F7F7F;}
                        .element-490{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-493{border-left:4px solid #7F7F7F;}
                        .element-495{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-498{border-left:4px solid #7F7F7F;}
                        .element-500{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-503{border-left:4px solid #7F7F7F;}
                        .element-505{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-508{text-align:center;}
                        .element-509{border-bottom:1px solid #365F91;}
                        .element-513{border-bottom:1px solid #7F7F7F;}
                        .element-517{border-bottom:1px solid #7F7F7F;}
                        .element-521{border-bottom:1px solid #7F7F7F;}
                        .element-525{border-bottom:1px solid #7F7F7F;}
                        .element-529{border-bottom:1px solid #7F7F7F;}
                        .element-533{border-bottom:1px solid #365F91;}
                        .element-535{text-align:center;}
                        .element-536{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-539{border-left:4px solid #365F91;}
                        .element-541{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-544{border-left:4px solid #7F7F7F;}
                        .element-546{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-549{border-left:4px solid #7F7F7F;}
                        .element-551{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-554{border-left:4px solid #7F7F7F;}
                        .element-556{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-559{border-left:4px solid #7F7F7F;}
                        .element-561{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-564{border-left:4px solid #7F7F7F;}
                        .element-566{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-569{text-align:center;}
                        .element-570{border-bottom:1px solid #365F91;}
                        .element-574{border-bottom:1px solid #7F7F7F;}
                        .element-578{border-bottom:1px solid #7F7F7F;}
                        .element-582{border-bottom:1px solid #7F7F7F;}
                        .element-586{border-bottom:1px solid #7F7F7F;}
                        .element-590{border-bottom:1px solid #7F7F7F;}
                        .element-594{border-bottom:1px solid #365F91;}
                        .element-596{text-align:center;}
                        .element-597{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-600{border-left:4px solid #365F91;}
                        .element-602{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-605{border-left:4px solid #7F7F7F;}
                        .element-607{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-610{border-left:4px solid #7F7F7F;}
                        .element-612{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-615{border-left:4px solid #7F7F7F;}
                        .element-617{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-620{border-left:4px solid #7F7F7F;}
                        .element-622{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-625{border-left:4px solid #7F7F7F;}
                        .element-627{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-630{text-align:center;}
                        .element-631{border-bottom:1px solid #365F91;}
                        .element-635{border-bottom:1px solid #7F7F7F;}
                        .element-639{border-bottom:1px solid #7F7F7F;}
                        .element-643{border-bottom:1px solid #7F7F7F;}
                        .element-647{border-bottom:1px solid #7F7F7F;}
                        .element-651{border-bottom:1px solid #7F7F7F;}
                        .element-655{border-bottom:1px solid #365F91;}
                        .element-657{text-align:center;}
                        .element-658{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-661{border-left:4px solid #365F91;}
                        .element-663{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-666{border-left:4px solid #7F7F7F;}
                        .element-668{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-671{border-left:4px solid #7F7F7F;}
                        .element-673{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-676{border-left:4px solid #7F7F7F;}
                        .element-678{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-681{border-left:4px solid #7F7F7F;}
                        .element-683{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-686{border-left:4px solid #7F7F7F;}
                        .element-688{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-691{text-align:center;}
                        .element-692{border-bottom:1px solid #365F91;}
                        .element-696{border-bottom:1px solid #7F7F7F;}
                        .element-700{border-bottom:1px solid #7F7F7F;}
                        .element-704{border-bottom:1px solid #7F7F7F;}
                        .element-708{border-bottom:1px solid #7F7F7F;}
                        .element-712{border-bottom:1px solid #7F7F7F;}
                        .element-716{border-bottom:1px solid #365F91;}
                        .element-718{text-align:center;}
                        .element-719{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-722{border-left:4px solid #365F91;}
                        .element-724{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-727{border-left:4px solid #7F7F7F;}
                        .element-729{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-731{border-left:4px solid #7F7F7F;}
                        .element-733{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-735{border-left:4px solid #7F7F7F;}
                        .element-737{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-739{border-left:4px solid #7F7F7F;}
                        .element-741{border-top:1px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-743{border-left:4px solid #7F7F7F;}
                        .element-745{border-top:1px solid #365F91;border-right:4px solid #365F91;}
                        .element-761{float:left;line-height:3.9625;vertical-align:baseline;}
                        .element-761 .r{font-size:78px;}
                        .element-762{font-size:78px;}
                        .element-763{text-indent:0px;}
                        .element-792 .r{font-weight:bold;font-size:16px;}
                        .element-793{font-weight:bold;}
                        .element-794{font-weight:bold;}
                        .element-795{font-weight:bold;}
                        .element-796{font-size:16px;}
                        .element-797{font-size:16px;}
                        .element-798{font-size:16px;}
                        .element-799{font-size:16px;}
                        .element-800{font-size:16px;}
                        .element-801{font-size:16px;}
                        .element-802{font-size:16px;}
                        .element-803{font-size:16px;}
                        .element-804 .r{font-weight:bold;font-size:16px;}
                        .element-805{font-size:16px;}
                        .element-806{font-size:16px;}
                        .element-807{font-size:16px;}
                        .element-808{font-size:16px;}
                        .element-809{font-size:16px;}
                        .element-810{font-size:16px;}
                        .element-811{font-size:16px;}
                        .element-812{font-size:16px;}
                        .element-813 .r{font-size:16px;}
                        .element-814{font-size:16px;}
                        .element-815{font-size:16px;}
                        .element-816{font-size:16px;}
                        .element-817{font-size:16px;}
                        .element-818{font-size:16px;}
                        .element-819{font-size:16px;}
                        .element-820{font-size:16px;}
                        .element-821{font-size:16px;}
                        .element-822 .r{font-size:16px;}
                        .element-823{font-size:16px;}
                        .element-824{font-size:16px;}
                        .element-825{font-size:16px;}
                        .element-826{font-size:16px;}
                        .element-827{font-size:16px;}
                        .element-828{font-size:16px;}
                        .element-829{font-size:16px;}
                        .element-830{font-size:16px;}
                        .element-831 .r{font-size:16px;}
                        .element-832{font-size:16px;}
                        .element-833{font-size:16px;}
                        .element-834{font-size:16px;}
                        .element-835{font-size:16px;}
                        .element-836{font-size:16px;}
                        .element-837{font-size:16px;}
                        .element-838{font-size:16px;}
                        .element-839{font-size:16px;}
                        .element-840 .r{font-weight:bold;font-size:16px;}
                        .element-841{font-size:16px;}
                        .element-842{font-size:16px;}
                        .element-843{font-size:16px;}
                        .element-844{font-size:16px;}
                        .element-845{font-size:16px;}
                        .element-846{font-size:16px;}
                        .element-847{font-size:16px;}
                        .element-848{font-size:16px;}
                        .element-849 .r{font-weight:bold;font-size:16px;}
                        .element-850{font-size:16px;}
                        .element-851{font-size:16px;}
                        .element-852{font-size:16px;}
                        .element-853{font-size:16px;}
                        .element-854{font-size:16px;}
                        .element-855{font-size:16px;}
                        .element-856{font-size:16px;}
                        .element-857{font-size:16px;}
                        .element-858 .r{font-size:16px;}
                        .element-859{font-size:16px;}
                        .element-860{font-size:16px;}
                        .element-861{font-size:16px;}
                        .element-862{font-size:16px;}
                        .element-863{font-size:16px;}
                        .element-864{font-size:16px;}
                        .element-865{font-size:16px;}
                        .element-866{font-size:16px;}
                        .element-867 .r{font-size:16px;}
                        .element-868{font-size:16px;}
                        .element-869{font-size:16px;}
                        .element-870{font-size:16px;}
                        .element-871{font-size:16px;}
                        .element-872{font-size:16px;}
                        .element-873{font-size:16px;}
                        .element-874{font-size:16px;}
                        .element-875{font-size:16px;}
                        .element-876 .r{font-size:16px;}
                        .element-877{font-size:16px;}
                        .element-878{font-size:16px;}
                        .element-879{font-size:16px;}
                        .element-880{font-size:16px;}
                        .element-881{font-size:16px;}
                        .element-882{font-size:16px;}
                        .element-883{font-size:16px;}
                        .element-884{font-size:16px;}
                        .element-885 .r{font-size:16px;}
                        .element-886{font-size:16px;}
                        .element-887{font-size:16px;}
                        .element-888{font-size:16px;}
                        .element-889{font-size:16px;}
                        .element-890{font-size:16px;}
                        .element-891{font-size:16px;}
                        .element-892{font-size:16px;}
                        .element-893{font-size:16px;}
                        .element-894 .r{font-weight:bold;font-size:16px;}
                        .element-895{font-size:16px;}
                        .element-896{font-size:16px;}
                        .element-897{font-size:16px;}
                        .element-898{font-size:16px;}
                        .element-899{font-size:16px;}
                        .element-900{font-size:16px;}
                        .element-901{font-size:16px;}
                        .element-902{font-size:16px;}
                        .element-903 .r{font-weight:bold;font-size:16px;}
                        .element-904{font-size:16px;}
                        .element-905{font-size:16px;}
                        .element-906{font-size:16px;}
                        .element-907{font-size:16px;}
                        .element-908{font-size:16px;}
                        .element-909{font-size:16px;}
                        .element-910{font-size:16px;}
                        .element-911{font-size:16px;}
                        .element-912 .r{font-size:16px;}
                        .element-913{font-size:16px;}
                        .element-914{font-size:16px;}
                        .element-915{font-size:16px;}
                        .element-916{font-size:16px;}
                        .element-917{font-size:16px;}
                        .element-918{font-size:16px;}
                        .element-919{font-size:16px;}
                        .element-920{font-size:16px;}
                        .element-921 .r{font-size:16px;}
                        .element-922{font-size:16px;}
                        .element-923{font-size:16px;}
                        .element-924{font-size:16px;}
                        .element-925{font-size:16px;}
                        .element-926{font-size:16px;}
                        .element-927{font-size:16px;}
                        .element-928{font-size:16px;}
                        .element-929{font-size:16px;}
                        .element-930 .r{font-size:16px;}
                        .element-931{font-size:16px;}
                        .element-932{font-size:16px;}
                        .element-933{font-size:16px;}
                        .element-934{font-size:16px;}
                        .element-935{font-size:16px;}
                        .element-936{font-size:16px;}
                        .element-937{font-size:16px;}
                        .element-938{font-size:16px;}
                        .element-939 .r{font-size:14px;}
                        .element-940{font-size:16px;}
                        .element-941{font-size:16px;}
                        .element-942{font-size:16px;}
                        .element-943{font-size:16px;}
                        .element-944{font-size:16px;}
                        .element-945{font-size:16px;}
                        .element-946{font-size:16px;}
                        .element-947{font-size:16px;}
                        .element-949{font-weight:bold;font-size:13px;}
                        .element-976{display:list-item;list-style-type:disc;}
                        .element-978{display:list-item;list-style-type:disc;}
                        .element-982{display:list-item;list-style-type:disc;}
                        .element-984{display:list-item;list-style-type:disc;}
                        .element-989{display:list-item;list-style-type:disc;}
                        .element-991{display:list-item;list-style-type:disc;}
                        .element-993{display:list-item;list-style-type:disc;}
                        .element-995{display:list-item;list-style-type:disc;}
                        .element-997{display:list-item;list-style-type:disc;}
                        .element-999{display:list-item;list-style-type:disc;}
                        .element-1001{margin-left:24px;text-indent:0px;}
                        .element-1003{display:list-item;list-style-type:disc;}
                        .element-1005{display:list-item;list-style-type:disc;}
                        .element-1007{display:list-item;list-style-type:disc;}
                        .element-1009{display:list-item;list-style-type:disc;}
                        .element-1011{display:list-item;list-style-type:disc;}
                        .element-1015{display:list-item;list-style-type:disc;}
                        .element-1017{display:list-item;list-style-type:disc;}
                        .element-1019{text-indent:0px;}
                        .element-1021{display:list-item;list-style-type:disc;}
                        .element-1023{display:list-item;list-style-type:disc;}
                        .element-1025{margin-left:96px;text-indent:0px;}
                    `.trim().replace(/[ ]{2,}/g, '') + '\n');
                });
            });
        });
    });
});