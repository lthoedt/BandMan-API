import { NodeParent } from "./NodeParent";
import { Nodes } from "./Nodes";
import { Artist } from "./Artist";
import { Genre } from "./Genre";
import { Label } from "./Label";

export class Album extends NodeParent {
    type=Nodes.Album;

    name: string;
    releaseDate: Date;
    artists: Array<Artist>;
    label: Label;
    genre: Genre;

    public constructor(name : string, releaseDate : Date, artists : Array<Artist>, label: Label, genre: Genre) {
        super();
        this.name = name;
        this.releaseDate = releaseDate;
        this.artists = artists;
        this.label = label;
        this.genre = genre;
    }

    toString() : string {
        return `
            name: "${this.name}",
            releaseDate: date("${this.releaseDate.getFullYear()}-${this.releaseDate.getMonth()}-${this.releaseDate.getDate()}"),
            id: "${this.id}"
        `;
    }

    static fromJSON(json: any): Album {
        return new Album(json.name, new Date(json.releaseDate), json.artists.map((jsonArtist: any) => Artist.fromJSON(jsonArtist)), Label.fromJSON(json.label), Genre.fromJSON(json.genre));
    }
}