import { NodeStructure } from '../../../database/nodes/NodeStructure';
import { Artist } from '../../../database/nodes/Artist';
import { dtoStructure } from '../dtoStructure';

class ArtistDTO extends dtoStructure {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        super();

        this.id = id;
        this.name = name;
    }

    static fromJSON(json: any): ArtistDTO {
        return new ArtistDTO(json.id, json.profile.name);
    }

    toNode(): Artist {
        return new Artist(null, this.name, null, null, this.id);
    }
}

export default ArtistDTO;