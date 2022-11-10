// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyAE1spC1Frze7kr4aP-NrcjZHGxSnAbz_Q",

    authDomain: "proyecto-jap-c66f2.firebaseapp.com",

    projectId: "proyecto-jap-c66f2",

    storageBucket: "proyecto-jap-c66f2.appspot.com",

    messagingSenderId: "228063077799",

    appId: "1:228063077799:web:95475790fe3620af2c0282"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

//Login Flow handled by FB JS SDK

import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

//Login emergent window

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });