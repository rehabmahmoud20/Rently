import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD1ZefdGf7KNxr61dKfVVCKVhu5fANLEn8',
    authDomain: 'rently-cdc3f.firebaseapp.com',
    projectId: 'rently-cdc3f',
    storageBucket: 'rently-cdc3f.appspot.com',
    messagingSenderId: '718475945517',
    appId: '1:718475945517:web:f3e5adb32a26ce1e0efaa4',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
