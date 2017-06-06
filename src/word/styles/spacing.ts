import ptToPx from '../../pt-to-px';

export default function spacingStyle (style: string, attributes: {[key: string]: string}): string {
    const beforeAutospacing: string = attributes['w:beforeAutospacing'];
    const afterAutospacing: string = attributes['w:afterAutospacing'];
    const before: string = attributes['w:before'];
    const after: string = attributes['w:after'];
    const line: string = attributes['w:line'];

    if (line) {
        style += 'line-height:' + (Number(line) / 240) + ';';
    }

    if (before && beforeAutospacing !== '1' && beforeAutospacing !== 'true') {
        style += 'margin-top:' + ptToPx(before, 20) + 'px;';
    }

    if (after && afterAutospacing !== '1' && afterAutospacing !== 'true') {
        style += 'margin-bottom:' + ptToPx(after, 20) + 'px;';
    }

    return style;
}