export default function textShadowStyle (style: string, attributes: {[key: string]: string}, tagName: string): string {
    const value: string = attributes['w:val'];

    if (!value || value === 'true' || value === '1') {
        const emboss: boolean = tagName.indexOf('emboss') >= 0;

        if (emboss) {
            style += 'color:#FFFFFF;';
        }

        style += 'text-shadow:0 1px 0 rgba(255,255,255,0.5);';
    }

    return style;
}