import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: 'repapic-d7b56.firebaseapp.com',
    projectId: 'repapic-d7b56',
    storageBucket: 'repapic-d7b56.appspot.com',
    messagingSenderId: '55578192881',
    appId: '1:55578192881:web:501340041b02c85e0f7250',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export default app;
