import { createId } from "../../services/jsFunctions";
import { Nodes } from "./Nodes";

export abstract class NodeStructure {
    id : string;
    type: Nodes;
    abstract toString() : string;
    
    public generateId(): string {
        this.id = createId();
        return this.id;
    }
}