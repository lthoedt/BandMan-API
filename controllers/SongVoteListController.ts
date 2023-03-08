import SongVoteListDTO from "../dtos/SongVoteListDTO";
import express, { Response, Request } from "express";

import {
  bandExists,
  createSongVoteList,
} from "../services/SongVoteListService";
import SongVoteList from "../database/nodes/SongVoteList";

import {
  Response as ResDecorator,
  Request as ReqDecorator,
  Params as ParamsDecorator,
  Post,
} from "@decorators/express";

// CreateSongVoteList

export default class SongVoteListController {
  // @ts-ignore
  @Post("/")
  // @
  async createSongVoteList(
    // @ts-ignore
    @ResDecorator() res: Response,
    // @ts-ignore
    @ReqDecorator() req: Request
  ) {
    const songVoteListDto = SongVoteListDTO.fromJSON(req.body);

    const bandId: string = req.body.bandId;

    // TODO: find a away to automate this.
    if (
      songVoteListDto == null ||
      bandId == undefined ||
      bandId == null ||
      bandId.length == 0
    ) {
      return res.status(412).send("");
    }

    if (!(await bandExists(bandId))) {
      return res.status(404).send(
        `Band with id "${bandId}" has not been found.`
      );
    }

    const songVoteList = SongVoteList.fromDTO(songVoteListDto);
    songVoteList.generateId();
    songVoteList.generateCreationDate();

    const status = await createSongVoteList(songVoteList, bandId);

    res.json({
      success: status,
      songVoteList: songVoteList,
    });
  }
}