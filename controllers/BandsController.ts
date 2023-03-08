import BandDTO from "../dtos/BandDTO";
import express, { Response, Request } from "express";
import {
	Response as ResDecorator,
	Request as ReqDecorator,
	Get,
	Post,
} from "@decorators/express";

import { createBand } from "../services/BandsService";
import Band from "../database/nodes/Band";
import { musicianExists } from "../services/MusiciansService";
import { ParseDTO } from "../dtos/decorators/ParseDTODecorator";

const router = express.Router();

export default class BandsController {
	// @ts-ignore
	@Get("/")

	// @ts-ignore
	// Retrieves all bands.
	getBands(@ResDecorator() res: Response) {
		res.sendStatus(404);
	}

	// @ts-ignore
	@Post("/")

	// createBand
	// @ts-ignore
	@ParseDTO(BandDTO)
	async createBand(
		// @ts-ignore
		@ResDecorator() res: Response,
		// @ts-ignore
		@ReqDecorator() req: Request,
		bandDto: BandDTO
	) {

    // TODO: Setup bearer token.
		const musicianId: string = req.body.musicianId;

		await musicianExists(musicianId);

		const band = Band.fromDTO(bandDto);
		band.generateId();

		const status = await createBand(band, musicianId);

		res.json({
			success: status,
		});
	}
}
