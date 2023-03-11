import Entity from './Entity';
import NameDTO from '../dtos/NameDTO';

export default class NameEntity extends Entity {
    firstname: string = "";
    insertion: string = "";
    lastname: string = "";

    toString(): string {
        return `firstname: "${this.firstname}", insertion: "${this.insertion}", lastname: "${this.lastname}"`
    }

    static fromDTO(dto: NameDTO): NameEntity {
        const name : NameEntity = new NameEntity();

        name.firstname = dto.firstname;
        name.insertion = dto.insertion;
        name.lastname = dto.lastname;

        return name;
    }
}