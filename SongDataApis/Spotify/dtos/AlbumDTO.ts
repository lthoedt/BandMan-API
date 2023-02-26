import NodeStructure from '../../../database/nodes/NodeStructure';
import Album from '../../../database/nodes/Album';
import { dtoStructure } from '../dtoStructure';
import Image from '../../../database/nodes/Image';

class AlbumDTO extends dtoStructure {
    id: string;
    name: string;
    albumCover: Image;

    constructor(id: string, name: string, albumCover: Image) {
        super();

        this.id = id;
        this.name = name;
        this.albumCover = albumCover;
    }

    static fromJSON(json: any): AlbumDTO {
        return new AlbumDTO(
            json.id,
            json.name,
            new Image(json.coverArt.sources.sort((a: any, b: any) => {
                if (a.width < b.width) return 1;
                if (a.width > b.width) return -1;
                return 0;
            })[0].url),
        );
    }

    toNode(): Album {
        return new Album(this.id, this.name, null, [], null, null, this.albumCover)
    }
}

export default AlbumDTO;