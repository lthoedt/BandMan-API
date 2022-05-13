import { NodeStructure } from '../../database/nodes/NodeStructure';

export abstract class dtoStructure {
    static fromJSON(json: any): dtoStructure {return null};
    abstract toNode(): NodeStructure;
}