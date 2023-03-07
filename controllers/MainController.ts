import express from "express";
import { attachControllers } from "@decorators/express";

const router = express.Router();

import route_bands from "./BandsController";
import route_musicians from "./MusiciansController";
import route_songvotelist from "./SongVoteListController";
import route_songs from "./SongsController";

const bands_router = express.Router();
attachControllers(bands_router, [route_bands]);
router.use("/bands", bands_router);

const songvotelist_router = express.Router();
attachControllers(songvotelist_router, [route_songvotelist]);
bands_router.use("/songvotelist", songvotelist_router);

const musicians_router = express.Router();
attachControllers(musicians_router, [route_musicians]);
router.use("/musicians", musicians_router);

const songs_router = express.Router();
attachControllers(songs_router, [route_songs]);
router.use("/songs", songs_router);

module.exports = router;