import express from 'express';
import { Song } from '../database/nodes/Song';
import { createSongIfNotExist, searchSong } from '../services/SongsService';
import { sendStatus } from './functions';

const router = express.Router();

router.get('/search', async (req, res) => {
    const search: string = <string> req.query.q;
    
    const songs: Array<Song> = await searchSong(search, parseInt(<string> req.query.resultType, 10));

    if (songs == null) return sendStatus(res, 500, "");
    
    res.json(songs);

    songs.forEach(async (song: Song) => await createSongIfNotExist(song));
})

module.exports = router;