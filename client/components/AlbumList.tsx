import React from 'react';
import {IAlbum} from "@/types/album";
import {Grid, TextField} from "@mui/material";
import AlbumItem from "@/components/AlbumItem";
import {useInput} from "@/hooks/useInput";
import {useFilterAlbums} from "@/hooks/useFilters";

interface AlbumListProps {
    albums: IAlbum[];
}

const AlbumList: React.FC<AlbumListProps> = ({albums}) => {

    const artist = useInput('')

    const filteredAlbums = useFilterAlbums(albums, artist.value)


    return (
        <Grid ml={3} container rowSpacing={5} justifyContent='center'>

            <TextField
                {...artist}
                label='Введите артиста, чей альбом хотите найти'
                style={{marginBottom: 20, width: '100%', background: "lightgrey"}}
            />

            <Grid mt={2} container justifyContent={'space-evenly'} rowSpacing={5}>
                {filteredAlbums.map(album =>
                    <AlbumItem
                        key={album.id}
                        album={album}/>
                )}
            </Grid>
        </Grid>
    );
};

export default AlbumList;