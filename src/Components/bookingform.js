import React from 'react';
import { useEffect, useState } from 'react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from 'react-router-dom';
import useTables from '../services/firebase/useTables';
import useAuth from '../services/firebase/useAuth';
import { useForm } from "react-hook-form";
import useBookings from '../services/firebase/useBooking';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const BookingForm = (props) => {
    const { user } = useAuth();
    const [table, setTable] = useState([]);
    const { onSubmit } = props;
    const { getTable } = useTables();
    const { createBooking } = useBookings();
    let { table_id } = useParams();

    const getTablesData = async () => {

        try {
            const tablesSnap = await getTable();
            let table = [];

            if (tablesSnap.size) {
                tablesSnap.forEach((doc) => {

                    table.push({ ...doc.data(), ...{ id: doc.id } });

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

    const tableFormSchema = yup
        .object({
            date: yup.string().required("you must define date"),
            start: yup.string().required("you must define date"),
            end: yup.string().required("you must define date"),
            people: yup.string().required("you must define number of people"),
            restaurantid: yup.string().required(""),
            tableid: yup.string().required(""),
            userid: yup.string().required(""),
        })
        .required();

    const {
        register,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(tableFormSchema),
        defaultValues: { date: "", start: "", end: "", people: "", restaurantid: "", tableid: "", userid: "" },
    });
    const onFormSubmit = (data) => {

        onSubmit({ ...data });
    };

    return (

        <div>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            ><Typography variant="h5">
                    Please choose the desired date and time!
                </Typography>
                {table.filter(t => t.id === table_id).map(t => (


                    <form onSubmit={handleSubmit(onFormSubmit)} style={{ textAlign: "center" }}>



                        <Grid container justifyContent="center" spacing={1}>
                            <Grid item xs={12}>
                                <TextField

                                    required

                                    name="stime"
                                    label="Start time"
                                    type="time"
                                    id="stime"
                                    autoComplete="stime"
                                    {...register("start")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField

                                    required

                                    name="etime"
                                    label="End time"
                                    type="time"
                                    id="etime"
                                    autoComplete="etime"
                                    {...register("end")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField

                                    required

                                    name="date"
                                    label="Book Date"
                                    type="date"
                                    id="date"
                                    autoComplete="date"
                                    {...register('date')}

                                />
                            </Grid>



                            <Grid item xs={12}><Typography variant='h6'>Please just click until the booking is succesful!</Typography></Grid>
                            <Grid item xs={12}><TextField name='people'{...register("people")} value={t.people} /></Grid>
                            <Grid item xs={12}><TextField name='restaurantid' {...register("restaurantid")} value={t.restaurantid} /></Grid>
                            <Grid item xs={12}><TextField name='tableid' {...register("tableid")} value={t.id} /></Grid>
                            <Grid item xs={12}><TextField name='userid' {...register("userid")} value={user.uid} /></Grid>
                            <Grid item xs={12}><Button variant="contained" type='submit' sx={{ backgroundColor: "#CBA500" }}> Book</Button></Grid>
                        </Grid>

                    </form>


                ))
                }

            </Box >

        </div >
    );
}

export default BookingForm;
