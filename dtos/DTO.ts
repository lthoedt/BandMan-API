export default abstract class DTO {
	static fromJSON(json: any) : DTO | Error {
        throw new Error("Method not implemented.");
    }
}