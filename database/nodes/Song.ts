import NodeStructure from "./NodeStructure";
import Nodes from "./Nodes";
import Image from "./Image";
import SongData from "../entities/SongData";
import Artist from "./Artist";
import Album from "./Album";
import SongDTO from "../../dtos/SongDTO";

export default class Song extends NodeStructure {
    type=Nodes.Song;

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
    
    public constructor(
        id: string,
        spotifyApiId: string,
        title: string,
        year: number,
        duration: number,
        thumbnail: Image,
        artists: Array<Artist>,
        album: Album,
        urls: {
            spotify: string;
            ytMusic: string;
            yt: string;
        },
        songData: SongData
    ) {
        super();
        this.id = id;
        this.spotifyApiId = spotifyApiId;
        this.title = title;
        this.year = year;
        this.duration = duration;
        this.thumbnail = thumbnail;
        this.artists = artists;
        this.album = album;
        this.urls = urls;
        this.songData = songData;
    }

    toString() : string {
        return `
            title: "${this.title}",
            year: "${this.year}",
            duration: "${this.duration}",
            urls: "${this.urls}",
            ${this.songData.toString()},
            spotifyApiId: "${this.spotifyApiId}",
            id: "${this.id}"
        `;
    }

    static fromDTO(songDTO : SongDTO) : Song {
        return new Song(songDTO.id, songDTO.spotifyApiId, songDTO.title, songDTO.year, songDTO.duration, songDTO.thumbnail, songDTO.artists, songDTO.album, songDTO.urls, songDTO.songData);
    }

    static fromQuery(result: any): Song {
        const songDto = SongDTO.fromJSON(result);
        return Song.fromDTO(songDto);
    }

    static fromTheAudioDB(json: any): Song {
        return  new Song(null, json.idTrack, json.strTrack, null, json.intDuration/1000, new Image(json.strTrackThumb), [Artist.fromTheAudioDB(json)], Album.fromTheAudioDB(json), {spotify: null, ytMusic: null, yt: json.strMusicVid}, null);
    }
}