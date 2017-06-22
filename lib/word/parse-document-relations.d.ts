import { Archive } from 'file2html-archive-tools';
export interface Relations {
    [key: string]: string;
}
export default function parseDocumentRelations(fileContent: string, archive: Archive): Promise<Relations>;
