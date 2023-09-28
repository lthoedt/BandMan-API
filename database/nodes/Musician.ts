import Node from "./Node";
import Nodes from "./Nodes";
import MusicianDTO from '../../dtos/MusicianDTO';
import { dateToString } from "../../controllers/functions";
import CreateDTO from "../../dtos/CreateDTO";
import NameEntity from "../../entities/NameEntity";
import Guid from "../../entities/Guid";
import DTO from "../../dtos/DTO";
import { toNumber } from 'neo4j-driver-core';

export default class Musician extends Node {
	type = Nodes.Musician;

	name: NameEntity;
	dateOfBirth: Date;
	email: string;

	toString(): string {
		return `
            ${this.name.toString()},
            dateOfBirth: ${dateToString(this.dateOfBirth)},
            email: "${this.email}",
            id: "${this.id}"
            `;
	}

	// @ts-ignore
	toDTO(depth : number): MusicianDTO {
        const dto : MusicianDTO = super.toDTO(new MusicianDTO(), depth);
        dto.name = this.name.toDTO();
		dto.dateOfBirth = this.dateOfBirth;
		dto.email = this.email;
		return dto;
	}

	static fromDTO(musicianDTO: MusicianDTO | CreateDTO): Musician {
		const musician = new Musician();
		musician.id = musicianDTO.id;
		musician.name =	NameEntity.fromDTO(musicianDTO.name);
		musician.dateOfBirth = musicianDTO.dateOfBirth;
		musician.email = musicianDTO.email;

		return musician;
	}

	static fromQuery(result : any): Musician {
		const musician : Musician = new Musician();
		musician.id =  new Guid(result['id']).toString();
		musician.name = NameEntity.fromQuery(result);
		musician.dateOfBirth = new Date(result['dateOfBirth']);
		musician.email = result['email'];
		return musician;
	}
}
