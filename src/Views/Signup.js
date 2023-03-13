import React from "react";

import Form from "../Components/signupform";

import useAuth from "../services/firebase/useAuth";



function Signup(props) {
    const { createEmailUser, signInFacebookUser, signInGoogleUser } = useAuth();


    const handleEmailSubmit = async (data) => {
        try {
            const { email, password } = data;
            await createEmailUser(email, password);
            console.log(data);
        } catch (e) {
            console.log(e.message);
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

            />

        </div>
    );
}

Signup.propTypes = {};

export default Signup;