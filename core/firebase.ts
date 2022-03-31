// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getDatabase, ref, child, get } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID
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

export const createProgressEntity = async (uuid: string, name:string, max: number) => {
    try {
        const entitiesRef = collection(db, "data", uuid, "entities")
        const newEntityRef = doc(entitiesRef)
        await setDoc(newEntityRef, {
            name: name,
            max: max,
            current: 0,
            created: new Date().toString(),
            updated: new Date().toString(),
            done: (0 === max)
        })
        return newEntityRef.id
    } catch (err) {
        console.log(err)
    }
}

export const setEntityProgress = async (uuid: string, entityId: string, current: number) => {
    
    const entityRef = doc(db, "data", uuid, "entities", entityId)
    const entitySnap = await getDoc(entityRef)
    if (entitySnap.data()?.done) {
        throw Error("Requested entity can't be updated, its status is set as done.")
    }
    if (entitySnap.data()?.current < current && entitySnap.data()?.max >= current) {
        await updateDoc(entityRef, {
            current: current,
            updated: new Date().toString(),
            done: (current === entitySnap.data()?.max)
        })
        return entityId
    } else {
        throw Error("Can't assign new current")
    }

}