import { NodeStructure } from "./NodeStructure";
import { Name } from "../entities/Name";
import { Nodes } from "./Nodes";
import { MusicianDTO } from "../../dtos/MusicianDTO";
import { dateToString } from "../../controllers/functions";

export class Musician extends NodeStructure {

    type = Nodes.Musician;

    name: Name;
    dateOfBirth: Date;
    email: string;

    public constructor(name: Name, dateOfBirth: Date, email: string, id: string) {
        super();
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.id = id;
    }

    toString(): string {
        return `
            ${this.name.toString()},
            dateOfBirth: ${dateToString(this.dateOfBirth)},
            email: "${this.email}",
            id: "${this.id}"
        `;
    }

    static fromDTO(musicianDTO: MusicianDTO): Musician {
        return new Musician(musicianDTO.name, musicianDTO.dateOfBirth, musicianDTO.email, musicianDTO.id);
    }

    static fromQuery(result: any): Musician {
        const musicianDto = MusicianDTO.fromJSON(result);
        return Musician.fromDTO(musicianDto);
    }
}