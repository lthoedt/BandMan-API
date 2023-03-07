import express, { Response, Request } from "express";
import {
	createMusician,
	musicianExists,
	loginMusician,
} from "../services/MusiciansService";
import Musician from "../database/nodes/Musician";
import MusicianDTO from "../dtos/MusicianDTO";
import { sendStatus } from "./functions";
import LoginDTO from "../dtos/LoginDTO";
import Login from "../database/entities/Login";
import { ParseDTO } from "../dtos/decorators/ParseDTODecorator";
import CreateDTO from '../dtos/CreateDTO';
import {
	Response as ResDecorator,
	Request as ReqDecorator,
	Params as ParamsDecorator,
	Post,
} from "@decorators/express";
import { StatusCodes } from "http-status-codes";

export default class MusiciansController {
	// @ts-ignore
	@Post("/")

	// @ts-ignore
	@ParseDTO(CreateDTO)
	async createMusician(
		// @ts-ignore
		@ResDecorator() res: Response,
		// @ts-ignore
		@ReqDecorator() req: Request,
		createDTO: CreateDTO,
	) {
		const musician = Musician.fromDTO(createDTO);

		if (await musicianExists(musician.email, true)) {
			return sendStatus(res, 409, "This email already exists.");
		}

		musician.generateId();

		const status = await createMusician(musician, createDTO.password);

		res.json({
			success: status,
			musician: musician,
		});
	}

	// @ts-ignore
	@Post("/login")

	// @ts-ignore
	@ParseDTO(LoginDTO)
	async loginMusician(
		// @ts-ignore
		@ResDecorator() res: Response,
		// @ts-ignore
		@ReqDecorator() req: Request,
		loginDTO: LoginDTO,
	) {

		const login: Login = Login.fromDTO(loginDTO);

		// TODO: create not found exceptions.
		const musician: Musician = await loginMusician(login);

		res.json({
			musician: musician,
		});
	}
}