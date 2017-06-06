export default function justificationStyle (style: string, attributes: {[key: string]: string}): string {
    let textAlign: string = attributes['w:val'];

    switch (textAlign) {
        case 'start':
        case 'left':
            textAlign = 'left';
            break;
        case 'end':
        case 'right':
            textAlign = 'right';
            break;
        case 'center':
            break;
        case 'both':
        case 'distribute':
            textAlign = 'justify';
            break;
        default:
            textAlign = '';
    }

    if (textAlign) {
        style += 'text-align:' + textAlign + ';';
    }

    return style;
}