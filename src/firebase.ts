import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const api = import.meta.env.VITE_FIREBASE_API_KEY;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;



const firebaseConfig = {
    apiKey: api,
    authDomain: `${projectId}.firebaseapp.com`,
    projectId: projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: messagingSenderId,
    appId: appId,
};




export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
