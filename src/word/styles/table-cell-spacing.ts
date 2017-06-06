import twipToPx from '../../twip-to-px';

export default function tableCellSpacingStyle (style: string, attributes: {[key: string]: string}): string {
    const value: string = attributes['w:w'];
    const type: string = attributes['w:type'];

    if (!value) {
        return style;
    }

    switch (type) {
        case 'nil':
            style += 'border-collapse:collapse;border-spacing:0;';
            break;
        case 'pct':
            style += `border-collapse:separate;border-spacing:${ Number(value) / 50 }%;`;
            break;
        case 'dxa':
            style += `border-collapse:separate;border-spacing:${ twipToPx(value) }px;`;
            break;
        default:
            //
    }

    return style;
}