import express from 'express';

const router = express.Router();

const route_bands = require('./BandsController');

router.use("/bands", route_bands);

module.exports = router;