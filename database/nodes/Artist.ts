import { DateEntity } from "../entities/DateEntity";
import { Image } from "../entities/Image";
import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";

export class Artist extends NodeParent {
    type = Nodes.Artist;

    name: string;
    dateOfBirth: DateEntity;
    thumbnail: Image;

    public constructor(id: string, name: string, dateOfBirth: DateEntity, thumbnail: Image) {
        super();
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.thumbnail = thumbnail;
    }

    toString(): string {
        return `
            name: "${this.name}",
            dateOfBirth: ${this.dateOfBirth.toString()},
            id: "${this.id}"
        `;
    }

    static fromJSON(json : any): Artist {
        return new Artist(json.id, json.name, new DateEntity(json.dateOfBirth), Image.fromJSON(json.thumbnail));
    }
}