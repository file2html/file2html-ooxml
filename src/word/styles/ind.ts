import twipToPx from '../../twip-to-px';

export default function indentationStyle (style: string, attributes: {[key: string]: string}): string {
    const leftIndent: string = attributes['w:left'] || attributes['w:start'];
    const rightIndent: string = attributes['w:right'] || attributes['w:end'];
    const hanging: string = attributes['w:hanging'];
    const firstLineIndent: string = attributes['w:firstLine'];

    if (leftIndent) {
        style += 'margin-left:' + twipToPx(leftIndent) + 'px;';
    }
    if (rightIndent) {
        style += 'margin-right:' + twipToPx(rightIndent) + 'px;';
    }
    if (firstLineIndent && !hanging) {
        style += 'text-indent:' + twipToPx(firstLineIndent) + 'px;';
    }

    return style;
}