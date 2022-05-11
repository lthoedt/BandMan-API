import { dateToString } from "../../controllers/functions";
import { Image } from "../entities/Image";
import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";

export class Artist extends NodeParent {
    type = Nodes.Artist;

    name: string;
    dateOfBirth: Date;
    thumbnail: Image;

    public constructor(id: string, name: string, dateOfBirth: Date, thumbnail: Image) {
        super();
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.thumbnail = thumbnail;
    }

    toString(): string {
        return `
            name: "${this.name}",
            dateOfBirth: ${dateToString(this.dateOfBirth)},
            id: "${this.id}"
        `;
    }

    static fromJSON(json : any): Artist {
        return new Artist(json.id, json.name, new Date(json.dateOfBirth), Image.fromJSON(json.thumbnail));
    }
}