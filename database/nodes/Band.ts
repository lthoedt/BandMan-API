import { BandDTO } from "../../dtos/BandDTO";
import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";

export class Band implements NodeParent {
    type=Nodes.Band;

    name: string;
    originationDate: Date;

    public constructor(name : string, originationDate : Date) {
        this.name = name;
        this.originationDate = originationDate;
    }

    toString() : string {
        return `name: "${this.name}", originationDate: date("${this.originationDate.getFullYear()}-${this.originationDate.getMonth()}-${this.originationDate.getDate()}")`;
    }

    static fromDTO(bandDTO : BandDTO) : Band {
        return new Band(bandDTO.name, bandDTO.originateDate);
    }
}