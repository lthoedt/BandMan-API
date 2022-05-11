export class Image {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    toString(): string {
        return `url: "${this.url}";`
    }

    static fromJSON(json : any) {
        return new Image(json.url);
    }
}