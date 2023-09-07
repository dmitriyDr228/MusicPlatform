import {Track} from "../../track/entities/track";

export class AlbumCreateDto {
    readonly artist: string;
    readonly title: string;

    readonly tracks?: Track[];
}