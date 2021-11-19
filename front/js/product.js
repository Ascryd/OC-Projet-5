//------------ Variables du squellette HTML ------------//
let image = document.querySelector(".item__img img")
let title = document.getElementById("title")
let price = document.getElementById("price")
let description = document.getElementById("description")
let color = document.getElementById("colors")


//------------ Variable de l'url pour fetch ------------//
let url_product = window.location.search.slice(1)


//------------ On écoute la quantité demandée et on récup sa valeur ------------//
const quantity = document.getElementById("quantity")


//------------ On récup le bouton pour envoyer au panier ------------//
const btn_ajoutPanier = document.getElementById("addToCart")


//------------ On récupère les données avec fetch ------------//
fetch(`http://localhost:3000/api/products/${url_product}`)
    .then(function(response) {
        if (response.ok) {
            return response.json();
            
        } else {
            throw new Error ("problème lors de la récupération du produit");
        }
    })

    .then (function(data) {
        
        //----- On crée dynamiquement la page produit -----//
        image.src = data.imageUrl
        image.alt = data.altTxt

        title.innerText = data.name
        price.innerText =  data.price
        description.innerText = data.description
         
        let colors = data.colors
        colors.forEach(value => {
            let option = document.createElement("option")
            option.value = value
            option.innerText = value
            -color.appendChild(option)
        })
        
        //----- On stock les caractéristiques du produit -----//
        btn_ajoutPanier.addEventListener("click", (e)=> {
            let detailsProduits = {
                id_produit: data._id,
                quantite_produit: quantity.value,
                couleur_produit: color.value
            }
            //----- On défini une variable pour le local storage -----//
            let ProduitsDansLocalStorage = JSON.parse(localStorage.getItem("produit"))
            
            //----- On crée une boucle pour créer un array, ou ajouter un produit dans cet array -----//
            if(ProduitsDansLocalStorage) {
                ProduitsDansLocalStorage.push(detailsProduits)
                localStorage.setItem("produit", JSON.stringify(ProduitsDansLocalStorage))
            } else {
                ProduitsDansLocalStorage = []
                ProduitsDansLocalStorage.push(detailsProduits)
                localStorage.setItem("produit", JSON.stringify(ProduitsDansLocalStorage))
            }
        })    

    })

    .catch(function(erreur) {
        console.log (erreur)
    })


