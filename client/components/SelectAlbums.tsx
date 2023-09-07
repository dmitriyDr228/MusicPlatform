import React from 'react';
import {IAlbum} from "@/types/album";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface SelectAlbumsProps{
    albums:IAlbum[]
    setAlbum:Function
    album:any

}
const SelectAlbums:React.FC<SelectAlbumsProps> = ({albums, setAlbum,album}) => {
    const handleChange = (event: SelectChangeEvent) => {
        setAlbum(event.target.value);
    };
    return (
        <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={album}
            onChange={handleChange}
            autoWidth
            name='Альбомы'
            label='Альбомы'
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {albums.map(album =>
                <MenuItem key={album.id} value={album.title}>{album.title}</MenuItem>
            )}
        </Select>
    );
};

export default SelectAlbums;