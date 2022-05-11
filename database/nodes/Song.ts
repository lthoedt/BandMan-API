import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";
import { Image } from "../entities/Image";
import { SongData } from "../entities/SongData";
import { Artist } from "./Artist";
import { Album } from "./Album";
import {SongDTO} from "../../dtos/SongDTO";

export class Song extends NodeParent {
    type=Nodes.Song;

    id: string;
    title: string;
    year: number;
    duration: number;
    thumbnail: Image;
    artists: Array<Artist>;
    album: Album;
    urls: {
        spotify: string;
        ytMusic: string;
    };
    songData: SongData;
    
    public constructor(
        id: string,
        title: string,
        year: number,
        duration: number,
        thumbnail: Image,
        artists: Array<Artist>,
        album: Album,
        urls: {
            spotify: string;
            ytMusic: string;
        },
        songData: SongData
    ) {
        super();
        this.id;
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
            id: "${this.id}"
        `;
    }

    static fromDTO(songDTO : SongDTO) : Song {
        return new Song(songDTO.id, songDTO.title, songDTO.year, songDTO.duration, songDTO.thumbnail, songDTO.artists, songDTO.album, songDTO.urls, songDTO.songData);
    }
}