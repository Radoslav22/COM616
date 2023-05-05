import React, { useEffect, useState } from 'react';
import useRestaurants from "../services/firebase/useRestaurants"
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Restaurants from "../assets/r.jpg";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Button } from '@mui/material';
import useTables from '../services/firebase/useTables';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import useBookings from '../services/firebase/useBooking';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const DisplayTable = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [booking, setBooking] = useState([]);
    const [table, setTable] = useState([]);
    const { getRestaurants } = useRestaurants();
    const { getTable } = useTables();
    const { getBooking } = useBookings();
    let { restaurant_id } = useParams();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    function format(date) {
        if (!(date instanceof Date)) {
            throw new Error('Invalid "date" argument. You must pass a date instance')
        }

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }
    function formatTime(time) {
        let data = time.split(":")
        return parseInt(data[0]) * 60 + parseInt(data[1])
    }
    useEffect(() => {
        const now = new Date();

        setDate(format(now));
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            setTime(hours * 60 + minutes);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
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
    const getBookingData = async () => {

        try {
            const bookingSnap = await getBooking();
            let booking = [];

            if (bookingSnap.size) {
                bookingSnap.forEach((doc) => {
                    let b = doc.data()

                    console.log(b.restaurantid, restaurant_id, "reserved")
                    if (b.restaurantid === restaurant_id) {
                        let table_index = findTable(b.tableid)
                        console.log(table_index)
                        if (table_index >= 0) {
                            if (b.date === date && parseInt(time) > formatTime(b.start) && parseInt(time) < formatTime(b.end)) {
                                console.log(b.restaurantid, "reserved")
                                table[table_index].open = false
                                //table.push(table[table_index]);


                            } else {
                                console.log(b.restaurantid, "open")
                            }
                        }
                        booking.push({ ...b, ...{ id: doc.id } });

                    }
                });

                setBooking(booking.reverse());
                console.log(table)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBookingData();
    }, []);

    const getTablesData = async () => {

        try {
            const tablesSnap = await getTable();
            let table = [];

            if (tablesSnap.size) {
                tablesSnap.forEach((doc) => {

                    table.push({ ...doc.data(), ...{ id: doc.id, open: true } });

                });

                setTable(table.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getTablesData();

    }, []);
    function findTable(tableid) {
        let tableind
        table.forEach((t, index) => {
            if (t.id === tableid) {
                tableind = index
            }
        })

        return tableind
    }
    console.log(table)

    console.log(booking)



    return (
        <div>
            <Link href="/restaurants"><Button variant='contained' color='success'>Go Back </Button></Link>

            {restaurants.filter(r => r.id === restaurant_id).map(r => (
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

            <Grid
                sx={{ marginTop: "2vh" }}
                container
                direction="row"
                justifyContent="space-around">
                {table.map(t => (


                    <Card sx={{ minWidth: 275 }} key={t.id}>
                        <CardContent>
                            <Typography variant='h6' color="text.secondary" gutterBottom>
                                {t.open ? ("AVAILABLE") : ("RESERVED")}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Number of table:{t.tablename}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {t.restaurant_id}
                            </Typography>
                            <Typography variant="body2">
                                Table for:{t.people} people

                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link href={"/book-table/" + t.id}><Button size="small">Book Table</Button></Link>
                        </CardActions>
                    </Card>

                ))}
            </Grid>


        </div>
    );
}

export default DisplayTable;