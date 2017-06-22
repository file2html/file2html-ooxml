import ptToPx from '../../pt-to-px';

export default function textAlignmentStyle (
    style: string,
    attributes: {[key: string]: string},
    tagName: string
): string {
    const size: string = attributes['w:sz'];
    let color: string = attributes['w:color'];
    let type: string = attributes['w:val'];

    if (size && color && type && type !== 'nil' && type !== 'none') {
        switch (type) {
            case 'dashed':
            case 'dotted':
            case 'double':
            case 'inset':
            case 'outset':
                break;
            default:
                type = 'solid';
        }
        let ruleName: string;

        if (tagName.indexOf('top') >= 0) {
            ruleName = 'border-top';
        } else if (tagName.indexOf('bottom') >= 0) {
            ruleName = 'border-bottom';
        } else if (tagName.indexOf('left') >= 0) {
            ruleName = 'border-left';
        } else if (tagName.indexOf('right') >= 0) {
            ruleName = 'border-right';
        }

        if (color === 'auto') {
            color = 'currentColor';
        } else {
            color = '#' + color;
        }

        let borderWidth: number = Math.ceil(ptToPx(size, 8));

        // 1px is a minimal border width
        if (size && size !== '0' && !borderWidth) {
            borderWidth = 1;
        }

        style += `${ ruleName }:${ borderWidth }px ${ type } ${ color };`;
    }

    return style;
}