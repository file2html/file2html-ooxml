export default function italicStyle (style: string, attributes: {[key: string]: string}): string {
    const value: string = attributes['w:val'];

    if (value !== '0' && value !== 'false') {
        style += 'font-style:italic;';
    }

    return style;
}