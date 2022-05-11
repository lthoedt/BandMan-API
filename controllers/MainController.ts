import express from 'express';

const router = express.Router();

const route_bands = require('./BandsController');
const route_musicians = require('./MusiciansController');

router.use("/bands", route_bands);
router.use("/musicians", route_musicians);

module.exports = router;