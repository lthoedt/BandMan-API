import { dateToString } from "../../controllers/functions";
import Relations from "../relations/Relations";
import Image from "./Image";
import Nodes from "./Nodes";
import NodeStructure from "./NodeStructure";

export default class Artist extends NodeStructure {
    type = Nodes.Artist;

    name: string;
    dateOfBirth: Date;
    thumbnail: Image;
    spotifyApiId: string;

    public constructor(id: string, name: string, dateOfBirth: Date, thumbnail: Image, spotifyApiId: string) {
        super();
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.thumbnail = thumbnail;
        this.spotifyApiId = spotifyApiId;
    }

    toString(): string {
        return `
            name: "${this.name}",
            dateOfBirth: ${dateToString(this.dateOfBirth)},
            spotifyApiId: "${this.spotifyApiId}",
            id: "${this.id}"
        `;
    }

    static fromJSON(json: any): Artist {
        return new Artist(json.id, json.name, new Date(json.dateOfBirth), Image.fromJSON(json.thumbnail), json.spotifyApiId);
    }

    static getArtistsRelationQuery(artists: Artist[]): string {
        const artistIds: string[] = []
        const artistAPIIds: string[] = []
        const artistNames: string[] = []
        artists.forEach((artist: Artist) => {
            if (!artist.id && !artist.spotifyApiId) return;
            if (artist.id) artistIds.push(`"${artist.id}"`);
            if (artist.spotifyApiId) artistAPIIds.push(`"${artist.spotifyApiId}"`);
            if (artist.name) artistNames.push(`"${artist.name}"`);
        })

        return `
            MATCH (artist:${Nodes.Artist})
            WHERE artist.id IN [${artistIds}]
            OR artist.spotifyApiId IN [${artistAPIIds}] 
            OR artist.name IN [${artistNames}] 
        `;
    }

    static fromTheAudioDB(json: any): Artist {
        return new Artist(null, json.strArtist, null, null, json.idArtist);
    }
}