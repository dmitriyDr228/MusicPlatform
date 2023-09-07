import {ITrack} from "@/types/track";
import {useMemo} from "react";
import {IAlbum} from "@/types/album";


export const useFilter = (tracks: ITrack[], query: string) => {

    const filteredTracks = useMemo(
        () => {
            return tracks.filter(track => track.name.toLowerCase().includes(query.toLowerCase()))
        }, [query]
    )
    return filteredTracks;

}

export const useFilterAlbums = (albums: IAlbum[], artist: string) => {
    const filteredAlbums = useMemo(
        () => {
            return albums.filter(album => album.artist.toLowerCase().includes(artist.toLowerCase()))
        }, [artist]
    )
    return filteredAlbums;
}