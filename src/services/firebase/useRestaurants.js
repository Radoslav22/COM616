import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
} from "firebase/firestore";

function useRestaurants() {
    const db = getFirestore();
    const ref = collection(db, "pubs");

    const getRestaurants = () => getDocs(ref);

    return { getRestaurants };
}

export default useRestaurants;