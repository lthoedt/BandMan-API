import express from 'express';

const router = express.Router();

const route_bands = require('./BandsController');
const route_musicians = require('./MusiciansController');
const route_songvotelist = require('./SongVoteListController');

router.use("/bands", route_bands);
router.use("/bands/songvotelist", route_songvotelist);
router.use("/musicians", route_musicians);

module.exports = router;