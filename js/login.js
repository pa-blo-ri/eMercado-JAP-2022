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