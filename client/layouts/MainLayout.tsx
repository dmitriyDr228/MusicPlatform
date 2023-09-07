import React, {ReactNode} from 'react';
import NavBar from "@/components/NavBar";
import {Container} from "@mui/system";
import Player from "@/components/Player";

interface Props {
    children: React.ReactNode;
}
const MainLayout: React.FC<Props> = ({children}) => {
    return (
        <>
            <NavBar/>
            <Container style={{margin:'100px 0', paddingLeft:'220px'}}>
                {children}
            </Container>
            <Player/>
x        </>
    );
};

export default MainLayout;