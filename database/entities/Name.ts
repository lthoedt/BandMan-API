export default class Name {
    firstname: string = "";
    insertion: string = "";
    lastname: string = "";

    constructor(firstname: string, insertion: string, lastname: string) {
        this.firstname = firstname;
        this.insertion = insertion;
        this.lastname = lastname;
    }

    toString(): string {
        return `firstname: "${this.firstname}", insertion: "${this.insertion}", lastname: "${this.lastname}"`
    }

    static fromJSON(json: any): Name {
        try { return new Name(json.firstname, json.insertion, json.lastname) } catch { return null };
    }
}