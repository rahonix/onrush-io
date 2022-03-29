// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getDatabase, ref, child, get } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getUserDocument = async (uuid: string) => {
    try {
        const docRef = doc(db, "data", uuid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            throw new Error("Document does not exist")
        }
    } catch {
        throw new Error("Document does not exist")
    }
}

export const createProgressEntity = async (uuid: string, max: number) => {
    try {
        const entitiesRef = collection(db, "data", uuid, "entities")
        const newEntityRef = doc(entitiesRef)
        await setDoc(newEntityRef, {
            current: 0,
            max: max
        })
        return newEntityRef.id
    } catch (err) {
        console.log(err)
    }
}

export const setEntityProgress = async (uuid: string, entityId: string, current: number) => {
    try {
        const entityRef = doc(db, "data", uuid, "entities", entityId)
        await updateDoc(entityRef, {
            current: current,
        })
    } catch (err) {
        console.log(err)
    }
}