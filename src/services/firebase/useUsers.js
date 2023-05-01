import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
} from "firebase/firestore";

function useUsers() {
    const db = getFirestore();
    const ref = collection(db, "users");

    const getUsers = () => getDocs(ref);
    const createUsers = (event) => addDoc(ref, event);
    return { getUsers, createUsers };
}

export default useUsers;