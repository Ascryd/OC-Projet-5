//------------ On sélectionne l'élément parent pour les articles ------------//
cart__item = document.querySelector("#cart__items")

//------------ On récupère les produits dans le local storage ------------//
let ProduitsDansLocalStorage = JSON.parse(localStorage.getItem("produit"))
console.log(ProduitsDansLocalStorage)



for (let i = 0; i < ProduitsDansLocalStorage.length; i++) {
    let url_product = ProduitsDansLocalStorage[i].id_produit

    fetch(`http://localhost:3000/api/products/${url_product}`)
    
    .then(function(response) {
        if (response.ok) {
            return response.json();
            
        } else {
            throw new Error ("problème lors de la récupération du produit");
        }
    })

    .then(function(data) {
        // let structure =
        cart__item.innerHTML =
        `<article class="cart__item" data-id="{product-ID}">
            <div class="cart__item__img">
                <img src=${data.imageUrl} alt=${data.altTxt}>
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                <h2>${data.name}</h2>
                <p>${data.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${ProduitsDansLocalStorage[i].quantite_produit}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
        </article>`

    })

    .catch(function(error) {
        console.log (erreur);
    })
}

//------------ ?? ------------//
//------------ ?? ------------//
//------------ ?? ------------//
//------------ ?? ------------//