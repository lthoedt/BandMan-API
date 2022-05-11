export class SongData {
    key: number;
    bpm: number;

    toString(): string {
        return `
            key: "${this.key}",
            bpm: "${this.bpm}"
        `;
    }
}