import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase/app';
    import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase/firestore/lite';
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.13.0/firebase/auth";
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

    const loginWithGoogle = function () {

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
      
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
            
          });
      
      }