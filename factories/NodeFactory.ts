import Node from "../database/nodes/Node";
import Band from "../database/nodes/Band";
import Musician from "../database/nodes/Musician";
import Nodes from "../database/nodes/Nodes";
import Factory from "./Factory";
import Song from '../database/nodes/Song';

export default abstract class NodeFactory extends Factory {
	static generate(type: Nodes) : typeof Node {
		switch (type) {
			case Nodes.Band:
				return Band;
			case Nodes.Musician:
				return Musician;
			case Nodes.Song:
			case Nodes.Artist:
			case Nodes.Label:
			case Nodes.Album:
			case Nodes.Genre:
			case Nodes.SongVoteList:
			case Nodes.Image:
				throw new Error("Unimplemented");
		}
	}
}