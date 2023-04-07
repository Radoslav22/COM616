import React from 'react';
import NavBar from "../Components/navbar";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chat from '../Components/chat';
import { Typography } from '@mui/material';
import { width } from '@mui/system';
import foodplate from "../assets/food-plate.jpg"

function Home() {


    return (
        <div>
            <NavBar></NavBar>

            <React.Fragment>

                <Container maxWidth={"xl"} style={{ marginTop: "2px", width: "100%", height: "80vh", backgroundImage: `url(${foodplate})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat", }}>
                    <Box maxWidth={"sm"} maxHeight={"sm"} sx={{ alignContent: "center", background: "white" }}>
                        <Typography>Discover and book the best restaurants</Typography>
                    </Box>


                </Container>
                <Container maxWidth={"sm"}>
                    <Typography>Choosen for you</Typography>
                    <p>Restaurants</p>
                    <p>Restaurants</p>
                    <p>Restaurants</p>
                    <p>Restaurants</p>
                    <p>Restaurants</p>
                </Container>
            </React.Fragment>

            <Chat></Chat>
        </div >
    );

}

export default Home;
