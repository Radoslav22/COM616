import React from 'react';
import NavBar from "../Components/navbar";
import GoogleMap from "../Components/googlemap";
import { Box } from '@mui/system';
import { Typography, Grid } from '@mui/material';

function Home() {

    const message = "Hello Restaurants"
    return (
        <div>
            <NavBar></NavBar>
            <GoogleMap></GoogleMap>
            <Box sx={{ position: "absolute", top: "9%", left: 0, background: "yellow", marginRight: "80%", padding: "2px" }}>
                <Grid sx={{ paddingBottom: "2px" }}>
                    <Typography noWrap>{message}</Typography>
                </Grid>
                <Grid sx={{ paddingBottom: "2px" }}>
                    <Typography noWrap>{message}</Typography>
                </Grid>
                <Grid sx={{ paddingBottom: "2px" }}>
                    <Typography noWrap>{message}</Typography>
                </Grid>
                <Grid sx={{ paddingBottom: "2px" }}>
                    <Typography noWrap>{message}</Typography>
                </Grid>
                <Grid sx={{ paddingBottom: "2px" }}>
                    <Typography noWrap>{message}</Typography>
                </Grid>
            </Box>



        </div>
    );

}

export default Home;
