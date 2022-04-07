import { Like } from "./like.model";
import { PhotoFile } from "./photo-file.model";
import { User } from "./user.model";

export class Publication {
    id: number | null;
    title: string | null;
    content: string | null;
    creationDate: Date | null;
    type: string | null;
    files: PhotoFile[] | null;
    comments: Publication[] | null;
    likes: Like[] | null;
    creator: User | null;
    reference: Publication | null;
    visualizations: number | null;

    constructor(id?: number | null, title?: string | null, content?: string | null, creationDate?: Date | null, type?: string | null, 
        files?: PhotoFile[] | null, comments?: Publication[] | null, likes?: Like[] | null, creator?: User | null, reference?: Publication | null, visualizations?: number | null) {
            this.id = (id ? id : null);
            this.title = (title ? title : null);
            this.content = (content ? content : null);
            this.creationDate = (creationDate ? creationDate : null);
            this.type = (type ? type : null);
            this.files = (files && files.length ? files : []);
            this.comments = (comments && comments.length ? comments : []);
            this.likes = (likes && likes.length ? likes : []);
            this.creator = (creator ? creator : null);
            this.reference = (reference ? reference : null);
            this.visualizations = (visualizations ? visualizations : null);
        }
}