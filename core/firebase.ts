// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc } from "firebase/firestore";
import { getDatabase, ref, child, get } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase

export const getUserDocument = async (uuid: string) => {
    let app = initializeApp(firebaseConfig);
    let dbRef = ref(getDatabase(app));
    const snapshot = await get(child(dbRef, `data/${uuid}`))
    if (snapshot.exists()) {
        return snapshot
    } 
    return new Error("Document does not exist")
} 