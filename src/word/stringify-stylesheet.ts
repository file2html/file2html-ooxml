export default function stringifyStylesheet (stylesheet: {[key: string]: string}): string {
    let styles: string = '';

    for (const selector in stylesheet) {
        if (stylesheet.hasOwnProperty(selector)) {
            const rules: string = stylesheet[selector];

            if (rules) {
                styles += `${ selector }{${ rules }}\n`;
            }
        }
    }

    return styles;
}