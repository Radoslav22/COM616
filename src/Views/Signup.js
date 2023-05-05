import React from "react";

import Form from "../Components/signupform";
import { useNavigate } from 'react-router-dom';
import useAuth from "../services/firebase/useAuth";



function Signup(props) {
    const { createEmailUser, signInFacebookUser, signInGoogleUser } = useAuth();

    const navigate = useNavigate();
    const handleEmailSubmit = async (data) => {
        try {
            const { email, password } = data;
            await createEmailUser(email, password);
            navigate('/restaurants');
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleSocialSubmit = async (method) => {
        try {
            if (method === "facebook") {
                await signInFacebookUser();
                navigate('/restaurants');
            }
            if (method === "google") {
                await signInGoogleUser();
                navigate('/restaurants');
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

            />

        </div>
    );
}

Signup.propTypes = {};

export default Signup;