import React from 'react';
import { useState } from 'react';
import useAuth from '../services/firebase/useAuth';
import SignUpForm from '../Components/signupform'
function Signup() {
    const [serverErrorMessage, setServerErrorMessage] = useState();
    const { signInEmailUser, signInFacebookUser, signInGoogleUser } = useAuth();

    const handleEmailSubmit = async (data) => {
        try {
            const { email, password } = data;
            console.log(data);
            await signInEmailUser(email, password);

        } catch (e) {
            setServerErrorMessage(e.message);
            console.log(e)
        }
    };

    return (
        <div>
            <SignUpForm>
                serverErrorMessage={serverErrorMessage}
                onEmailSubmit={handleEmailSubmit}

            </SignUpForm>
        </div>
    );

}

export default Signup;
