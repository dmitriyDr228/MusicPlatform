import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import {Button, Card, Grid} from "@mui/material";
import TrackList from "@/components/TrackList";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {fetchTracks} from "@/store/action-creaters/track";
import {NextThunkDispatch} from "@/store";

const AlbumPage = ({serverAlbum}: any) => {

    const router = useRouter()

    return (
        <MainLayout>
            <Grid container justifyContent='center'>
                <Card style={{
                    margin: '20px 0',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                    width: '900px',
                    borderRadius: '15px',
                    background: 'darkgrey'
                }}>
                    <Grid container justifyContent='space-between'>
                        <h1>Список треков</h1>
                        <Button
                            onClick={() => router.push('/albums/create')}
                        >Загрузить</Button>
                    </Grid>
                    <TrackList tracks={serverAlbum.tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default AlbumPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/albums/' + params?.id)
    return {
        props: {
            serverAlbum: response.data
        }
    }
}