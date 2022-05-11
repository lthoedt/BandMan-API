export class SongVoteListDTO {

    id: string;
    creationDate: Date;
    endDate: Date;

    static fromJSON(json: any): SongVoteListDTO {
        try {
            const songVoteListDTO: SongVoteListDTO = new SongVoteListDTO;

            songVoteListDTO.creationDate = new Date(json.creationDate);
            songVoteListDTO.endDate = new Date(json.endDate);

            songVoteListDTO.id = json.id;

            return songVoteListDTO;
        } catch {
            return null;
        }
    }
}