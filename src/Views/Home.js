import React, { useState, useEffect } from 'react';
import NavBar from "../Components/navbar";
import Restaurants from "../assets/r.jpg"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chat from '../Components/chat';
import { Button, Typography } from '@mui/material';
import foodplate from "../assets/food-plate.jpg"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import useRestaurants from '../services/firebase/useRestaurants';
import Grid from '@mui/material/Grid';
import StarHalfIcon from '@mui/icons-material/StarHalf';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.65),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.95),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    border: "1px solid grey",

}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'grey',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
function Home() {
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
    },);

    return (
        <div>
            <NavBar></NavBar>

            <React.Fragment>

                <Container maxWidth={"xl"} style={{ display: "inline-block", marginTop: "2px", width: "100%", height: "80vh", backgroundImage: `url(${foodplate})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat", }}>
                    <Box maxWidth={"sm"} maxHeight={"sm"} sx={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", height: "35vh", marginLeft: "15vw", marginTop: "22vh", alignContent: "center", background: "white", borderRadius: "5px" }}>
                        <Typography variant='h4' sx={{ marginTop: 5, textShadow: "0 0 3px #ADC0C7, 0 0 5px #ADC0C7", color: "#6f6f6f" }}>Discover and book the best restaurants</Typography>
                        <Typography sx={{ marginLeft: "2vw", marginTop: "1vh", fontSize: "14px" }}>What?</Typography>
                        <Search>

                            <SearchIconWrapper>
                                <RestaurantOutlinedIcon sx={{ color: "grey" }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}

                            />

                        </Search>
                        <Typography sx={{ marginLeft: "2vw", marginTop: "1vh", fontSize: "14px" }}>Where?</Typography>
                        <Search>

                            <SearchIconWrapper>
                                <LocationOnOutlinedIcon sx={{ color: "grey" }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}

                            />

                        </Search>
                        <Button variant='contained' color='success' sx={{ width: "35vw", marginLeft: "2vw", marginTop: "2vh" }}>Search</Button>
                    </Box>


                </Container>
                <Container sx={{ width: "70%" }}>
                    <Typography variant='h5'>Choosen for you</Typography>
                    <p>Same</p>
                    <Typography variant='h5'>Popular in Southampton</Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="strech"
                    >
                        {restaurants.map(r => (

                            <Card sx={{ maxWidth: 400 }}>
                                <CardMedia
                                    sx={{ height: 100 }}
                                    image={Restaurants}
                                    title="restaurant image"
                                />

                                <CardContent>
                                    <Typography gutterBottom component="div">
                                        {r.name} <StarHalfIcon sx={{ color: "#FBBC04", height: "16px", width: "16px" }} />{r.review}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">

                                        {r.type}<br />
                                        Average price: £{r.avgprice} <br />

                                    </Typography>
                                </CardContent>

                            </Card>
                        ))}
                    </Grid>
                    <Typography variant='h5'>How does it works?</Typography>
                </Container>
            </React.Fragment>

            <Chat></Chat>
        </div >
    );

}

export default Home;
