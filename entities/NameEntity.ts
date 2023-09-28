import Entity from './Entity';
import NameDTO from '../dtos/NameDTO';
import Guid from './Guid';

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

    toDTO(): NameDTO {
        const dto : NameDTO = new NameDTO();
        dto.firstname = this.firstname;
        dto.insertion = this.insertion;
        dto.lastname = this.lastname;
        return dto;
    }
    
    static fromQuery(result: any): NameEntity {
        const nameEnitity : NameEntity = new NameEntity();
        nameEnitity.firstname = result['firstname'];
        nameEnitity.insertion = result['insertion'];
        nameEnitity.lastname = result['lastname'];
        return nameEnitity;
	}
}