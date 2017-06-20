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

describe('OOXML', () => {
    describe('Wordprocessing', () => {
        describe('parseDocumentContent()', () => {
            it('should parse OOXML document.xml', () => {
                return readFile(path.resolve(__dirname, './document.xml')).then((originContent: string) => {
                    const {content, styles} = parseDocumentContent(originContent, {prettify: true});

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
                        .element-0{}
                        .element-11{font-weight:bold;}
                        .element-13{font-weight:bold;}
                        .element-15{font-weight:bold;}
                        .element-18{}
                        .element-20{}
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
                        .element-46{}
                        .element-49{color:#FFFFFF;background-color:#000000;}
                        .element-65{}
                        .element-69{font-family:Ubuntu Mono;}
                        .element-70{font-family:Ubuntu Mono;}
                        .element-73{}
                        .element-73 .r{font-weight:bold;}
                        .element-74{font-weight:bold;}
                        .element-75{border-right:0px solid currentColor;background-color:#DDDDDD;text-align:right;}
                        .element-77{margin-top:40px;margin-left:48px;}
                        .element-79{}
                        .element-81{}
                        .element-82{}
                        .element-83{}
                        .element-86{}
                        .element-90{}
                        .element-93{}
                        .element-97{}
                        .element-100{}
                        .element-104{}
                        .element-107{}
                        .element-111{}
                        .element-114{}
                        .element-118{}
                        .element-121{}
                        .element-132{width:100%;}
                        .element-133{}
                        .element-134{}
                        .element-135{}
                        .element-135 .r{font-size:14px;}
                        .element-136{font-size:14px;}
                        .element-137{}
                        .element-138{text-align:center;}
                        .element-138 .r{font-size:14px;}
                        .element-139{font-size:14px;}
                        .element-140{}
                        .element-141{text-align:center;}
                        .element-141 .r{font-size:14px;}
                        .element-142{font-size:14px;}
                        .element-143{}
                        .element-144{text-align:center;}
                        .element-144 .r{font-size:14px;}
                        .element-145{font-size:14px;}
                        .element-146{}
                        .element-147{text-align:center;}
                        .element-147 .r{font-size:14px;}
                        .element-148{font-size:14px;}
                        .element-149{}
                        .element-150{text-align:center;}
                        .element-150 .r{font-size:14px;}
                        .element-151{font-size:14px;}
                        .element-152{}
                        .element-153{}
                        .element-154{}
                        .element-154 .r{}
                        .element-155{}
                        .element-156{}
                        .element-157{text-align:center;}
                        .element-157 .r{}
                        .element-158{}
                        .element-159{}
                        .element-160{text-align:center;}
                        .element-160 .r{}
                        .element-161{}
                        .element-162{text-align:center;}
                        .element-162 .r{}
                        .element-163{}
                        .element-164{text-align:center;}
                        .element-164 .r{}
                        .element-165{}
                        .element-166{text-align:center;}
                        .element-166 .r{}
                        .element-168{}
                        .element-169{}
                        .element-169 .r{}
                        .element-170{}
                        .element-171{}
                        .element-172{text-align:center;}
                        .element-172 .r{}
                        .element-173{}
                        .element-174{}
                        .element-175{text-align:center;}
                        .element-175 .r{}
                        .element-176{}
                        .element-177{}
                        .element-178{text-align:center;}
                        .element-178 .r{}
                        .element-179{}
                        .element-180{text-align:center;}
                        .element-180 .r{}
                        .element-181{}
                        .element-182{text-align:center;}
                        .element-182 .r{}
                        .element-183{}
                        .element-184{}
                        .element-185{}
                        .element-185 .r{}
                        .element-186{}
                        .element-187{}
                        .element-188{text-align:center;}
                        .element-188 .r{}
                        .element-189{}
                        .element-190{}
                        .element-191{text-align:center;}
                        .element-191 .r{}
                        .element-192{}
                        .element-193{}
                        .element-194{text-align:center;}
                        .element-194 .r{}
                        .element-195{}
                        .element-196{}
                        .element-197{text-align:center;}
                        .element-197 .r{}
                        .element-198{}
                        .element-199{text-align:center;}
                        .element-199 .r{}
                        .element-201{}
                        .element-202{}
                        .element-202 .r{}
                        .element-203{}
                        .element-204{}
                        .element-205{text-align:center;}
                        .element-205 .r{}
                        .element-206{}
                        .element-207{}
                        .element-208{text-align:center;}
                        .element-208 .r{}
                        .element-209{}
                        .element-210{}
                        .element-211{text-align:center;}
                        .element-211 .r{}
                        .element-212{}
                        .element-213{}
                        .element-214{text-align:center;}
                        .element-214 .r{}
                        .element-215{}
                        .element-216{}
                        .element-217{text-align:center;}
                        .element-217 .r{}
                        .element-218{}
                        .element-219{}
                        .element-220{}
                        .element-220 .r{}
                        .element-221{}
                        .element-222{}
                        .element-223{text-align:center;}
                        .element-223 .r{}
                        .element-224{}
                        .element-225{}
                        .element-226{text-align:center;}
                        .element-226 .r{}
                        .element-227{}
                        .element-228{}
                        .element-229{text-align:center;}
                        .element-229 .r{}
                        .element-230{}
                        .element-231{}
                        .element-232{text-align:center;}
                        .element-232 .r{}
                        .element-233{}
                        .element-234{}
                        .element-235{text-align:center;}
                        .element-235 .r{}
                        .element-236{}
                        .element-238{margin-top:16px;margin-bottom:16px;}
                        .element-242{width:100%;}
                        .element-243{}
                        .element-244{}
                        .element-247{}
                        .element-250{}
                        .element-253{}
                        .element-257{}
                        .element-259{}
                        .element-260{}
                        .element-262{}
                        .element-264{}
                        .element-267{}
                        .element-270{}
                        .element-271{}
                        .element-273{}
                        .element-274{}
                        .element-276{}
                        .element-277{}
                        .element-280{}
                        .element-283{}
                        .element-284{}
                        .element-286{}
                        .element-287{}
                        .element-289{}
                        .element-290{}
                        .element-293{}
                        .element-295{}
                        .element-296{}
                        .element-298{}
                        .element-300{}
                        .element-303{}
                        .element-306{}
                        .element-307{}
                        .element-309{}
                        .element-310{}
                        .element-312{}
                        .element-313{}
                        .element-316{}
                        .element-319{}
                        .element-320{}
                        .element-322{}
                        .element-323{}
                        .element-325{}
                        .element-326{}
                        .element-328{}
                        .element-329{}
                        .element-332{}
                        .element-333{}
                        .element-335{}
                        .element-336{}
                        .element-338{}
                        .element-339{}
                        .element-341{}
                        .element-344{margin-top:16px;}
                        .element-348{width:70%;text-align:center;}
                        .element-349{text-align:center;}
                        .element-350{}
                        .element-351{width:80%;text-align:center;}
                        .element-352{text-align:center;}
                        .element-353{}
                        .element-354{margin-top:16px;text-indent:0px;}
                        .element-356{margin-top:16px;text-indent:0px;}
                        .element-358{}
                        .element-359{margin-top:16px;text-indent:0px;}
                        .element-361{text-align:center;}
                        .element-362{}
                        .element-363{margin-top:16px;text-indent:0px;}
                        .element-364{}
                        .element-365{margin-top:16px;text-indent:0px;}
                        .element-367{margin-top:16px;text-indent:0px;}
                        .element-368{}
                        .element-369{margin-top:16px;text-indent:0px;}
                        .element-371{margin-top:16px;}
                        .element-372{margin-top:16px;}
                        .element-380{text-align:center;}
                        .element-381{text-align:center;}
                        .element-382{}
                        .element-385{text-align:center;}
                        .element-386{border-bottom:0px solid #365F91;}
                        .element-389{}
                        .element-390{}
                        .element-391{border-bottom:0px solid #7F7F7F;}
                        .element-392{}
                        .element-394{}
                        .element-395{}
                        .element-396{border-bottom:0px solid #7F7F7F;}
                        .element-397{}
                        .element-399{}
                        .element-400{}
                        .element-401{border-bottom:0px solid #7F7F7F;}
                        .element-402{}
                        .element-404{}
                        .element-405{}
                        .element-406{border-bottom:0px solid #7F7F7F;}
                        .element-407{}
                        .element-409{}
                        .element-410{}
                        .element-411{border-bottom:0px solid #7F7F7F;}
                        .element-412{}
                        .element-414{}
                        .element-415{}
                        .element-416{border-bottom:0px solid #365F91;}
                        .element-419{text-align:center;}
                        .element-420{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-422{border-left:4px solid #365F91;}
                        .element-423{}
                        .element-424{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-425{}
                        .element-426{border-left:4px solid #7F7F7F;}
                        .element-427{}
                        .element-428{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-429{}
                        .element-430{border-left:4px solid #7F7F7F;}
                        .element-431{}
                        .element-432{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-433{}
                        .element-434{border-left:4px solid #7F7F7F;}
                        .element-435{}
                        .element-436{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-437{}
                        .element-438{border-left:4px solid #7F7F7F;}
                        .element-439{}
                        .element-440{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-441{}
                        .element-442{border-left:4px solid #7F7F7F;}
                        .element-443{}
                        .element-444{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-447{text-align:center;}
                        .element-448{border-bottom:0px solid #365F91;}
                        .element-450{}
                        .element-451{}
                        .element-452{border-bottom:0px solid #7F7F7F;}
                        .element-453{}
                        .element-454{}
                        .element-455{}
                        .element-456{border-bottom:0px solid #7F7F7F;}
                        .element-457{}
                        .element-458{}
                        .element-459{}
                        .element-460{border-bottom:0px solid #7F7F7F;}
                        .element-461{}
                        .element-462{}
                        .element-463{}
                        .element-464{border-bottom:0px solid #7F7F7F;}
                        .element-465{}
                        .element-466{}
                        .element-467{}
                        .element-468{border-bottom:0px solid #7F7F7F;}
                        .element-469{}
                        .element-470{}
                        .element-471{}
                        .element-472{border-bottom:0px solid #365F91;}
                        .element-474{text-align:center;}
                        .element-475{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-478{border-left:4px solid #365F91;}
                        .element-479{}
                        .element-480{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-481{}
                        .element-483{border-left:4px solid #7F7F7F;}
                        .element-484{}
                        .element-485{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-486{}
                        .element-488{border-left:4px solid #7F7F7F;}
                        .element-489{}
                        .element-490{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-491{}
                        .element-493{border-left:4px solid #7F7F7F;}
                        .element-494{}
                        .element-495{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-496{}
                        .element-498{border-left:4px solid #7F7F7F;}
                        .element-499{}
                        .element-500{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-501{}
                        .element-503{border-left:4px solid #7F7F7F;}
                        .element-504{}
                        .element-505{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-508{text-align:center;}
                        .element-509{border-bottom:0px solid #365F91;}
                        .element-511{}
                        .element-512{}
                        .element-513{border-bottom:0px solid #7F7F7F;}
                        .element-514{}
                        .element-515{}
                        .element-516{}
                        .element-517{border-bottom:0px solid #7F7F7F;}
                        .element-518{}
                        .element-519{}
                        .element-520{}
                        .element-521{border-bottom:0px solid #7F7F7F;}
                        .element-522{}
                        .element-523{}
                        .element-524{}
                        .element-525{border-bottom:0px solid #7F7F7F;}
                        .element-526{}
                        .element-527{}
                        .element-528{}
                        .element-529{border-bottom:0px solid #7F7F7F;}
                        .element-530{}
                        .element-531{}
                        .element-532{}
                        .element-533{border-bottom:0px solid #365F91;}
                        .element-535{text-align:center;}
                        .element-536{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-539{border-left:4px solid #365F91;}
                        .element-540{}
                        .element-541{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-542{}
                        .element-544{border-left:4px solid #7F7F7F;}
                        .element-545{}
                        .element-546{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-547{}
                        .element-549{border-left:4px solid #7F7F7F;}
                        .element-550{}
                        .element-551{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-552{}
                        .element-554{border-left:4px solid #7F7F7F;}
                        .element-555{}
                        .element-556{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-557{}
                        .element-559{border-left:4px solid #7F7F7F;}
                        .element-560{}
                        .element-561{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-562{}
                        .element-564{border-left:4px solid #7F7F7F;}
                        .element-565{}
                        .element-566{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-569{text-align:center;}
                        .element-570{border-bottom:0px solid #365F91;}
                        .element-572{}
                        .element-573{}
                        .element-574{border-bottom:0px solid #7F7F7F;}
                        .element-575{}
                        .element-576{}
                        .element-577{}
                        .element-578{border-bottom:0px solid #7F7F7F;}
                        .element-579{}
                        .element-580{}
                        .element-581{}
                        .element-582{border-bottom:0px solid #7F7F7F;}
                        .element-583{}
                        .element-584{}
                        .element-585{}
                        .element-586{border-bottom:0px solid #7F7F7F;}
                        .element-587{}
                        .element-588{}
                        .element-589{}
                        .element-590{border-bottom:0px solid #7F7F7F;}
                        .element-591{}
                        .element-592{}
                        .element-593{}
                        .element-594{border-bottom:0px solid #365F91;}
                        .element-596{text-align:center;}
                        .element-597{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-600{border-left:4px solid #365F91;}
                        .element-601{}
                        .element-602{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-603{}
                        .element-605{border-left:4px solid #7F7F7F;}
                        .element-606{}
                        .element-607{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-608{}
                        .element-610{border-left:4px solid #7F7F7F;}
                        .element-611{}
                        .element-612{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-613{}
                        .element-615{border-left:4px solid #7F7F7F;}
                        .element-616{}
                        .element-617{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-618{}
                        .element-620{border-left:4px solid #7F7F7F;}
                        .element-621{}
                        .element-622{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-623{}
                        .element-625{border-left:4px solid #7F7F7F;}
                        .element-626{}
                        .element-627{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-630{text-align:center;}
                        .element-631{border-bottom:0px solid #365F91;}
                        .element-633{}
                        .element-634{}
                        .element-635{border-bottom:0px solid #7F7F7F;}
                        .element-636{}
                        .element-637{}
                        .element-638{}
                        .element-639{border-bottom:0px solid #7F7F7F;}
                        .element-640{}
                        .element-641{}
                        .element-642{}
                        .element-643{border-bottom:0px solid #7F7F7F;}
                        .element-644{}
                        .element-645{}
                        .element-646{}
                        .element-647{border-bottom:0px solid #7F7F7F;}
                        .element-648{}
                        .element-649{}
                        .element-650{}
                        .element-651{border-bottom:0px solid #7F7F7F;}
                        .element-652{}
                        .element-653{}
                        .element-654{}
                        .element-655{border-bottom:0px solid #365F91;}
                        .element-657{text-align:center;}
                        .element-658{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-661{border-left:4px solid #365F91;}
                        .element-662{}
                        .element-663{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-664{}
                        .element-666{border-left:4px solid #7F7F7F;}
                        .element-667{}
                        .element-668{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-669{}
                        .element-671{border-left:4px solid #7F7F7F;}
                        .element-672{}
                        .element-673{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-674{}
                        .element-676{border-left:4px solid #7F7F7F;}
                        .element-677{}
                        .element-678{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-679{}
                        .element-681{border-left:4px solid #7F7F7F;}
                        .element-682{}
                        .element-683{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-684{}
                        .element-686{border-left:4px solid #7F7F7F;}
                        .element-687{}
                        .element-688{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-691{text-align:center;}
                        .element-692{border-bottom:0px solid #365F91;}
                        .element-694{}
                        .element-695{}
                        .element-696{border-bottom:0px solid #7F7F7F;}
                        .element-697{}
                        .element-698{}
                        .element-699{}
                        .element-700{border-bottom:0px solid #7F7F7F;}
                        .element-701{}
                        .element-702{}
                        .element-703{}
                        .element-704{border-bottom:0px solid #7F7F7F;}
                        .element-705{}
                        .element-706{}
                        .element-707{}
                        .element-708{border-bottom:0px solid #7F7F7F;}
                        .element-709{}
                        .element-710{}
                        .element-711{}
                        .element-712{border-bottom:0px solid #7F7F7F;}
                        .element-713{}
                        .element-714{}
                        .element-715{}
                        .element-716{border-bottom:0px solid #365F91;}
                        .element-718{text-align:center;}
                        .element-719{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-722{border-left:4px solid #365F91;}
                        .element-723{}
                        .element-724{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-725{}
                        .element-727{border-left:4px solid #7F7F7F;}
                        .element-728{}
                        .element-729{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-730{}
                        .element-731{border-left:4px solid #7F7F7F;}
                        .element-732{}
                        .element-733{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-734{}
                        .element-735{border-left:4px solid #7F7F7F;}
                        .element-736{}
                        .element-737{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-738{}
                        .element-739{border-left:4px solid #7F7F7F;}
                        .element-740{}
                        .element-741{border-top:0px solid #7F7F7F;border-right:4px solid #7F7F7F;}
                        .element-742{}
                        .element-743{border-left:4px solid #7F7F7F;}
                        .element-744{}
                        .element-745{border-top:0px solid #365F91;border-right:4px solid #365F91;}
                        .element-747{}
                        .element-751{}
                        .element-755{}
                        .element-757{}
                        .element-759{}
                        .element-761{float:left;line-height:3.9625;vertical-align:baseline;}
                        .element-761 .r{font-size:78px;}
                        .element-762{font-size:78px;}
                        .element-763{text-indent:0px;}
                        .element-768{}
                        .element-779{}
                        .element-792{}
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
                        .element-804{}
                        .element-804 .r{font-weight:bold;font-size:16px;}
                        .element-805{font-size:16px;}
                        .element-806{font-size:16px;}
                        .element-807{font-size:16px;}
                        .element-808{font-size:16px;}
                        .element-809{font-size:16px;}
                        .element-810{font-size:16px;}
                        .element-811{font-size:16px;}
                        .element-812{font-size:16px;}
                        .element-813{}
                        .element-813 .r{font-size:16px;}
                        .element-814{font-size:16px;}
                        .element-815{font-size:16px;}
                        .element-816{font-size:16px;}
                        .element-817{font-size:16px;}
                        .element-818{font-size:16px;}
                        .element-819{font-size:16px;}
                        .element-820{font-size:16px;}
                        .element-821{font-size:16px;}
                        .element-822{}
                        .element-822 .r{font-size:16px;}
                        .element-823{font-size:16px;}
                        .element-824{font-size:16px;}
                        .element-825{font-size:16px;}
                        .element-826{font-size:16px;}
                        .element-827{font-size:16px;}
                        .element-828{font-size:16px;}
                        .element-829{font-size:16px;}
                        .element-830{font-size:16px;}
                        .element-831{}
                        .element-831 .r{font-size:16px;}
                        .element-832{font-size:16px;}
                        .element-833{font-size:16px;}
                        .element-834{font-size:16px;}
                        .element-835{font-size:16px;}
                        .element-836{font-size:16px;}
                        .element-837{font-size:16px;}
                        .element-838{font-size:16px;}
                        .element-839{font-size:16px;}
                        .element-840{}
                        .element-840 .r{font-weight:bold;font-size:16px;}
                        .element-841{font-size:16px;}
                        .element-842{font-size:16px;}
                        .element-843{font-size:16px;}
                        .element-844{font-size:16px;}
                        .element-845{font-size:16px;}
                        .element-846{font-size:16px;}
                        .element-847{font-size:16px;}
                        .element-848{font-size:16px;}
                        .element-849{}
                        .element-849 .r{font-weight:bold;font-size:16px;}
                        .element-850{font-size:16px;}
                        .element-851{font-size:16px;}
                        .element-852{font-size:16px;}
                        .element-853{font-size:16px;}
                        .element-854{font-size:16px;}
                        .element-855{font-size:16px;}
                        .element-856{font-size:16px;}
                        .element-857{font-size:16px;}
                        .element-858{}
                        .element-858 .r{font-size:16px;}
                        .element-859{font-size:16px;}
                        .element-860{font-size:16px;}
                        .element-861{font-size:16px;}
                        .element-862{font-size:16px;}
                        .element-863{font-size:16px;}
                        .element-864{font-size:16px;}
                        .element-865{font-size:16px;}
                        .element-866{font-size:16px;}
                        .element-867{}
                        .element-867 .r{font-size:16px;}
                        .element-868{font-size:16px;}
                        .element-869{font-size:16px;}
                        .element-870{font-size:16px;}
                        .element-871{font-size:16px;}
                        .element-872{font-size:16px;}
                        .element-873{font-size:16px;}
                        .element-874{font-size:16px;}
                        .element-875{font-size:16px;}
                        .element-876{}
                        .element-876 .r{font-size:16px;}
                        .element-877{font-size:16px;}
                        .element-878{font-size:16px;}
                        .element-879{font-size:16px;}
                        .element-880{font-size:16px;}
                        .element-881{font-size:16px;}
                        .element-882{font-size:16px;}
                        .element-883{font-size:16px;}
                        .element-884{font-size:16px;}
                        .element-885{}
                        .element-885 .r{font-size:16px;}
                        .element-886{font-size:16px;}
                        .element-887{font-size:16px;}
                        .element-888{font-size:16px;}
                        .element-889{font-size:16px;}
                        .element-890{font-size:16px;}
                        .element-891{font-size:16px;}
                        .element-892{font-size:16px;}
                        .element-893{font-size:16px;}
                        .element-894{}
                        .element-894 .r{font-weight:bold;font-size:16px;}
                        .element-895{font-size:16px;}
                        .element-896{font-size:16px;}
                        .element-897{font-size:16px;}
                        .element-898{font-size:16px;}
                        .element-899{font-size:16px;}
                        .element-900{font-size:16px;}
                        .element-901{font-size:16px;}
                        .element-902{font-size:16px;}
                        .element-903{}
                        .element-903 .r{font-weight:bold;font-size:16px;}
                        .element-904{font-size:16px;}
                        .element-905{font-size:16px;}
                        .element-906{font-size:16px;}
                        .element-907{font-size:16px;}
                        .element-908{font-size:16px;}
                        .element-909{font-size:16px;}
                        .element-910{font-size:16px;}
                        .element-911{font-size:16px;}
                        .element-912{}
                        .element-912 .r{font-size:16px;}
                        .element-913{font-size:16px;}
                        .element-914{font-size:16px;}
                        .element-915{font-size:16px;}
                        .element-916{font-size:16px;}
                        .element-917{font-size:16px;}
                        .element-918{font-size:16px;}
                        .element-919{font-size:16px;}
                        .element-920{font-size:16px;}
                        .element-921{}
                        .element-921 .r{font-size:16px;}
                        .element-922{font-size:16px;}
                        .element-923{font-size:16px;}
                        .element-924{font-size:16px;}
                        .element-925{font-size:16px;}
                        .element-926{font-size:16px;}
                        .element-927{font-size:16px;}
                        .element-928{font-size:16px;}
                        .element-929{font-size:16px;}
                        .element-930{}
                        .element-930 .r{font-size:16px;}
                        .element-931{font-size:16px;}
                        .element-932{font-size:16px;}
                        .element-933{font-size:16px;}
                        .element-934{font-size:16px;}
                        .element-935{font-size:16px;}
                        .element-936{font-size:16px;}
                        .element-937{font-size:16px;}
                        .element-938{font-size:16px;}
                        .element-939{}
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
                        .element-951{}
                        .element-955{}
                        .element-957{}
                        .element-962{}
                        .element-963{}
                        .element-970{}
                        .element-974{}
                        .element-976{display:list-item;list-style-type:disc;}
                        .element-978{display:list-item;list-style-type:disc;}
                        .element-980{}
                        .element-982{display:list-item;list-style-type:disc;}
                        .element-984{display:list-item;list-style-type:disc;}
                        .element-986{}
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
                        .element-1013{}
                        .element-1015{display:list-item;list-style-type:disc;}
                        .element-1017{display:list-item;list-style-type:disc;}
                        .element-1019{text-indent:0px;}
                        .element-1021{display:list-item;list-style-type:disc;}
                        .element-1023{display:list-item;list-style-type:disc;}
                        .element-1025{margin-left:96px;text-indent:0px;}
                        .element-1026{}
                    `.trim().replace(/[ ]{2,}/g, '') + '\n');
                });
            });
        });
    });
});