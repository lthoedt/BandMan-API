import { Response } from "express";
import HttpException from "./HttpException";
import { StatusCodes } from "http-status-codes";
import { FieldError } from "../../dtos/decorators/FieldDecorator";

export default class WrongAuthenticationException extends HttpException {
	status = StatusCodes.UNAUTHORIZED;
}
