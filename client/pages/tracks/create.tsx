import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import StepWrapper from "@/components/StepWrapper";
import {Button, Grid, InputLabel, SelectChangeEvent, TextField} from "@mui/material";
import FileUpload from "@/components/FileUpload";
import {useInput} from "@/hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "@/store";
import {fetchAlbums} from "@/store/action-creaters/album";
import SelectAlbums from "@/components/SelectAlbums";

const Create = () => {

    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const [album, setAlbum] = useState('')
    const router = useRouter()

    const {albums, error} = useTypedSelector(state => state.album)

    const handleChange = (event: SelectChangeEvent) => {
        setAlbum(event.target.value);
    };

     const findAlbumByTitle = (title: string): string => {
        const album = albums.filter((album) => album.title === title)[0]
        if (!album) {
            return ''
        } else {
            return String(album.id);
        }
    }

    const [activeStep, setActiveStep] = useState(0)
    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(activeStep => activeStep + 1);
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture || '')
            formData.append('audio', audio || '')
            formData.append('albumId', findAlbumByTitle(album))
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }

    const back = () => {
        setActiveStep(activeStep => activeStep - 1)
    }

    return (
        <MainLayout>
                <StepWrapper activeStep={activeStep}>
                    {activeStep === 0 &&
                        <Grid
                            style={{paddingTop: 20}}
                            container
                            direction={"column"}
                        >
                            <TextField
                                {...name}
                                style={{marginTop: 10}}
                                label='Введите название трека'
                            />
                            <TextField
                                {...artist}
                                style={{marginTop: 10}}
                                label='Введите имя автора'
                            />
                            <TextField
                                {...text}
                                style={{marginTop: 10}}
                                label='Введите текст песни'
                                multiline
                                rows={5}
                            />
                            <InputLabel id="demo-simple-select-autowidth-label">Albums</InputLabel>
                            <SelectAlbums
                                albums={albums}
                                setAlbum={setAlbum}
                                album={album}/>

                        </Grid>
                    }
                    {activeStep === 1 &&
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '25%'}}>
                            <FileUpload setFile={setPicture} accept="image/*">
                                <Button>Загрузить обложку</Button>
                            </FileUpload>
                        </div>

                    }
                    {activeStep === 2 &&
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '25%'}}>
                            <FileUpload setFile={setAudio} accept="audio/*">
                                <Button>Загрузить аудио</Button>
                            </FileUpload>
                        </div>
                    }
                </StepWrapper>
                <Grid container justifyContent="space-between">
                    <Button disabled={activeStep === 0} onClick={() => back()}>Назад</Button>
                    <Button onClick={() => next()}>Далее</Button>
                </Grid>

        </MainLayout>

    );
};

export default Create;
export const getServerSideProps = wrapper
    .getServerSideProps((store) => async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(await fetchAlbums())
        return {
            props: {},
        };
    });
