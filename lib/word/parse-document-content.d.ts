export interface DocumentContentParsingOptions {
    prettify?: boolean;
    relations: {
        [key: string]: string;
    };
}
export default function parseDocumentContent(fileContent: string, options: DocumentContentParsingOptions): {
    styles: string;
    content: string;
};
