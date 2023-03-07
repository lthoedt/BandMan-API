import { Response, Request } from 'express';

import { StatusCodes } from "http-status-codes";
import HttpException from "../../exceptions/dtos/HttpException";
import DTO from "../DTO";


// This uses a decorator to inject the right dto.
export function ParseDTO(...dtos: typeof DTO[]) {
	return (target: any, name: string, descriptor: PropertyDescriptor) => {
		const original: Function = descriptor.value;

		if (typeof original !== "function") return descriptor;

		descriptor.value = (res: Response, req: Request) => {
			try {
                // Map each wanted dto to a dto from json.
				const parsedDTOs: Array<DTO | Error> = dtos.map((dto: typeof DTO) => dto.fromJSON(req.body));
                // Call the original function with the parsedDTOs
				original.apply(this, [res, req, ...parsedDTOs]);
			} catch (e) {
				console.log(e);
				if (!(e instanceof HttpException)) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();

				return e.send(res);
			}
		};

		return descriptor;
	};
}