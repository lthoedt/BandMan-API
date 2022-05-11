import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";

export class Genre extends NodeParent {
    type=Nodes.Genre;

    name: string;

    public constructor(name : string) {
        super();
        this.name = name;
    }

    toString() : string {
        return `
            name: "${this.name}"
        `;
    }

    static fromJSON(json: any): Genre {
        return new Genre(json.name);
    }
}