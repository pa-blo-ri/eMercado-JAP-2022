import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase/app';
    import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase/firestore/lite';
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