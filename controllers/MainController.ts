import express from 'express';

const router = express.Router();

const route_bands = require('./BandsController');
const route_musicians = require('./MusiciansController');
const route_songvotelist = require('./SongVoteListController');
const route_songs = require('./SongsController');

router.use("/bands", route_bands);
router.use("/bands/songvotelist", route_songvotelist);
router.use("/musicians", route_musicians);
router.use("/songs", route_songs);

module.exports = router;