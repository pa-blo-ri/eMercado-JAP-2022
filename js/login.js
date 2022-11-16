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

