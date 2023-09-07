import {Dispatch} from "react";
import {AlbumAction, AlbumActionTypes} from "@/types/album";
import axios from "axios";

export const fetchAlbums = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/albums')
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS,
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Произошла ошибка загрузки альбомов'
            })
        }
    }
}