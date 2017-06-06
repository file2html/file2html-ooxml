export default function textColorStyle (style: string, attributes: {[key: string]: string}): string {
    const color: string = attributes['w:val'];

    if (color && color !== 'auto') {
        style += 'color:#' + color + ';';
    }

    return style;
}