import { DateEntity } from "../entities/DateEntity";
import { BandDTO } from "../../dtos/BandDTO";
import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";

export class Band extends NodeParent {
    type = Nodes.Band;

    name: string;
    originationDate: DateEntity;

    public constructor(id: string, name: string, originationDate: DateEntity) {
        super();
        this.id = id;
        this.name = name;
        this.originationDate = originationDate;
    }

    toString(): string {
        return `
            name: "${this.name}",
            originationDate: ${this.originationDate.toString()},
            id: "${this.id}"
        `;
    }

    static fromDTO(bandDTO: BandDTO): Band {
        return new Band(bandDTO.id, bandDTO.name, bandDTO.originateDate);
    }
}