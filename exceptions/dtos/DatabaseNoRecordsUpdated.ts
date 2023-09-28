import HttpException from "./HttpException";
import { StatusCodes } from "http-status-codes";

export default class DatabaseNoRecordsUpdated extends HttpException {
	status = StatusCodes.INTERNAL_SERVER_ERROR;
}
