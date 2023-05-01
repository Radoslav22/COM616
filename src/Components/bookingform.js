import React from 'react';
import { useEffect, useState } from 'react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from 'react-router-dom';
import useTables from '../services/firebase/useTables';
import useAuth from '../services/firebase/useAuth';
import { useForm } from "react-hook-form";
import useBookings from '../services/firebase/useBooking';
import { TextField } from '@mui/material';
import ListItem from '@mui/material/ListItem';

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
            {table.filter(t => t.id === table_id).map(t => (

                <div key={t.id}>
                    <p>Number of table: {t.tablename}</p>
                    <p>Number of people: {t.people}</p>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <ListItem sx={{ marginLeft: 5 }}>
                            <TextField

                                required

                                name="stime"
                                label="Start time"
                                type="time"
                                id="stime"
                                autoComplete="stime"
                                {...register("start")}
                            />
                            <TextField

                                required

                                name="etime"
                                label="End time"
                                type="time"
                                id="etime"
                                autoComplete="etime"
                                {...register("end")}
                            />
                            <TextField

                                required

                                name="date"
                                label="Book Date"
                                type="date"
                                id="date"
                                autoComplete="date"
                                {...register('date')}

                            />


                        </ListItem>

                        <input name='people'{...register("people")} value={t.people}></input>
                        <input name='restaurantid' {...register("restaurantid")} value={t.restaurantid}></input>
                        <input name='tableid' {...register("tableid")} value={t.id}></input>
                        <input name='userid' {...register("userid")} value={user.uid}></input>
                        <button type='submit'> Submit</button>
                    </form>
                </div>

            ))
            }



        </div >
    );
}

export default BookingForm;
