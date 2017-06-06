export default function framePrStyle (style: string, attributes: {[key: string]: string}): string {
    if (attributes['w:dropCap']) {
        style += 'float:left;';
    }

    return style;
}