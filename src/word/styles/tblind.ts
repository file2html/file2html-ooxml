import twipToPx from '../../twip-to-px';

export default function tableIndentStyle (style: string, attributes: {[key: string]: string}): string {
    const width: string = attributes['w:w'];
    const type: string = attributes['w:type'];

    switch (type) {
        case 'nil':
            style += 'margin-left:0;';
            break;
        case 'dxa':
            style += `margin-left:${ twipToPx(width) }px;`;
            break;
        default:
        //
    }

    return style;
}