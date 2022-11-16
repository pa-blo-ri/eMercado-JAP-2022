import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
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
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

//document.getElementById('forg-pass').addEventListener('click', () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

export const loginWithGoogle = () => {
    
    signInWithPopup(auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user.displayName)
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    
        console.log(errorMessage)
        
        })

        return window.loginWithGoogle = loginWithGoogle
    //window.loginWithGoogle = loginWithGoogle

    }

 

    
    
    
