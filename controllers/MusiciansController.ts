import express from 'express';
import { createMusician, musicianExists } from '../services/MusiciansService';
import { Musician } from '../database/nodes/Musician';
import { MusicianDTO } from '../dtos/MusicianDTO';
import { sendStatus } from './functions';

const router = express.Router();

router.post('/', async (req, res) => {
    const musicianDto = MusicianDTO.fromJSON(req.body);
    if (musicianDto == null) {
        return sendStatus(res, 412, "");
    }

    if (musicianDto.email == undefined || musicianDto.email.length == 0) {
        return sendStatus(res, 409, "Email is missing.");
    }

    const musician = Musician.fromDTO(musicianDto);

    if (await (musicianExists(musician.email, true))) {
       return sendStatus(res, 409, "This email already exists.");
    }

    musician.generateId();

    const status = await createMusician(musician);

    res.json({
        success: status,
        musician: musician.toString()
    })
})

module.exports = router;