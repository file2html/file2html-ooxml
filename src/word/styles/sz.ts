import ptToPx from '../../pt-to-px';

export default function textSizeStyle (style: string, attributes: {[key: string]: string}): string {
    const size: string = attributes['w:val'];

    if (size) {
        style += 'font-size:' + ptToPx(size, 2) + 'px;';
    }

    return style;
}