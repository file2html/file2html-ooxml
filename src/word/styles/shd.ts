export default function shadingStyle (style: string, attributes: {[key: string]: string}): string {
    const backgroundColor: string = attributes['w:fill'];

    if (backgroundColor && backgroundColor !== 'auto') {
        style += 'background-color:#' + backgroundColor + ';';
    }

    return style;
}