const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";



let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

const idToLocalStorage = (id) => {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

const userToBar = () => {

  document.getElementById('userDropdown').innerHTML =

    `<a class="btn btn-secondary dropdown-toggle user-dropwdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${localStorage.getItem("userName")}</a>
            <ul class="dropdown-menu" aria-labelledby="userNameToBar">

              <li><a class="dropdown-item" href="cart.html">Carrito
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-cart dropdown-icons"
                    viewBox="0 0 16 16">
                    <path
                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </a></li>
              <li><a class="dropdown-item" href="my-profile.html">Perfil</a></li>
              <li><a class="dropdown-item" id="cerrarSesion" href="index.html">Cerrar sesión</a></li>
            </ul>`
  logOut()
}

const logOut = () => document.querySelector('#cerrarSesion').onclick = () => {
  localStorage.removeItem('userName')
  localStorage.removeItem('userData')
  localStorage.removeItem('productID')
  localStorage.removeItem('catID')
  localStorage.removeItem('cartObj')
  localStorage.removeItem('userImg')

}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}