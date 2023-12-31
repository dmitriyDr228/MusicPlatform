import {IAlbum} from "@/types/album";

interface IComment {
    id: number;
    text: string;
    username: string;
}

export interface ITrack {
    id: number;
    name: string;
    artist: string;
    text: string;
    listens: number;
    albumId?: number;
    album?: IAlbum;
    audio: string;
    picture: string;

    comments: IComment[]

}

export interface TrackState {
    tracks: ITrack[];
    error: string;
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR'
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS
    payload: ITrack[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR
    payload: string
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction