import { BandDTO } from "../../dtos/BandDTO";
import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";

export class Band extends NodeParent {
    type=Nodes.Band;

    name: string;
    originationDate: Date;

    public constructor(name : string, originationDate : Date) {
        super();
        this.name = name;
        this.originationDate = originationDate;
    }

    toString() : string {
        return `name: "${this.name}", originationDate: date("${this.originationDate.getFullYear()}-${this.originationDate.getMonth()}-${this.originationDate.getDate()}"), id: "${this.id}"`;
    }

    static fromDTO(bandDTO : BandDTO) : Band {
        return new Band(bandDTO.name, bandDTO.originateDate);
    }
}