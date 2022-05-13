import { NodeStructure } from "./NodeStructure";
import { Nodes } from "./Nodes";
import { SongVoteListDTO } from "../../dtos/SongVoteListDTO";
import { dateToString } from "../../controllers/functions";

export class SongVoteList extends NodeStructure {

    type=Nodes.SongVoteList;

    creationDate: Date;
    endDate: Date;

    public constructor(
        id: string,
        creationDate: Date,
        endDate: Date
    ) {
        super();
        this.id = id;
        this.creationDate = creationDate;
        this.endDate = endDate;
    }

    generateCreationDate(): Date {
        this.creationDate = new Date(new Date());
        return this.creationDate;
    }

    toString() : string {
        return `
            creationDate: ${dateToString(this.creationDate)},
            endDate: ${dateToString(this.endDate)},
            id: "${this.id}"
        `;
    }

    static fromJSON(json: any): SongVoteList {
        return new SongVoteList(json.id, json.creationDate, json.endDate);
    }

    static fromDTO(songVoteListDto: SongVoteListDTO) {
        return new SongVoteList(songVoteListDto.id, songVoteListDto.creationDate, songVoteListDto.endDate);
    }
}