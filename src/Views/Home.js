import React, { useState } from 'react';
import NavBar from "../Components/navbar";
import GoogleMap from "../Components/googlemap";
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import Restaurants from "../Components/restaurants"

import Chat from '../Components/chat';

function Home() {
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div>
            <NavBar value={value} onChange={handleChange} ></NavBar>
            <GoogleMap></GoogleMap>
            <Box sx={{ position: "absolute", top: "9%", left: 0, marginRight: "70%", padding: "2px", maxHeight: '100%', overflow: "auto" }}>
                <Grid sx={{ paddingBottom: "2px" }}>
                    <Restaurants value={value}></Restaurants>
                </Grid>
            </Box>

            <Chat></Chat>
        </div>
    );

}

export default Home;


