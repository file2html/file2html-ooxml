export default function vanishStyle (style: string, attributes: {[key: string]: string}): string {
    const value: string = attributes['w:val'];

    if (value !== '0' && value !== 'false') {
        style += 'visibility:hidden;';
    }

    return style;
}