const ORDER_ASC_BY_PRICE = "Asc";
const ORDER_DESC_BY_PRICE = "Desc";
const ORDER_BY_PROD_COUNT = "Cant.";
let productDataArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


//->Cargar la lista de los productos correspondientes a la categoría en la que hicimos click

//variables donde se guardan los datos recibidos

function showProductsList() {

    console.log(productDataArray);
    let htmlContentToAppend = "";
    let categoryName = "";

    for (let i = 0; i < productDataArray.length; i++) {
        let product = productDataArray[i];

        //Se definen condiciones para el filtro de rangos por precio

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row" onClick="idToLocalStorage(${product.id})">
                <div class="col-3">
                    <img src="${product.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${product.name} - ${product.currency} ${product.cost} </h4> 
                        <p> `+ product.description + `</p> 
                        </div>
                        <small class="text-muted">${product.soldCount} vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;

    }

    categoryName = `<strong> ${categoryData.toLowerCase()}</strong>`;
    document.getElementById("subt-cat").innerHTML = `Verás aquí todos los productos de la categoría ${categoryName}.`;

};

function idToLocalStorage(id) {
    localStorage.setItem("productID",id);
    window.location = "product-info.html";
}



/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole como parámetros la constante donde se encuentran todos los JSON de los productos, 
junto con lo que tenemos almacenado en el localStorage  (el ID de la categoría en la que hicimos click) haciendo uso del
archivo index.js y poniendole tambien la extension JSON definida en una constante.
-Se fija si el objeto que devuelve esta en estado ok, y si es asi se pasan los datos a caterogiesArray y categoryData
-Por último, se llama a showProductsList() pasándole por parámetro categoriesArray y categoryData.

*/

document.addEventListener("DOMContentLoaded", function (e) {
    //Se construye la URL mediante el uso del local storage para acceder a los productos que corresponden a la categoria donde hicimos click
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function (resultObj) {

        //Agregamos el nombre de usuario (guardado en la localStorage) a la barra superior
        document.getElementById("userNameToBar").innerHTML = localStorage.getItem("userName");

        if (resultObj.status === "ok") {

            productDataArray = resultObj.data.products;
            categoryData = resultObj.data.catName;

            showProductsList();

        }
    });

    

    //Traemos los botones (Precio_Asc, Precio_Desc y Relevancia) mediante su id:

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    //Boton de limpiar el filtro de rango de precio

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    //Boton de filtrar usando lo ingresado en los input

    document.getElementById("rangeFilterCount").addEventListener("click", function () {

        //Obtengo el mínimo y máximo ingresado en los input del filtro por rangos y manejamos las posibilidades de que uno de los campos no haya sido ingresado.

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });



});

//Funcion que se encarga de comparar segun el criterio que le pasamos por parametro los elementos del array que le pasamos como segundo parametro
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}


function sortAndShowProducts(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        productDataArray = categoriesArray;
    }

    productDataArray = sortProducts(currentSortCriteria, productDataArray);

    showProductsList();
}

