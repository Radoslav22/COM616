import React from 'react';
import Loginform from "../Components/loginform";
import useAuth from '../services/firebase/useAuth';

function Login() {

    const { signInEmailUser, signInFacebookUser, signInGoogleUser } = useAuth();

    const handleEmailSubmit = async (data) => {
        try {
            const { email, password } = data;
            await signInEmailUser(email, password);

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
            console.log(error)
        }
    };

    return (
        <div>
            <Loginform
                onEmailSubmit={handleEmailSubmit}
                onSocialSubmit={handleSocialSubmit}
            />


        </div>
    );

}

export default Login;
