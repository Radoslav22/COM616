import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Restaurants from "../assets/r.jpg"
import useRestaurants from "../services/firebase/useRestaurants"

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function RestaurantsDisplay() {
    const [restaurants, setRestaurants] = useState([]);
    const { getRestaurants } = useRestaurants();

    const getRestaurantsData = async () => {

        try {
            const restaurantsSnap = await getRestaurants();
            let restaurants = [];

            if (restaurantsSnap.size) {
                restaurantsSnap.forEach((doc) => {
                    restaurants.push({ ...doc.data(), ...{ id: doc.id } });
                });

                setRestaurants(restaurants.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getRestaurantsData();
    }, []);

    return (
        <div>

            {restaurants.map(r => (


                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        marginBottom: 1,
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',

                    }}
                >

                    <Grid container spacing={2}>

                        <Grid item>

                            <ButtonBase sx={{ width: 128, height: 128 }}>
                                <Img src={Restaurants} alt="complex" />


                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {r.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {r.number}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {r.type}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                        R
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" component="div">
                                    $19.00
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Paper >
            ))}
        </div>
    );
}