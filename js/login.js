import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.13.0/firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

document.getElementById("btn-li").addEventListener("click", function () {


    if (isEmpty("floatingInput") || isEmpty("floatingPassword")) {



        if (isEmpty("floatingInput")) {
            isEmptyStyle("floatingInput");

        } else document.getElementById("floatingInput").style.borderColor = "";

        if (isEmpty("floatingPassword")) {
            isEmptyStyle("floatingPassword");

        } else document.getElementById("floatingPassword").style.borderColor = "";


        alert("Ninguno de los campos puede estar vacío.");


    } else {
        localStorage.setItem("userName", document.getElementById("floatingInput").value);
        window.location.href = "portada.html";

    }
});

function isEmpty(tagId) {
    let inputLenght = (Object.keys(document.getElementById(tagId).value).length);
    return inputLenght <= 0;
}



function isEmptyStyle(tagId) {
    document.getElementById(tagId).style.borderColor = "red";

}

function callLoginGoogle(){
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
}

document.getElementById('forg-pass').onclick = () => callLoginGoogle()
