import NodeStructure from "./NodeStructure";
import Nodes from "./Nodes";

export default class Genre extends NodeStructure {
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