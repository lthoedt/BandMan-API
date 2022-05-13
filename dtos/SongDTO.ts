import { Image } from "../database/nodes/Image";
import { SongData } from "../database/entities/SongData";
import { Artist } from "../database/nodes/Artist";
import { Album } from "../database/nodes/Album";

export class SongDTO {

    id: string;
    spotifyApiId: string;

    title: string;
    year: number;
    duration: number;
    thumbnail: Image;
    artists: Array<Artist>;
    album: Album;
    urls: {
        spotify: string;
        ytMusic: string;
        yt: string;
    };
    songData: SongData;

    static fromJSON(json: any): SongDTO {
        try {
            const songDTO: SongDTO = new SongDTO;
            
            songDTO.id = json.id;
            songDTO.spotifyApiId = json.spotifyApiId;
            songDTO.title = json.title;
            songDTO.year = json.year;
            songDTO.duration = json.duration;
            songDTO.thumbnail = Image.fromJSON(json.thumbnail);
            songDTO.artists = json.artists.map((jsonArtist: any) => Artist.fromJSON(jsonArtist));
            songDTO.album = Album.fromJSON(json.album);
            songDTO.title = json.title;

            return songDTO;
        } catch {
            return null;
        }
    }
}