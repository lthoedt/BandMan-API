export class BandDTO {

    name: string;
    originateDate: Date;
    id: string;

    static fromJSON(json: any): BandDTO {
        try {
            const bandDTO: BandDTO = new BandDTO;

            bandDTO.name = json.name;
            bandDTO.originateDate = new Date(json.originateDate);

            bandDTO.id = json.id;

            return bandDTO;
        } catch {
            return null;
        }
    }
}