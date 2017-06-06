export default function highlightStyle (style: string, attributes: {[key: string]: string}): string {
    const backgroundColor: string = attributes['w:val'];

    if (backgroundColor) {
        style += 'background-color:' + backgroundColor + ';';
    }

    return style;
}