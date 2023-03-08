import express, { Response, Request } from "express";
import {
  Response as ResDecorator,
  Request as ReqDecorator,
  Get,
  Post,
} from "@decorators/express";

import Song from "../database/nodes/Song";
import { createSongIfNotExist, searchSong } from "../services/SongsService";

export default class SongsController {
  // @ts-ignore
  @Get("/search")
  async searchSong(
    // @ts-ignore
    @ResDecorator() res: Response,
    // @ts-ignore
    @ReqDecorator() req: Request
  ) {
    const search: string = <string>req.query.q;

    const songs: Array<Song> = await searchSong(
      search,
      parseInt(<string>req.query.resultType, 10)
    );

    if (songs == null) return res.status(500).send("");

    res.json(songs);

    songs.forEach(async (song: Song) => await createSongIfNotExist(song));
  }
}
