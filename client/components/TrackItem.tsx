import React, {useState} from 'react';
import {ITrack} from "@/types/track";
import styles from '../styles/TrackItem.module.scss'
import {Pause, PlayArrow} from "@mui/icons-material";
import {Card, Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/router";
import {useActions} from "@/hooks/useActions";
import axios from "axios";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import OptionMenu from "@/components/OptionMenu";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}


const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {

    const router = useRouter();
    const {playTrack, pauseTrack, setActive} = useActions();
    const [album, setAlbum] = useState('')
    const play = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActive(track);
        playTrack();
    }

    const {albums, error} = useTypedSelector(state => state.album)


    const findAlbumByTitle = (title: string) => {
        const album = albums.filter((album) => album.title === title)[0]
        if (!album) {
            return undefined
        } else {
            return album.id;
        }
    }
    const addAlbumToTrack = async (id: number) => {
        await axios.put('http://localhost:5000/tracks/' + id, {albumId: findAlbumByTitle(album)})
            .then(() => {
                console.log(findAlbumByTitle(album))
                router.push('/albums')
            })
            .catch(e => console.log(e))
    }

    const deleteTrack = async (id: number) => {
        await axios.delete('http://localhost:5000/tracks/' + id)
            .then(() => {
                console.log('Трек успешно удален')
                router.push('/tracks')
            })
            .catch(e => console.log(e))

    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };
    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(null);
    };


    return (

        <Card className={styles.track} onClick={() => router.push('/tracks/' + track.id)}>
            <IconButton onClick={(e) => play(e)} style={{marginRight: '5px'}}>
                {active
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <img width={80} height={80} src={'http://localhost:5000/' + track.picture}/>

            <Grid container direction="column" ml={2}>
                <div>{track.name}</div>
                <div style={{fontSize: '14px', fontStyle: 'italic'}}>{track.artist}</div>
                {track.album && <div style={{fontSize: '12px', fontStyle: 'italic', color:'bisque'}}>Album: {track.album.title}</div>}
            </Grid>

            {active && <div>2.42/12.2</div>}
            <OptionMenu albums={albums} setAlbum={setAlbum} selectedAlbum={album} deleteTrack={deleteTrack}
                        addTrack={addAlbumToTrack} album={track.album} track={track}/>
        </Card>
    );
};

export default TrackItem;