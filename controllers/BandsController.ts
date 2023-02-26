import BandDTO from '../dtos/BandDTO';
import express from 'express';
import { createBand } from '../services/BandsService';
import { Band } from '../database/nodes/Band';
import { sendStatus } from './functions';
import { musicianExists } from '../services/MusiciansService';

const router = express.Router();

// getBands
router.get('/', async (req, res) => {
    res.json({ henk: true })
})

// createBand
router.post('/', async (req, res) => {
    const bandDto = BandDTO.fromJSON(req.body);
    const musicianId : string = req.body.musicianId;

    // TODO: find a away to automate this.
    if (bandDto == null || musicianId == undefined || musicianId == null || musicianId.length == 0) {
        return sendStatus(res, 412, "");
    }

    if (!(await musicianExists(musicianId))) {
        return sendStatus(res, 404, `Musician with id "${musicianId}" has not been found.`);
    }

    const band = Band.fromDTO(bandDto);
    band.generateId();
    
    const status = await createBand(band, musicianId);

    res.json({
        success: status
    })
})

module.exports = router;