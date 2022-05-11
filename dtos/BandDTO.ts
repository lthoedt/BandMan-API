import { DateEntity } from "../database/entities/DateEntity";

export class BandDTO {

    name: string;
    originateDate: DateEntity;
    id: string;

    static fromJSON(json: any): BandDTO {
        try {
            const bandDTO: BandDTO = new BandDTO;

            bandDTO.name = json.name;
            bandDTO.originateDate = new DateEntity(json.originateDate);

            bandDTO.id = json.id;

            return bandDTO;
        } catch {
            return null;
        }
    }
}