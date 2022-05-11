import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";

export class Label extends NodeParent {
    type = Nodes.Label;

    name: string;

    public constructor(id: string, name: string) {
        super();
        this.id = id;
        this.name = name;
    }

    toString(): string {
        return `
            name: "${this.name}",
            id: "${this.id}"
        `;
    }

    static fromJSON(json: any): Label {
        return new Label(json.id, json.name);
    }
}