import express from 'express';
import { Song } from '../database/nodes/Song';
import { searchSong } from '../services/SongsService';
import { sendStatus } from './functions';

const router = express.Router();

router.get('/search', async (req, res) => {
    const search: any = req.query.q;
    
    const songs: Array<Song> = await searchSong(search);

    if (songs == null) return sendStatus(res, 500, "");
    
    res.json(songs);
})

module.exports = router;