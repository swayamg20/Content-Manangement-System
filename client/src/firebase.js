// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYKVIOGjNpYw_BVLzuha3HedKCJb910WQ",
    authDomain: "content-manager-e4af9.firebaseapp.com",
    projectId: "content-manager-e4af9",
    storageBucket: "content-manager-e4af9.appspot.com",
    messagingSenderId: "951829674627",
    appId: "1:951829674627:web:1a7319d569b4381990f9b6",
    measurementId: "G-0HYY3TMNYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export function FirebaseApp(){
    return initializeApp(firebaseConfig);
}
const storage = getStorage(app);
export {storage};
