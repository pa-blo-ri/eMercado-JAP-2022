//->Cargar la lista de los productos correspondientes a la categoría en la que hicimos click

//variables donde se guardan los datos recibidos
let categoriesArray = [];
let categoryData = "";


function showProductsList(categoriesArray, categoryData) {
    let htmlContentToAppend = "";
    let categoryName = "";

    for (let i = 0; i < categoriesArray.length; i++) {
        let product = categoriesArray[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
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

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;

    }

    categoryName = `<strong> ${categoryData.toLowerCase()}.</strong>`;
    document.getElementById("subt-cat").innerHTML += categoryName;

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
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data.products;
            categoryData = resultObj.data.catName;

            showProductsList(categoriesArray, categoryData);
        }
    });
});