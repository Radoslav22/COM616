import React from 'react';
import NavBar from "../Components/navbar";
import GoogleMap from "../Components/googlemap";
import { Box } from '@mui/system';
import { Typography, Grid } from '@mui/material';
import Restaurants from "../Components/restaurants"
function Home() {

    const message = "Hello Restaurants"
    return (
        <div>
            <NavBar></NavBar>
            <GoogleMap></GoogleMap>
            <Box sx={{ position: "absolute", top: "9%", left: 0, marginRight: "80%", padding: "2px", maxHeight: '100%', overflow: "auto" }}>
                <Grid sx={{ paddingBottom: "2px" }}>
                    <Restaurants></Restaurants>
                </Grid>


            </Box>



        </div>
    );

}

export default Home;
