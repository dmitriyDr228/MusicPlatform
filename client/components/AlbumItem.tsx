import React from 'react';
import {IAlbum} from "@/types/album";
import {Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import axios from "axios";
import {useRouter} from "next/router";

interface AlbumItemProps {

    album: IAlbum;

}

const AlbumItem: React.FC<AlbumItemProps> = ({album}) => {

    const router = useRouter()
    const deleteAlbum = async (id: number) => {
        await axios.delete('http://localhost:5000/albums/' + id)
        console.log('Альбом успешно удален')
        await router.push('/albums')
    }


    return (
        <Grid p={3}
              onClick={() => router.push('/albums/' + album.id)}
              style={{ border: '1px solid grey', borderRadius: 20, backgroundColor:'lightgrey'}} display={'flex'}
              direction={'column'} alignItems={'center'} item xs={4}>

            <img src={'http://localhost:5000/' + album.picture} width={200} height={200}/>
            <h2>{album.title}</h2>
            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                Artist-  <p style={{fontStyle:'italic',marginLeft:5 }}> {album.artist}</p>
                <IconButton onClick={(e) => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                    <Delete onClick={() => deleteAlbum(album.id)}/>
                </IconButton>
            </Grid>

        </Grid>
    );
};

export default AlbumItem;