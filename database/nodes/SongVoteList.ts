import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";
import {DateEntity} from "../entities/DateEntity";

export class SongVoteList extends NodeParent {
    type=Nodes.SongVoteList;

    creationDate: DateEntity;
    endDate: DateEntity;

    public constructor(
        creationDate: DateEntity,
        endDate: DateEntity
    ) {
        super();
        this.creationDate = creationDate;
        this.endDate = endDate;
    }

    toString() : string {
        return `
            creationDate: ${this.creationDate.toString()},
            endDate: ${this.endDate.toString()}
        `;
    }

    static fromJSON(json: any): SongVoteList {
        return new SongVoteList(json.creationDate, json.endDate);
    }
}