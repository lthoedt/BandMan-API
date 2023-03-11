import DTO from "../dtos/DTO";

export default abstract class Entity {
    static fromDTO(dto: DTO): Entity {
        throw new Error("Unimplemented");
    }
}