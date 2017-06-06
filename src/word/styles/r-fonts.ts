export default function rFontsStyle (style: string, attributes: {[key: string]: string}): string {
    const fontFamily: string = attributes['w:ascii'];

    if (fontFamily) {
        style += 'font-family:' + fontFamily + ';';
    }

    return style;
}