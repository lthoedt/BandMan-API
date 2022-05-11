import { dateToString } from "../../controllers/functions";
import { BandDTO } from "../../dtos/BandDTO";
import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";

export class Band extends NodeParent {
    type = Nodes.Band;

    name: string;
    originationDate: Date;

    public constructor(id: string, name: string, originationDate: Date) {
        super();
        this.id = id;
        this.name = name;
        this.originationDate = originationDate;
    }

    toString(): string {
        return `
            name: "${this.name}",
            originationDate: ${dateToString(this.originationDate)},
            id: "${this.id}"
        `;
    }

    static fromDTO(bandDTO: BandDTO): Band {
        return new Band(bandDTO.id, bandDTO.name, bandDTO.originateDate);
    }
}