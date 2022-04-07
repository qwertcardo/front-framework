import { Publication } from "./publication.model";

export class PhotoFile {
    id: number | null;
    fileName: string | null;
    content64: string | null;
    description: string | null;
    publication: Publication | null;

    constructor(id?: number | null, fileName?: string, content64?: string, description?: string | null, publication?: Publication | null) {
        this.id = (id ? id : null);
        this.fileName = (fileName ? fileName : null);
        this.content64 = (content64 ? content64 : null);
        this.description = (description ? description : null);
        this.publication = (publication ? publication : null);
    }
}