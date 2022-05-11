import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";
import {DateEntity} from "../entities/DateEntity";

export class SongVoteList extends NodeParent {
    type=Nodes.SongVoteList;

    creationDate: DateEntity;
    endDate: DateEntity;

    public constructor(
        id: string,
        creationDate: DateEntity,
        endDate: DateEntity
    ) {
        super();
        this.id = id;
        this.creationDate = creationDate;
        this.endDate = endDate;
    }

    toString() : string {
        return `
            creationDate: ${this.creationDate.toString()},
            endDate: ${this.endDate.toString()},
            id: "${this.id}"
        `;
    }

    static fromJSON(json: any): SongVoteList {
        return new SongVoteList(json.id, json.creationDate, json.endDate);
    }
}