import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";

export class Band implements NodeParent {
    type=Nodes.Band;

    name: string;
    originationDate: Date;

    toString() : string {
        return `name: "${this.name}", originationDate: date("${this.originationDate.getFullYear()}-${this.originationDate.getMonth()}-${this.originationDate.getDate()}")`;
    }
}