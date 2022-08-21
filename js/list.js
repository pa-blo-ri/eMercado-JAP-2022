//array donde se guardan los datos recibidos
let categoriesArray = [];
let categoryData = "";

function showProductsList(categoriesArray, categoryData) {
    let htmlContentToAppend = "";
    let leadContentToAppend = "";

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

    leadContentToAppend = `<strong> ${categoryData.toLowerCase()}.</strong>`;
    document.getElementById("subt-cat").innerHTML += leadContentToAppend;

}



/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

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