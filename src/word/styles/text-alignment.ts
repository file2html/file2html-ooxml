export default function textAlignmentStyle (style: string, attributes: {[key: string]: string}): string {
    let verticalAlign: string = attributes['w:val'];

    switch (verticalAlign) {
        case 'baseline':
        case 'bottom':
        case 'top':
            break;
        case 'center':
            verticalAlign = 'middle';
            break;
        case 'subscript':
            verticalAlign = 'sub';
            break;
        case 'superscript':
            verticalAlign = 'super';
            break;
        default:
            verticalAlign = '';
    }

    if (verticalAlign) {
        style += 'vertical-align:' + verticalAlign + ';';
    }

    return style;
}