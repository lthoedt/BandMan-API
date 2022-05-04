export class BandDTO {

    name : string;
    originateDate : Date;

    static fromJSON(json : any) : BandDTO {
        const bandDTO : BandDTO = new BandDTO;

        bandDTO.name = json.name;
        bandDTO.originateDate = new Date(json.originateDate);

        return bandDTO;
    }
}