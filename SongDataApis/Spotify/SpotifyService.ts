import axios from "axios";

import { Song } from "../../database/nodes/Song";
import SongDataApiInterface from "../songDataApiInterface";

import TrackDTO from "./dtos/TrackDTO";

class Spotify implements SongDataApiInterface {
    key = `33d08362eamsh12fa523edf1313bp176bbfjsnf37d9a1e877f`;
    url = `https://spotify23.p.rapidapi.com`;

    async search(search: string): Promise<Song[]> {
        const response = await axios.request({
            method: 'GET',
            url: `${this.url}/search/`,
            params: {
                q: search,
                type: 'tracks',
                limit: '2'
            },
            headers: {
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
                'X-RapidAPI-Key': this.key
            }
        });

        return response.data.tracks.items.map((songJSON: any) => TrackDTO.fromJSON(songJSON.data).toNode());
    }
}

export default Spotify;