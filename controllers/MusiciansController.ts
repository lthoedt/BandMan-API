import express from 'express';
import { createMusician, musicianExists, loginMusician } from '../services/MusiciansService';
import { Musician } from '../database/nodes/Musician';
import { MusicianDTO } from '../dtos/MusicianDTO';
import { sendStatus } from './functions';
import { LoginDTO } from '../dtos/LoginDTO';
import { Login } from '../database/entities/Login';

const router = express.Router();

router.post('/', async (req, res) => {
    const musicianDto = MusicianDTO.fromJSON(req.body);
    if (musicianDto == null) {
        return sendStatus(res, 412, "");
    }

    const password : string = req.body.password;

    if (password == undefined || password.length == 0) {
        return sendStatus(res, 409, "Password is missing.");
    }

    if (musicianDto.email == undefined || musicianDto.email.length == 0) {
        return sendStatus(res, 409, "Email is missing.");
    }

    const musician = Musician.fromDTO(musicianDto);

    if (await (musicianExists(musician.email, true))) {
       return sendStatus(res, 409, "This email already exists.");
    }
    
    musician.generateId();

    const status = await createMusician(musician, password);

    res.json({
        success: status,
        musician: musician.toString()
    })
})

router.get('/login', async (req, res) => {
    const loginDTO = LoginDTO.fromJSON(req.body);

    if (loginDTO == null) {
        return sendStatus(res, 412, "");
    }

    const login : Login = Login.fromDTO(loginDTO);

    const musician : Musician = await loginMusician(login);

    res.json({
        success: musician != null,
        musician: musician
    })
}) 

module.exports = router;