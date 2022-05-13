class TrackDTO {
    id: string;
    name: string;
    duration: number;
    description: string;
    genreName: string;
    thumbnail: string;

    albumId: string;
    albumName: string;

    artistId: string;
    artistName: string;

    lyricId: string;

    yt: string;

    constructor(
        id: string,
        name: string,
        duration: number,
        description: string,
        genreName: string,
        thumbnail: string,

        albumId: string,
        albumName: string,

        artistId: string,
        artistName: string,

        lyricId: string,

        yt: string
    ) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.description = description;
        this.genreName = genreName;
        this.thumbnail = thumbnail;
        this.albumId = albumId;
        this.albumName = albumName;
        this.artistId = artistId;
        this.artistName = artistName;
        this.lyricId = lyricId;
        this.yt = yt;
    }

    static fromJSON(json: any): TrackDTO {
        return new TrackDTO(
            json.idTrack,
            json.strTrack,
            json.intDuration/1000,
            json.strDescriptionEN,
            json.strGenre,
            json.strTrackThumb,
            json.idAlbum,
            json.strAlbum,
            json.idArtist,
            json.strArtist,
            json.idLyric,
            json.strMusicVid
        );
    }
}