import { NodeStructure } from "./NodeStructure";
import { Nodes } from "./Nodes";
import { Artist } from "./Artist";
import { Genre } from "./Genre";
import { Label } from "./Label";
import { dateToString } from "../../controllers/functions";
import { Image } from "./Image";

export class Album extends NodeStructure {
    type=Nodes.Album;

    spotifyApiId: string;
    name: string;
    releaseDate: Date;
    cover: Image;
    artists: Array<Artist>;
    label: Label;
    genre: Genre;

    public constructor(spotifyApiId: string, name : string, releaseDate : Date, artists : Array<Artist>, label: Label, genre: Genre, cover: Image) {
        super();
        this.spotifyApiId = spotifyApiId;
        this.name = name;
        this.releaseDate = releaseDate;
        this.artists = artists;
        this.label = label;
        this.genre = genre;
        this.cover = cover;
    }

    toString() : string {
        return `
            spotifyApiId: "${this.spotifyApiId}",
            name: "${this.name}",
            releaseDate: ${dateToString(this.releaseDate)},
            id: "${this.id}"
        `;
    }

    static fromJSON(json: any): Album {
        return new Album(json.spotifyApiId, json.name, new Date(json.releaseDate), json.artists.map((jsonArtist: any) => Artist.fromJSON(jsonArtist)), Label.fromJSON(json.label), Genre.fromJSON(json.genre), Image.fromJSON(json.cover));
    }

    static fromTheAudioDB(json: any): Album {
        return new Album(json.idAlbum, json.strAlbum, null, null, null, null, null);
    }
}