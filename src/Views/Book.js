import React from 'react';
import NavBar from "../Components/navbar";

import DisplayTable from '../Components/displaytables';
import Chat from '../Components/chat';

function Book() {


    return (
        <div>
            <NavBar></NavBar>

            <DisplayTable />
            <Chat></Chat>
        </div>
    );

}

export default Book;
