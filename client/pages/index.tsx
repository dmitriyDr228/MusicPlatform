import MainLayout from "@/layouts/MainLayout";
import {Button, ButtonGroup, Grid} from "@mui/material";
import {useRouter} from "next/router";
import React from "react";

const Index = () => {


    const MY_IMAGE = 'https://sun9-12.userapi.com/impg/Aaa0AiuvRO78vfV5Fn1_d2WL7B-_WP_1669X_g/zESdDHvmlT0.jpg?size=1009x1280&quality=95&sign=6ea4ee9432ffaa9487d983946067d49f&type=album'
    const DI_IMAGE = 'https://sun9-66.userapi.com/impf/Eo936UnOZ8_fhJ1O7BLxZHm2gyCNGUWtP4_XoA/v7XkPdETRqM.jpg?size=1639x1737&quality=96&sign=5757b83b641654a97b3427dc63a14dba&type=album'
    const Ni_IMAGE = 'https://sun9-44.userapi.com/impg/lFJG1qJcbLkX6KNY21S5RIsWwBCiHPHBvDRmLA/p6VQF_rsDpQ.jpg?size=724x1080&quality=95&sign=916e9aa8e45ee1fc9c1f0a675bdd68df&type=album'

    const router = useRouter()

    return (
        <>
            <MainLayout>
                <Grid container justifyContent="space-between" spacing={3}>
                    <Grid marginRight={'auto'} item direction={'column'}>
                        <h1>Главная страница</h1>
                        <h1>Music-platform</h1>
                        <h2>Описание</h2>
                        <h4>
                            Музыкальная платформа для прослушивания музыки
                        </h4>

                        <h2>Возможности:</h2>
                        <Grid container direction={'column'}>
                            <Button
                                variant={'outlined'}
                                onClick={()=>router.push('/albums')}
                            >Альбомы</Button>
                            <Button
                                style={{marginTop:5}}
                                variant={'outlined'}
                                onClick={()=>router.push('/tracks')}
                            >Треки</Button>
                        </Grid>

                    </Grid>
                    <Grid item direction={'column'}>
                        <h1 style={{textAlign: 'end', color: 'lightgrey'}}>Создатели</h1>
                        <Grid container direction={'column'} justifyContent={'center'} spacing={3}>
                            <Grid marginLeft={'auto'} item display={'flex'} flexDirection={'row'}>
                                <img style={{marginRight:25}} src={MY_IMAGE} width={100} height={150}/>
                                <Grid ml={5} textAlign={'end'} item flexDirection={'column'}>
                                    <h2>Драничкин Дмитрий</h2>
                                    <h2>Front</h2>
                                    <h4>Оформление и логика на клиенте</h4>
                                </Grid>
                            </Grid>
                            <Grid marginLeft={'auto'} item display={'flex'} flexDirection={'row'}>
                                <img style={{marginRight:75}} src={Ni_IMAGE} width={100} height={150}/>
                                <Grid ml={5} textAlign={'end'} item flexDirection={'column'}>
                                    <h2>Журкин Никита</h2>
                                    <h2>Backend</h2>
                                    <h4>Лидер и логика на сервере</h4>
                                </Grid>
                            </Grid>
                            <Grid marginLeft={'auto'} item display={'flex'} flexDirection={'row'}>
                                <img src={DI_IMAGE} width={150} height={150}/>
                                <Grid ml={5} textAlign={'end'} item flexDirection={'column'}>
                                    <h2>Ципиньо Дмитрий</h2>
                                    <h2>Backend</h2>
                                    <h3>Аналитика и логика на сервере </h3>
                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
            </MainLayout>
        </>

    );
};

export default Index;