import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {Button, Card, Grid} from "@mui/material";
import AlbumList from "@/components/AlbumList";
import {NextThunkDispatch, wrapper} from "@/store";
import {fetchTracks} from "@/store/action-creaters/track";
import {fetchAlbums} from "@/store/action-creaters/album";
import {useRouter} from "next/router";

const Index = () => {

    const router = useRouter()


    const {albums, error} = useTypedSelector(state => state.album)


    console.log(albums)
    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }


    return (
        <MainLayout>

                <Grid ml={3} container justifyContent='space-between'>
                    <h1>Альбомы</h1>
                    <Button
                        onClick={() => router.push('/albums/create')}
                    >Загрузить</Button>
                </Grid>

                <Grid container mt={5} justifyContent='center'>
                    <AlbumList albums={albums}/>
                </Grid>

        </MainLayout>
    );
};

export default Index;
export const getServerSideProps = wrapper
    .getServerSideProps((store) => async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(await fetchAlbums())
        await dispatch(await fetchTracks())
        return {
            props: {},
        };
    });