import axios from "axios";

import { Song } from "../../database/nodes/Song";
import SongDataApiInterface from "../songDataApiInterface";

class TheMusicDB implements SongDataApiInterface {
    key = "test";
    url = `https://theaudiodb.com/api/v1/json/${this.key}`;

    async search(search: string): Promise<Song[]> {
        // const response = await axios.request({
        //     method: 'GET',
        //     url: `${this.url}/searchtrack.php`,
        //     params: {s: artist, t: track},
        //     headers: {

        //     }
        // })

        return null;
    }
}

export default TheMusicDB;