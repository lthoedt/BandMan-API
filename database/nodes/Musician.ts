import { NodeParent } from "./NodeParent";
import { Name } from "../entities/Name";
import { Nodes } from "./Nodes";
import { MusicianDTO } from "../../dtos/MusicianDTO";
import { v4 as uuidv4 } from 'uuid';

export class Musician implements NodeParent {
    type=Nodes.Musician;

    name: Name;
    dateOfBirth : Date;
    id: string;

    public constructor(name : Name, dateOfBirth : Date) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
    }

    toString() : string {
        return `${this.name.toString()}, dateOfBirth: date("${this.dateOfBirth.getFullYear()}-${this.dateOfBirth.getMonth()}-${this.dateOfBirth.getDate()}"), id: "${this.id}"`;
    }

    static fromDTO(musicianDTO : MusicianDTO) : Musician {
        return new Musician(musicianDTO.name, musicianDTO.dateOfBirth);
    }

    public generateId() : string {
        this.id = uuidv4();
        return this.id;
    }
}