import { Song } from "../database/nodes/Song";

interface SongDataApiInterface {
    key: string;
    url: string;

    search(search: string): Promise<Song[]>;
}

export default SongDataApiInterface;