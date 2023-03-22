import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loginform from "../Components/loginform";
import useAuth from '../services/firebase/useAuth';

function Login() {

    const { signInEmailUser, signInFacebookUser, signInGoogleUser } = useAuth();
    const navigate = useNavigate();
    const handleEmailSubmit = async (data) => {
        try {
            const { email, password } = data;
            await signInEmailUser(email, password);
            navigate("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleSocialSubmit = async (method) => {
        try {
            if (method === "facebook") {
                await signInFacebookUser();
                navigate("/");
            }
            if (method === "google") {
                await signInGoogleUser();
                navigate("/");
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
