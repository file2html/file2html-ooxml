import {parseXML} from 'file2html-xml-tools/lib/sax';
import {Archive} from 'file2html-archive-tools';

export interface Relations {
    [key: string]: string;
}

export default function parseDocumentRelations (fileContent: string, archive: Archive): Promise<Relations> {
    const relations: Relations = {};
    const queue: Promise<any>[] = [];

    parseXML(fileContent, {
        onopentag (tagName: string, attrs: {[key: string]: string}) {
            if (tagName === 'Relationship') {
                const {Id: id, Target: path} = attrs;

                if (id && path.includes('media/')) {
                    queue.push(archive.file(path).async('base64').then((data: string) => {
                        relations[id] = data;
                    }));
                }
            }
        }
    });

    return Promise.all(queue).then(() => relations);
}