import { Name } from "../database/entities/Name";

export class MusicianDTO {

    name: Name;
    dateOfBirth: Date;
    id: string;
    email : string;

    static fromJSON(json: any): MusicianDTO {
        try {
            const musicianDTO: MusicianDTO = new MusicianDTO;

            // TODO: Create message so not correct name;
            const name : Name = Name.fromJSON(json);
            if (name == null) return null;

            musicianDTO.name = name;
            musicianDTO.dateOfBirth = new Date(json.dateOfBirth);

            musicianDTO.id = json.id;

            musicianDTO.email = json.email;

            return musicianDTO;
        } catch {
            return null;
        }
    }
}