import twipToPx from '../../twip-to-px';

export default function tableWidthStyle (style: string, attributes: {[key: string]: string}): string {
    const width: string = attributes['w:w'];
    const type: string = attributes['w:type'];

    if (!width) {
        return style;
    }

    switch (type) {
        case 'nil':
            style += 'width:0;';
            break;
        case 'pct':
            style += `width:${ Number(width) / 50 }%;`;
            break;
        case 'dxa':
            style += `width:${ twipToPx(width) }px;`;
            break;
        default:
            //
    }

    return style;
}