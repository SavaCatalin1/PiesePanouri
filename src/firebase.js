import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBfjA5mGeXKSBSykNsQ9j8rQl-l8aTOAew",
    authDomain: "piese-panouri.firebaseapp.com",
    projectId: "piese-panouri",
    storageBucket: "piese-panouri.appspot.com",
    messagingSenderId: "914360353614",
    appId: "1:914360353614:web:d0e232ac5eb4fab96cd41f",
    measurementId: "G-N2TGHY3SEZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);