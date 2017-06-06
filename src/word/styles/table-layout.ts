export default function tableWidthStyle (style: string, attributes: {[key: string]: string}): string {
    const type: string = attributes['w:type'];

    style += `table-layout:${ type === 'fixed' ? 'fixed' : 'auto' };`;

    return style;
}