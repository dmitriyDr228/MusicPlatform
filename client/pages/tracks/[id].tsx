import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import {Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "@/hooks/useInput";
import {ITrack} from "@/types/track";


const TrackPage = ({serverTrack}: any) => {

    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter();

    const username = useInput('')
    const comment = useInput('')
    const addComment = async () => {
        try {
            const response = await axios
                .post('http://localhost:5000/tracks/comment', {
                    username: username.value,
                    text: comment.value,
                    trackId: track.id
                })
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e)
        }

    }

    console.log(track.album)


    return (
        <MainLayout>
            <Button
                variant={'outlined'}
                style={{fontSize: 32}}
                onClick={() => router.push('/tracks')}>
                К списку
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={250} height={250}/>
                <div style={{marginLeft: '20px'}}>
                    <h1>Название трека- {track.name}</h1>
                    <h1 style={{fontStyle: 'italic'}}>Исполнитель - {track.artist}</h1>
                    <h1>Количество прослушиваний: {track.listens}</h1>
                </div>
            </Grid>
            <h1>Слова в треке</h1>
            <p>{track.text}</p>
            <Grid container>
                <TextField
                    {...username}
                    label='Ваше имя'
                    fullWidth
                />
                <TextField
                    {...comment}
                    style={{marginTop: 10}}
                    label='Комментарий'
                    fullWidth
                    multiline
                    rows={4}
                />

                <Button
                    onClick={addComment}
                    style={{marginTop: 10}}
                    variant={'outlined'}>Отправить</Button>
            </Grid>
            <div>
                {track.comments.map((comment: any) =>
                    <div key={comment.id}>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}

            </div>

        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params?.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}