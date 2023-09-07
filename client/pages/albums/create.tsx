import React, {useState} from 'react';
import {useInput} from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import {Button, ButtonGroup, Grid, TextField} from "@mui/material";
import FileUpload from "@/components/FileUpload";
import {useRouter} from "next/router";
import axios from "axios";

const Create = () => {

    const title = useInput('')
    const artist = useInput('')
    const [picture, setPicture] = useState(null)

    const router = useRouter()

    const addAlbumToDB = async () => {
        const formData = new FormData()
        formData.append("title", title.value)
        formData.append('artist', artist.value)
        formData.append('picture', picture || '')
        await axios.post('http://localhost:5000/albums', formData)
            .then(resp => router.push('/albums'))
            .catch(e => console.log(e))
    }

    return (
        <MainLayout>

            <Grid
                style={{paddingTop: 20}}
                ml={10}
                mt={'30%'}
                width={'80%'}
                container
                direction={"column"}
            >
                <TextField
                    {...title}
                    style={{marginTop: 10}}
                    label='Введите название альбома'
                />
                <TextField
                    {...artist}
                    style={{marginTop: 10}}
                    label='Введите  артиста'
                />
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 15}}>
                    <FileUpload setFile={setPicture} accept="image/*">
                        <Button>Загрузить обложку</Button>
                    </FileUpload>
                </div>
                <ButtonGroup style={{justifyContent: 'space-between', marginTop: 15}}>
                    <Button onClick={() => {
                        router.push('/albums')
                    }}>Отменить</Button>
                    <Button
                        onClick={()=>{
                            addAlbumToDB()}
                        }
                    >Сохарнить</Button>
                </ButtonGroup>
            </Grid>
        </MainLayout>
    );
};

export default Create;