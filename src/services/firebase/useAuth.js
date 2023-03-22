import {
    createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged,
    signInWithEmailAndPassword, signInWithPopup, signOut
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({})
    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);

                setUser(user);

                return;
            }
            setIsAuthenticated(false);
            setUser({})
            return;
        });

    }, [setIsAuthenticated, auth])



    const createEmailUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);


    const signInEmailUser = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const signUserOut = () => signOut(auth);
    const signInGoogleUser = () => signInWithPopup(auth, googleProvider);
    const signInFacebookUser = () => signInWithPopup(auth, facebookProvider);
    return {
        createEmailUser, isAuthenticated, signInEmailUser, signUserOut, user,
        signInGoogleUser, signInFacebookUser
    };
}

export default useAuth;