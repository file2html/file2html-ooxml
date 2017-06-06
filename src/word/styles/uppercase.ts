export default function uppercaseStyle (style: string, attributes: {[key: string]: string}): string {
    const value: string = attributes['w:val'];

    if (!value || value === 'true' || value === '1') {
        style += 'text-transform:uppercase;';
    }

    return style;
}