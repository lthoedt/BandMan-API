import express from 'express';
import { createMusician } from '../services/MusiciansService';
import { Musician } from '../database/nodes/Musician';
import { MusicianDTO } from '../dtos/MusicianDTO';
import { sendStatus } from './functions';

const router = express.Router();

router.post('/', async (req, res) => {
    const musicianDto = MusicianDTO.fromJSON(req.body);
    if (musicianDto == null) {
        sendStatus(res, 412, "");
    }

    const musician = Musician.fromDTO(musicianDto);
    musician.generateId();

    const status = await createMusician(musician);

    res.json({
        success: status,
        musician: musician.toString()
    })
})

module.exports = router;