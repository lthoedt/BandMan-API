import { BandDTO } from '../dtos/BandDTO';
import express from 'express';
import { createBand } from '../services/BandsService';
import { Band } from '../database/nodes/Band';
import { sendStatus } from './functions';

const router = express.Router();

// getBands
router.get('/', async (req, res) => {
    res.json({ henk: true })
})

// createBand
router.post('/', async (req, res) => {
    const bandDto = BandDTO.fromJSON(req.body);
    // TODO: find a away to automate this.
    if (bandDto == null) {
        sendStatus(res, 412, "");
    }

    const band = Band.fromDTO(bandDto);
    const status = await createBand(band);

    res.json({
        success: status
    })
})

module.exports = router;