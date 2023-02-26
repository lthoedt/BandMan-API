import Relations from "./Relations";
import Rating from "../entities/Rating";

export default class VotedRelation {
    type = Relations.Voted;
    rating: Rating;
    songVoteListId: string;
    musicianId: string;

    constructor(
        rating: Rating,
        songVoteListId: string,
        musicianId: string,
    ) {
        this.rating = rating;
        this.songVoteListId = songVoteListId;
        this.musicianId = musicianId;
    }
}