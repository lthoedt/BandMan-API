import { Song } from '../../../database/nodes/Song';
import { NodeStructure } from '../../../database/nodes/NodeStructure';
import { dtoStructure } from '../dtoStructure';
import ArtistDTO from './ArtistDTO';
import AlbumDTO from './AlbumDTO';
import { SongData } from '../../../database/entities/SongData';

class TrackDTO extends dtoStructure {

    id: string;
    name: string;
    duration: number;
    
    album: AlbumDTO;

    artists: ArtistDTO[];
    

    constructor(
        id: string,
        name: string,
        album: AlbumDTO,
        artists: ArtistDTO[],
        duration: number
    ) {
        super();
        this.id = id;
        this.name = name;
        this.album = album;
        this.artists = artists;
        this.duration = duration;
    }

    static fromJSON(json: any): dtoStructure {
        return new TrackDTO(
            json.id,
            json.name,
            AlbumDTO.fromJSON(json.albumOfTrack),
            json.artists.items.map( (artistJSON: any) => ArtistDTO.fromJSON(artistJSON) ),
            json.duration.totalMilliseconds/1000
        )
    }

    toNode(): NodeStructure {
        return new Song(
            null,
            this.id,
            this.name,
            null,
            this.duration,
            this.album.albumCover,
            this.artists.map( (a: ArtistDTO) => a.toNode() ),
            this.album.toNode(),
            null,
            new SongData()
        );
    }

}

export default TrackDTO;