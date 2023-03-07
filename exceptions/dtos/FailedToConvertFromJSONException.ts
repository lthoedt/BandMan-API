import { Response } from "express";
import HttpException from "./HttpException";
import { StatusCodes } from "http-status-codes";
import { FieldError } from '../../dtos/DTO';

export default class FailedToConvertFromJSONException extends HttpException {
	status = StatusCodes.PRECONDITION_FAILED;

	private fields: FieldError[];

	constructor(fields: FieldError[]) {
		super();

		this.fields = fields;
	}

	public send(res: Response) {
		const jsonFields = [];

		for (const field of this.fields) {
			jsonFields[field.field] = field.errors;
		}
        
		res.status(this.status).json({...jsonFields});
	}
}
