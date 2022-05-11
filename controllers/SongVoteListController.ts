import { SongVoteListDTO } from '../dtos/SongVoteListDTO';
import express from 'express';
import { bandExists, createSongVoteList } from '../services/SongVoteListService';
import { sendStatus } from './functions';
import { SongVoteList } from '../database/nodes/SongVoteList';

const router = express.Router();

// CreateSongVoteList
router.post('/', async (req, res) => {
    const songVoteListDto = SongVoteListDTO.fromJSON(req.body);

    const bandId : string = req.body.bandId;

    // TODO: find a away to automate this.
    if (songVoteListDto == null || bandId == undefined || bandId == null || bandId.length == 0) {
        return sendStatus(res, 412, "");
    }

    if (!(await bandExists(bandId))) {
        return sendStatus(res, 404, `Band with id "${bandId}" has not been found.`);
    }

    const songVoteList = SongVoteList.fromDTO(songVoteListDto);
    songVoteList.generateId();
    songVoteList.generateCreationDate();
    
    const status = await createSongVoteList(songVoteList, bandId);

    res.json({
        success: status,
        songVoteList: songVoteList
    })
})

module.exports = router;