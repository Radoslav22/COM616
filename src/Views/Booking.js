import React from 'react';
import NavBar from "../Components/navbar";
import BookingForm from '../Components/bookingform';
import Chat from '../Components/chat';
import useBookings from '../services/firebase/useBooking';
import useAuth from '../services/firebase/useAuth';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

function Booking() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { createBooking } = useBookings();

    const TableSubmit = async (book) => {
        const tableRecord = {

            ...{
                date: book.date,
                start: book.start,
                end: book.end,
                people: book.people,
                restaurantid: book.restaurantid,
                tableid: book.tableid,
                userid: user.uid
            },
        };
        try {
            await createBooking(tableRecord);
            navigate("/");
            NotificationManager.success('You succesfully book a table!', 'Successful!', 2000);
        } catch (e) {
            console.log(e);
            NotificationManager.error('Error while creating new booking!', 'Error!');
        }
    }

    return (
        <div>
            <NavBar></NavBar>

            <BookingForm onSubmit={TableSubmit} />
            <Chat></Chat>
        </div>
    );

}

export default Booking;
