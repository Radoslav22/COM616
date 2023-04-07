import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Restaurants from "../assets/r.jpg"
import useRestaurants from "../services/firebase/useRestaurants"
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Button } from '@mui/material';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function RestaurantsDisplay(props) {
    const [restaurants, setRestaurants] = useState([]);
    const { getRestaurants } = useRestaurants();
    const value = props.value
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

            {restaurants.filter((r) => {
                return value.toLowerCase() === '' ? r : r.name.toLowerCase().includes(value)
            }).map(r => (


                <Paper key={r.id}
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
                            <Grid item xs container direction="column" spacing={2} >
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {r.name}  <StarHalfIcon sx={{ color: "#FBBC04", height: "16px", width: "16px" }} />{r.review}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {r.type}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {r.address}
                                    </Typography>
                                    <Typography variant='body2' glutterBottom>
                                        Average price: £{r.avgprice}
                                    </Typography>
                                    <Typography variant='body2' glutterBottom>
                                        <Button sx={{ ml: 22 }}>Book</Button>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ cursor: 'pointer' }} variant="body2">

                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </Paper >
            ))}
        </div>
    );
}