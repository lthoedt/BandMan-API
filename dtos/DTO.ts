import Guid from "../entities/Guid";

export default abstract class DTO {
	id: Guid = new Guid();

	static fromJSON(json: any) : DTO | Error {
        throw new Error("Method not implemented.");
    }
}