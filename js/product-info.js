let productDataArray = []
let productComments = []
let imagesToHTML = ''
let commentsToHTML = ''
let relatedProductsToHTML = ''


function showProductsList() {

    let htmlContentToAppend = ``

    htmlContentToAppend += `
        
        <div class="row"><h4 class="margin-bottom-text">Categorías > ${productDataArray.category} > ${productDataArray.name}</h4></div>
        <div class="list-group-item ">
            <div class="row">                
                <section class="gallery">${imagesToHTML}</section>
                <div class="col col-border">
                
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h1 class="product-title">${productDataArray.name}<h1> 
                        <h4> ${productDataArray.currency} ${productDataArray.cost} </h4> 
                        <p class="product-description">${productDataArray.description}</p> 
                        </div>
                        <small class="text-muted">${productDataArray.soldCount} vendidos</small> 
                    </div>
                    <div class="buttons-place">
                    <button type="button" class="btn btn-primary button-product-info" id="buy">Comprar</button>
                    <button type="button" class="btn btn-light button-product-info" id="addToCart">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>

        <span><h4 class="opinion-title">Productos relacionados</h4></span>

        <div class="card-group">
        ${relatedProductsToHTML}
        </div>
        <span><h4 class="opinion-title">Opiniones sobre el producto</h4></span>

        ${commentsToHTML}        
        
        <span><h4 class="opinion-title">Escribe tu opinión</h4></span>
        <div class="card p-3">
            
            <div class="d-flex justify-content-between align-items-center">

            <div class="d-flex flex-row align-items-center">                              
                <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                <span>
                    <small class="font-weight-bold text-primary comments-username">${localStorage.getItem("userName")}</small>
                    <small class="comments-date">${actualDate()}</small>
                </span>
                
            </div>

            <div class="row">
                <div class="rating rate">                                

                    <input type="radio" name="rating" value="5" id="5">
                    <label for="5">☆</label> 

                    <input type="radio" name="rating" value="4" id="4">
                    <label for="4">☆</label> 

                    <input type="radio" name="rating" value="3" id="3">
                    <label for="3">☆</label> 

                    <input type="radio" name="rating" value="2" id="2">
                    <label for="2">☆</label> 
                    
                    <input type="radio" name="rating" value="1" id="1">
                    <label for="1">☆</label> 
                </div>
            </div>

        </div>

        <div class="row">
            
            <div>
                <div class="comment-box ml-2">
                    <div class="row">
                        
                    </div>
                    <div class="comment-area"> <textarea class="form-control" placeholder="Escriba aquí un comentario" rows="4"></textarea> </div>
                        <div class="comment-btns mt-2">
                            <div class="row">
                                <div class="icons align-items-center">
                                    <div class="pull-right"> <button class="btn btn-success send btn-sm">Enviar</button> </div>                                        
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div> 
    
        `

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend
    listeners()
}

const listeners = () => {

    document.getElementById("buy").addEventListener("click", e => {
        addToCart()
        window.location = "cart.html"
    })

    document.getElementById("addToCart").addEventListener("click", e => addToCart())

}

const addToCart = () => {

    let cartContainer = []
    let productToCart = {
        id: productDataArray.id,
        name: productDataArray.name,
        count: 1,
        unitCost: productDataArray.cost,
        currency: productDataArray.currency,
        image: productDataArray.images[0]
    }

    if (localStorage.getItem('cartObj') === null) {

        cartContainer.push(productToCart)

        localStorage.setItem('cartObj', JSON.stringify(cartContainer))

    } else {
        console.log(productToCart.id)
        countValidation(productToCart)
    }  

}

const countValidation = (obj) => {

    let is = false
    cartContainer = JSON.parse(localStorage.getItem('cartObj'))

    console.table(cartContainer)

    cartContainer.forEach((e)=>{
        if(e.id === obj.id) {
            e.count += 1
            is = true
        }
    })

    if( !is ){
        cartContainer.push(obj)
    }

    localStorage.setItem('cartObj', JSON.stringify(cartContainer))

}

const catchRelatedProducts = () => {

    const relatedProducts = productDataArray.relatedProducts
    let relatedProductsToAppend = ''


    relatedProducts.forEach((product) => {
        const { id, name, image } = product



        relatedProductsToAppend += `
            <div class="card-item">
                <div class="col md-4" onClick="idToLocalStorage(${id})">
                    <div class="card related-products">
                        <img class="card-img-top" src="${image}">                                       
                        <h3 class="m-3" id="related-products-body">${name}</h3>                              
                    </div>
                </div>
                   
            </div>
        `
        relatedProductsToHTML = relatedProductsToAppend
    })


}

const catchImages = () => {
    let imagesLenght = Object.keys(productDataArray.images).length;
    let imagesToAppend = `

    <div class="gallery__item">
      <input type="radio" id="img-1" checked name="gallery" class="gallery__selector"/>
      <img class="gallery__img" src="${productDataArray.images[0]}" alt="product image"/>
      <label for="img-1" class="gallery__thumb"><img src="${productDataArray.images[0]}" alt=""/></label>
    </div>

    `;

    for (let i = 1; i < imagesLenght; i++) {
        let imageIndex = productDataArray.images[i];

        imagesToAppend += `

        <div class="gallery__item">
          <input type="radio" id="img-${i + 1}" name="gallery" class="gallery__selector"/>
          <img class="gallery__img" src="${imageIndex}" alt="product image"/>
          <label for="img-${i + 1}" class="gallery__thumb"><img src="${imageIndex}" alt=""/></label>
        </div>

        `
    }

    imagesToHTML = imagesToAppend;

};

const comments = () => {
    const commentsLenght = Object.keys(productComments).length;
    let commentsToAppend = "";

    for (let i = 0; i < commentsLenght; i++) {
        const commentsIndex = productComments[i];
        let commentsRate = "";


        for (let j = 0; j < commentsIndex.score; j++) {
            commentsRate += `<span class="fa fa-star checked"></span>`
        };
        for (let k = 0; k < 5 - commentsIndex.score; k++) {
            commentsRate += `<span class="fa fa-star"></span>`

        };

        commentsToAppend += `
       
        <div class="card p-3">

                        <div class="d-flex justify-content-between align-items-center">

                            <div class="d-flex flex-row align-items-center">                              
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                                <span>
                                <small class="font-weight-bold text-primary comments-username">${commentsIndex.user}</small>
                                <small class="comments-date">${formatDate(String(commentsIndex.dateTime))}</small>
                                </span>
                                
                            </div>

                            <small>${commentsRate}</small>

                        </div>

                        <div class="action d-flex justify-content-between mt-2 align-items-center">                            
                            <small class="font-weight-bold comments-body">${commentsIndex.description}</small>
                            
                            <div class="icons align-items-center">

                                <span class="rate">${commentsIndex.score}/5</span>
                            
                            </div>   
                        
                        </div>
                                             
                    </div>                

        `
    }

    commentsToHTML = commentsToAppend;
};

const formatDate = (stringDate) => {

    let cuttedDate = stringDate.slice(0, 10)
    let [year, month, day] = cuttedDate.split('-')
    let zero = ""

    if (day < 10 && day.slice(0, 1) != "0") {
        zero = "0"
    }
    return (zero + day + "-" + month + "-" + year)

}

const actualDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()

    today = dd + '-' + mm + '-' + yyyy

    return today
}


const callFetch = async () => {

}
document.addEventListener("DOMContentLoaded", e => {

    //Se construye la URL mediante el uso del local storage para acceder a los productos que corresponden a la categoria donde hicimos click
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE).then(resultComm => {

        if (resultComm.status === "ok") {
            productComments = resultComm.data;

            userToBar()
            comments()

            getJSONData(PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE).then(resultProd => {

                if (resultProd.status === "ok") {
                    productDataArray = resultProd.data;

                    catchRelatedProducts()
                    catchImages()
                    showProductsList()
                }
            })
        }
    })
})



