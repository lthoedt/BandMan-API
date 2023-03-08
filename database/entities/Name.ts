import DTO from '../../dtos/DTO';
import Entity from './Entity';
import NameDTO from '../../dtos/NameDTO';

export default class Name extends Entity {
    firstname: string = "";
    insertion: string = "";
    lastname: string = "";

    toString(): string {
        return `firstname: "${this.firstname}", insertion: "${this.insertion}", lastname: "${this.lastname}"`
    }

    static fromDTO(dto: NameDTO): Name {
        const name : Name = new Name();

        name.firstname = dto.firstname;
        name.insertion = dto.insertion;
        name.lastname = dto.lastname;

        return name;
    }
}