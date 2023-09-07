import React, {useEffect} from 'react';
import MainLayout from "@/layouts/MainLayout";
import {Button, Card, Grid} from "@mui/material";
import {useRouter} from "next/router";
import TrackList from "@/components/TrackList";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "@/store";
import {fetchTracks} from "@/store/action-creaters/track";
import {Discount} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {fetchAlbums} from "@/store/action-creaters/album";

const Index = () => {

    const router = useRouter()

    const {tracks, error} = useTypedSelector(state => state.track)


    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

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
                            onClick={() => router.push('/tracks/create')}
                        >Загрузить</Button>
                    </Grid>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;
export const getServerSideProps = wrapper
    .getServerSideProps((store) => async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(await fetchTracks())
        await dispatch(await fetchAlbums())
        return {
            props: {},
        };
    });