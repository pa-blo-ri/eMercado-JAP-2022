let cartData = []
let cartContainer = []
let currentArray = []
let currentArticle = ''
let subtotalCartNewCurrency = 0
let subtotalCartDolar = 0
let dolarActualCompra = 0
let defaultCurrency = 'USD'

const cart = () => { //Mostrando carrito con sus elementos

    let i = 0

    cartContainer.forEach(() => {


        currentArticle = `<ul class="list-group list-group-horizontal">
                    
                    <li class="list-group-item list-group-item-cart d-flex"><img src="${cartContainer[i].image}" class="me-4 cursor-active" style="height:45px" onclick="idToLocalStorage(${cartContainer[i].id})" /><span class="cursor-active align-self-center" onclick="idToLocalStorage(${cartContainer[i].id})">${cartContainer[i].name}</span></li>
                    <li class="list-group-item list-group-item-cart align-self-center"><input type="text" value="${cartContainer[i].count}" id="index${i}" class="w-25 text-center cart-count-input rounded-3" ></li>
                    <li class="list-group-item list-group-item-cart align-self-center">${cartContainer[i].currency} ${cartContainer[i].unitCost}</li>
                    <li class="list-group-item list-group-item-cart fw-bold _cart-subt align-self-center" >${cartContainer[i].currency} ${cartContainer[i].unitCost * cartContainer[i].count}</li>
                    <span class="col-1 align-self-center _removeItem">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash cursor-active" viewBox="0 0 16 16" id="svgTrash${i}">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  
                  </span>
                    
                </ul><hr class="mb-1">
                
               `
        document.getElementById('cart').innerHTML += currentArticle

        subtotalCartNewCurrency += newCurrency((cartContainer[i].currency), (cartContainer[i].unitCost * cartContainer[i].count), defaultCurrency)
        i++
    })

    callFunc()
}

const callFunc = () => { //Llamando a otras funciones luego de cargar el carrito
    postSubt()
    calculateSubt()
    removeItem()
    getSelectedCurrency()
    getSelectedDelivery()
    paymentMethod()
    paymentMethodLabel()
}

const newCurrency = (currency, cost, newCurrency) => { //Nos fijamos la moneda del item y la convertimos a pesos o a dolares dependiendo de la eleccion del usuario

    const actualCurrency = {
        "USD": (newCurrency) => (newCurrency === "UYU" ? cost * dolarActualCompra : cost),
        "UYU": (newCurrency) => (newCurrency === "USD" ? cost / dolarActualVenta : cost)
    }

    return Number(Number(actualCurrency[currency](newCurrency)).toFixed(2))
}

const postTotal = (currency = "USD") => { //Mostramos el total

    const sum = Number(document.getElementById('subTotalCart').innerHTML.slice(4)) + Number(document.getElementById('deliveryTax').innerHTML.slice(4))

    document.getElementById('totalCart').innerHTML = currency + " " + sum.toFixed(2)
}

const postSubt = (currency = "USD") => { //MOstramos el subtotal

    let element = document.getElementsByClassName('_cart-subt')
    let toPost = 0
    let i = 0

    cartContainer.forEach(() => {

        toPost += newCurrency((cartContainer[i].currency), (Number(element[i].innerHTML.slice(4))), currency)
        i++

    })
    document.getElementById('subTotalCart').innerHTML = currency + " " + Number(toPost).toFixed(2)
    deliveryTax()
}

const deliveryTax = (selected = "Premium") => {//Mostrando el costo del envio

    let element = Number(document.getElementById('subTotalCart').innerHTML.slice(4))
    let toPost = 0

    const deliveryOpt = {
        "Premium": toPost = element * 0.15,
        "Express": toPost = element * 0.07,
        "Standard": toPost = element * 0.05
    }

    document.getElementById('deliveryTax').innerHTML = defaultCurrency + " " + Number(Number(deliveryOpt[selected]).toFixed(2))
    postTotal(defaultCurrency)
}

const removeItem = () => { //Borrando un item del carrito

    let inp = document.querySelectorAll('svg.bi-trash')

    inp.forEach((e) => {
        e.addEventListener('click', function () {

            let id = e.id.slice(8)
            let values = cartContainer[id]

            cartContainer = cartContainer.filter((item) => item.id !== values.id)


            document.getElementById('cart').innerHTML = ``

            cart()

            cartContainer.shift()
            localStorage.setItem('cartObj', JSON.stringify(cartContainer))
            settingCartContent()
        })
    })
}

const getSelectedCurrency = () => { //Nos fijamos la eleccion de moneda del usuario

    const radioButtons = document.querySelectorAll('input[name="tipoMoneda"]');

    radioButtons.forEach((e) => {
        e.addEventListener('input', function () {
            let selectedCurrency;
            for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedCurrency = radioButton.value;
                    break;
                }
            }
            defaultCurrency = selectedCurrency
            postSubt(selectedCurrency)

        })
    })
}


const paymentMethodLabel = (selected = "ninguno") => { //Mostramos el metodo de pago elegido por el usuario
    const selectedPayment = {
        "ninguno": "Seleccionado: Ninguno",
        "tarjeta": "Seleccionado: Tarjeta de crédito",
        "transferencia": "Seleccionado: Transferencia bancaria"
    }

    return document.getElementById('paymentMethodLabel').innerHTML = selectedPayment[selected]
}

const paymentMethod = () => { //Nos fijamos el metodo de pago elegido por el usario

    const radioButtons = document.querySelectorAll('input[name="payment"]')

    radioButtons.forEach((e) => {
        e.addEventListener('input', function () {
            let selectedPayment;
            for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedPayment = radioButton.value;
                    break;
                }
            }
            buildModalBody(selectedPayment)
            paymentMethodLabel(selectedPayment)

        })
    })
}

const buildModalBody = (selected) => { //Construimos el modal en base a la elecciond del usuario

    let toPost = ''

    if (selected === "tarjeta") {
        toPost = `
        <hr class="modal-hr">        
            <div class="col-6">
            <label for="numTarj" class="form-label">Numero de tarjeta</label>
            <input type="text" class="form-control" id="numTarj" required>                        
            </div>
            <div class="col-3">
            <label for="vto" class="form-label">Vencimiento</label>
            <input type="text" class="form-control" id="vto" required>
            </div>
            <div class="col-3">
            <label for="cvv" class="form-label">CVV</label>
            <input type="text" class="form-control" id="cvv" required>
            </div>

            <div class="col-sm-6">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" required>
            </div>

            <div class="col-sm-6">
            <label for="apellido" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="apellido" required>
            </div>
        `
    } else {
        toPost = `
        <hr class="modal-hr">

            <div class="col-12">
            <label for="nroCuenta" class="form-label">Numero de cuenta</label>
            <input type="text" class="form-control" id="nroCuenta" required>                        
            </div>
        `
    }
    document.getElementById('modalBody').innerHTML = toPost
    document.getElementById('paymentMethodLabel').classList.add("is-valid")
    document.getElementById('paymentMethodLabel').classList.remove('text-danger')
    document.getElementById('paymentMethodLabel').classList.remove("is-invalid")

}

const getSelectedDelivery = () => { //Nos fijamos la opcion de delivery seleccionada por el usuario

    const radioButtons = document.querySelectorAll('input[name="deliveryOpt"]')

    radioButtons.forEach((e) => {
        e.addEventListener('input', function () {
            let selectedDelivery;
            for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedDelivery = radioButton.value;
                    break;
                }
            }

            deliveryTax(selectedDelivery)
        })
    })
}

const calculateSubt = () => { //Calculamos el subtotal
    let inp = document.querySelectorAll('input.cart-count-input')


    inp.forEach((inp) => {
        inp.addEventListener('input', function () {

            let count = inp.value
            let id = inp.id.slice(5)
            let subt = cartContainer[id].unitCost * count
            let subtLabel = document.getElementsByClassName('_cart-subt')

            formatedSubt = cartContainer[id].currency + " " + subt
            subtLabel[id].innerHTML = formatedSubt

            subtotalCartNewCurrency = subtotalCartNewCurrency - cartContainer[id].unitCost + subt
            postSubt()
        })
    })
}

async function getResponse() { //Traemos la cotizacion actual de la moneda consumiendo una API
    const response = await fetch(
        'https://cotizaciones-brou.herokuapp.com/api/currency/latest',
        {
            method: 'GET'
        }
    );
    if (!response.ok) {
        throw new Error(`Error de HTTP. Estado: ${response.status}`);
    }
    const data = await response.json();

    dolarActualCompra = data.rates.USD.buy
    dolarActualVenta = data.rates.USD.sell

    cart()
}

const settingCartContent = () => { //Armamos el contenido del carrito y del localStorage 

    if (localStorage.getItem('cartObj') !== null) {
        cartContainer = JSON.parse(localStorage.getItem('cartObj'))
        cartContainer.unshift(cartData.articles[0])

    } else {
        cartContainer.push(cartData.articles[0])
    }

}

document.addEventListener("DOMContentLoaded", function () {
    userToBar()
    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(resultCart => {


        cartData = resultCart.data
        currentArray = resultCart.data.articles[0]


        if (resultCart.status === "ok") {
            settingCartContent()
        }
        getResponse()
    })

    document.getElementById('formulario').addEventListener('submit', function (evento) { //Nos fijamos si el formulario es válido

        let inputs = document.querySelectorAll('input.cart-count-input')
        let payment = document.getElementById('paymentMethodLabel')
        let invalid = false

        inputs.forEach((item) => {
            if (item.value <= 0 || item.value === "") {
                invalid = true
                item.classList.add('border-danger')
            } else {
                item.classList.remove('border-danger')
            }
        })

        if (payment.innerHTML.includes("Ninguno")) {
            invalid = true

            payment.classList.add("is-invalid")
            payment.classList.add('text-danger')
            payment.classList.remove("is-valid")

        } else {
            payment.classList.add("is-valid");
            payment.classList.remove('text-danger')
            payment.classList.remove("is-invalid");
        }

        if (!this.checkValidity() || invalid) {
            evento.preventDefault()
            evento.stopPropagation()
            console.log("not submited")
        } else {
            console.log("submited")
            document.getElementById('alertSuccess').classList.remove('visually-hidden')
            document.getElementById('alertSuccess').classList.add('alert-light')
        }
        this.classList.add('was-validated')

    })

})




