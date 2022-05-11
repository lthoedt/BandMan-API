import express from 'express';
import { Song } from '../database/nodes/Song';
import { searchSong } from '../services/SongsService';

const router = express.Router();

router.get('/search', async (req, res) => {
    const search: any = req.query.q;
    
    const songs: Array<Song> = await searchSong(search);

    res.json(songs);
})

module.exports = router;