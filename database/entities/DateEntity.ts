export class DateEntity {
    date: Date;

    constructor(date: Date) {
        this.date = date;
    }

    toString(): string {
        return `date("${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}")`;
    }

    static fromJSON(json: any): DateEntity {
        return new DateEntity(new Date(json));
    }
}