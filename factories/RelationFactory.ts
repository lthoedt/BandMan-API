import CreatorRelation from "../database/relations/CreatorRelation";
import MemberRelation from "../database/relations/MemberRelation";
import Relation from "../database/relations/Relation";
import Relations from "../database/relations/Relations";
import Factory from "./Factory";

export default abstract class RelationFactory extends Factory {
	static generate(type: Relations): Relation {
		switch (type) {
			case Relations.Creator:
				return new CreatorRelation();
			case Relations.Member:
				return new MemberRelation();
			case Relations.VotingSong:
			case Relations.Voted:
			case Relations.VotingList:
			case Relations.Cover:
			case Relations.Player:
			case Relations.Label:
			case Relations.Genre:
			case Relations.Thumbnail:
			case Relations.Album:
				throw new Error("Unimplemented");
		}
	}
}

