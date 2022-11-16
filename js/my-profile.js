document.addEventListener("DOMContentLoaded", function () {
    checkLogIn()
})

const getById = id => document.getElementById(id)

const logIn = () => getById('logIn').onclick = () => window.location = "index.html"

const checkLogIn = () => {

    if (localStorage.getItem('userName') === null) {
        getById('alert').classList.remove("visually-hidden")
        getById('mainCard').classList.add("visually-hidden")
        logIn()

    } else {

        userToBar()
        buttonEvents()
        getById('mainCard').classList.remove("visually-hidden")
        getById('alert').classList.add("visually-hidden")
        settingDefaultValues()
    }
}

const dataToLocalStorage = () => {

    const inputs = document.querySelectorAll('input[type="text"]')
    let stringToLocalStorage = ``

    inputs.forEach((input, index) => {

        if (input.id === "correo" && input.value !== "") {

            localStorage.setItem('userName', input.value)

        } else {

            index === 0 ? firstChar = "{" : firstChar = ""
            index === inputs.length - 1 ? lastChar = "}" : lastChar = ","

            stringToLocalStorage += `${firstChar}"${input.id}":"${input.value}"${lastChar}`
        }
    })
    stringToLocalStorage = '[' + stringToLocalStorage + ']'
    localStorage.setItem('userData', stringToLocalStorage)
}

const settingDefaultValues = () => {

    if (localStorage.getItem('userImg') !== null) {
        document.querySelector("#display-image").style.backgroundImage = `url(${localStorage.getItem("userImg")})`
    }

    if (localStorage.getItem('userData') !== null) {

        const inputs = document.querySelectorAll('input[type="text"]')
        const defaultData = JSON.parse(localStorage.getItem('userData'))[0]
        const obj = {
            "nombre": defaultData.nombre,
            "segundoNombre": defaultData.segundoNombre,
            "apellido": defaultData.apellido,
            "segundoApellido": defaultData.segundoApellido,
            "correo": localStorage.getItem('userName'),
            "telefono": defaultData.telefono
        }
        inputs.forEach(input => input.setAttribute("value", obj[input.id]))
    } else {
        getById('correo').setAttribute("value", localStorage.getItem('userName'))
    }
}

const buttonEvents = () => {

    getById('closeAlert').onclick = () => getById('alertSuccess').classList.add('visually-hidden')
    getById('cancel').onclick = () => window.location = 'portada.html'
    getById('formulario').onsubmit = (e) => {

        if (!getById('formulario').checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            e.preventDefault()
            getById('alertSuccess').classList.remove('visually-hidden')
            dataToLocalStorage()
            userToBar()
        }
        getById('formulario').classList.add('was-validated')
    }
}


const imageInput = document.querySelector("#file-input")

imageInput.addEventListener("change", function () {

    const reader = new FileReader()

    reader.addEventListener("load", () => {

        const uploadedImage = reader.result

        document.querySelector("#display-image").style.backgroundImage = `url(${uploadedImage})`
        document.querySelector('#display-image').classList.add("fade-in")

        localStorage.setItem('userImg', uploadedImage)

        setTimeout(() => {
            document.querySelector('#display-image').classList.remove("fade-in")
        }, "1000")

    })
    reader.readAsDataURL(this.files[0])
})



