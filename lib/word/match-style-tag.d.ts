export interface TagStyleMatchProps {
    tagName: string;
    attributes: {
        [key: string]: string;
    };
    styles: string;
}
export default function matchStyleTag({tagName, attributes, styles}: TagStyleMatchProps): string;
