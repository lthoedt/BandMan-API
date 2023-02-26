import NodeStructure from "./NodeStructure";
import Nodes from "./Nodes";

export default class Image extends NodeStructure {
    type=Nodes.Image;

    url: string;

    public constructor(url: string) {
        super();
        this.url = url;
    }

    toString() : string {
        return `
            url: "${this.url}"
        `;
    }

    static fromJSON(json: any): Image {
        return new Image(json.url);
    }
}