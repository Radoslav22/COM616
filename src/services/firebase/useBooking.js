import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
} from "firebase/firestore";

function useBookings() {
    const db = getFirestore();
    const ref = collection(db, "booking");

    const getBooking = () => getDocs(ref);
    const createBooking = (event) => addDoc(ref, event);
    return { getBooking, createBooking };
}

export default useBookings;