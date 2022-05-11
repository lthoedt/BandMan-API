import { Name } from "../database/entities/Name";

export class MusicianDTO {

    name: Name;
    dateOfBirth: Date;
    id: string;

    static fromJSON(json: any): MusicianDTO {
        try {
            const musicianDTO: MusicianDTO = new MusicianDTO;

            // TODO: Create message so not correct name;
            const name : Name = Name.fromJSON(json.name);
            if (name == null) return null;

            musicianDTO.name = name;
            musicianDTO.dateOfBirth = new Date(json.dateOfBirth);

            musicianDTO.id = json.id;

            return musicianDTO;
        } catch {
            return null;
        }
    }
}