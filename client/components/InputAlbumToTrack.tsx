import React, {useState} from 'react';
import {InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {IAlbum} from "@/types/album";
import {ITrack} from "@/types/track";

interface InputAlbumToTrackProps {
    albums: IAlbum[];
    track: ITrack;
}

const InputAlbumToTrack: React.FC<InputAlbumToTrackProps> = ({track, albums}) => {

    const [album, setAlbum] = useState('')
    const handleChange = (event: SelectChangeEvent) => {
        setAlbum(event.target.value);
    };

    const findAlbumByTitle = (title: string): IAlbum | undefined => {
        return albums.find((album) => album.title === title)
    }

    return (
        <div>
            <InputLabel id="demo-simple-select-autowidth-label">Albums</InputLabel>
            <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={album}
                onChange={handleChange}
                autoWidth
                label="Album"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {albums.map(album =>
                    <MenuItem key={album.id} value={album.id}>{album.title}</MenuItem>
                )}
            </Select>

        </div>
    );
};

export default InputAlbumToTrack;