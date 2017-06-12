export interface DocumentContentParsingOptions {
    prettify?: boolean;
}
export default function parseDocumentContent(fileContent: string, options?: DocumentContentParsingOptions): {
    styles: string;
    content: string;
};
