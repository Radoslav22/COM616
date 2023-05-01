import React from 'react';
import NavBar from "../Components/navbar";
import BookingForm from '../Components/bookingform';
import Chat from '../Components/chat';
import useBookings from '../services/firebase/useBooking';
import useAuth from '../services/firebase/useAuth';
import { useNavigate } from 'react-router-dom';

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
            console.log("createbook before");
            await createBooking(tableRecord);

            navigate("/");
            console.log("createbook after");
        } catch (e) {
            console.log("here", e);

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
