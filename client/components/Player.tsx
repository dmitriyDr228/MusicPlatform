import React, {useEffect} from 'react';
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import styles from '../styles/Player.module.scss'
import IconButton from "@mui/material/IconButton";
import {Grid} from "@mui/material";
import TrackProgress from "@/components/TrackProgress";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import TrackProgressVolume from "@/components/TrackProgress";
import TrackAudioProgress from "@/components/TrackAudioProgress";

let audio: any;
const Player = () => {


    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player)
    const {playTrack, pauseTrack, setVolume, setCurrentTime, setDuration, setActive} = useActions();
    useEffect(
        () => {
            if (!audio) {
                audio = new Audio();
            } else {
                setAudio();
                play();
            }
        }, [active]
    )

    const setAudio = () => {
        if (active) {
            audio.src = 'http://localhost:5000/' + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }
    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    if (!active) {
        audio?.pause();
        return null;
    }
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {!pause
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: '14px', fontStyle: 'italic'}}>{active?.artist}</div>
            </Grid>
            <TrackAudioProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgressVolume left={volume} right={100} onChange={changeVolume}/>
        </div>
    );
};

export default Player;