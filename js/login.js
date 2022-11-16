document.getElementById('formulario').onsubmit = (e) => {

    if (!document.getElementById('formulario').checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
    } else {
        e.preventDefault()        
        localStorage.setItem("userName", document.getElementById("floatingInput").value)
        window.location.href = "portada.html"
    }
    document.getElementById('formulario').classList.add('was-validated')
}

const loginWithGoogle = () => {

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

