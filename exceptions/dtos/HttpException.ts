import { Response } from "express";
import { StatusCodes } from "http-status-codes"

export default abstract class HttpException extends Error {
    abstract status : StatusCodes

    public send(res : Response) {
        res.status(this.status).send(this.message);
    }
}