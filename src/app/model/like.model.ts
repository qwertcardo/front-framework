import { Publication } from "./publication.model";
import { User } from "./user.model";

export class Like {
    id: number | null;
    user: User | null;
    publication: Publication | null;

    constructor(id?: number | null, user?: User, publication?: Publication) {
        this.id = (id ? id : null);
        this.user = (user ? user : null);
        this.publication = (publication ? publication : null);
    }
}