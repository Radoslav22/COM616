import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Form from "../Components/signupform";
import Tile from "../Components/Tile";
import useAuth from "../services/firebase/useAuth";



function Signup(props) {
    const { createEmailUser, signInFacebookUser, signInGoogleUser } = useAuth();
    const [severErrorMessage, setServerErrorMessage] = useState();

    const handleEmailSubmit = async (data) => {
        try {
            const { email, password } = data;
            await createEmailUser(email, password);
            console.log(data);
        } catch (e) {
            setServerErrorMessage(e.message);
        }
    };

    const handleSocialSubmit = async (method) => {
        try {
            if (method === "facebook") {
                await signInFacebookUser();
            }
            if (method === "google") {
                await signInGoogleUser();
            }
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <div>

            <Form
                onSocialSubmit={handleSocialSubmit}
                onEmailSubmit={handleEmailSubmit}
                serverErrorMessage={severErrorMessage}
            />

        </div>
    );
}

Signup.propTypes = {};

export default Signup;