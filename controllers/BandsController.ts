import {BandDTO} from '../dtos/BandDTO';
import express from 'express';
import { createBand } from '../services/BandsService';
import { Band } from '../database/nodes/Band';

const router = express.Router();

// getBands
router.get('/', async (req, res) => {
    res.json({henk: true})
})

// createBand
router.post('/', async (req, res) => {
    const bandDto = BandDTO.fromJSON(req.body);
    const band = Band.fromDTO(bandDto);
    const status = await createBand(band);
    
    res.json({
        success: status
    })
})

module.exports = router;