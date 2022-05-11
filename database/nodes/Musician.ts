import { NodeParent } from "./NodeParent";
import { Name } from "../entities/Name";
import { Nodes } from "./Nodes";
import { MusicianDTO } from "../../dtos/MusicianDTO";

export class Musician extends NodeParent {

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
        return `${this.name.toString()}, dateOfBirth: date("${this.dateOfBirth.getFullYear()}-${this.dateOfBirth.getMonth()}-${this.dateOfBirth.getDate()}"), id: "${this.id}", email: "${this.email}"`;
    }

    static fromDTO(musicianDTO: MusicianDTO): Musician {
        return new Musician(musicianDTO.name, musicianDTO.dateOfBirth, musicianDTO.email, musicianDTO.id);
    }

    static fromQuery(result: any): Musician {
        const musicianDto = MusicianDTO.fromJSON(result);
        return Musician.fromDTO(musicianDto);
    }
}