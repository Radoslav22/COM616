import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
} from "firebase/firestore";

function useTables() {
    const db = getFirestore();
    const ref = collection(db, "tables");

    const getTable = () => getDocs(ref);

    return { getTable };
}

export default useTables;